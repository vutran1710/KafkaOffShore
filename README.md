<p align="center">
  <img width="460" height="400" src="./docs/head_ss.png">
</p>

## with Zookeeper, Spark, CouchDB, Spark and React
Here we are going to simulate a system using `Kafka` and `Spark` to examine its capability to handle continous data distribution, and at the
same time testing how `PouchDB` and `CouchDB` can do auto-sync between frontend and backend

### SCREENSHOTS
<p align="center">
  <img src="/docs/kafka_ss.png" width="300" height="220" style="margin-right:10px;border:solid 2px #ddd;padding:5px;"/>
  <img src="/docs/db_ss.png" width="300" height="220" style="border:solid 2px #ddd;padding:5px;"/>
</p>

<p align="center">
  <img src="/docs/user_ss.png" width="300" height="220" style="margin-right:10px;border:solid 2px #ddd;padding:5px;"/>
  <img src="/docs/admin_ss.png" width="300" height="220" style="border:solid 2px #ddd;padding:5px;"/>
</p>


### SETUP
There are 11 components:
1. Kafka Brokers
2. Zookeeper
3. CMAK as Kafka WebUI Manager
4. CouchDB
5. User Frontend Application
6. Admin Frontend Application
7. Kafka Consumer
8. Backend API as Kafka Producer
9. Spark Master
10. Spark Worker
11. Apache Zeppelin


#### Prerequisites:
1. Node, Npm
2. Make
3. Pipenv
4. Docker


#### Proceed:

Basicall, run Make setup to install all dependencies and creating a docker network
``` shell
$ make setup
```

Given our CouchDB (must be exposed to localhost) with default Authentication config being used (refer to `couchdb`
service from *docker-compose*)
``` text
user: admin
pwd: 1234abc
```

Add CORS to CouchDB so AdminApp can sync with it

``` shell
$ make add_cors_couch
```
*Alternatively, when running as a docker service, CORS can be enabled using GUI from
http://localhost:5984/_utils/#_config/nonode@nohost. Note that CouchDB Cluster Config might need some manual adjustment*

Start frontend apps (*UserApp* and *AdminApp*) in separated terminals, using 2 commands

``` shell
$ make fe_user
$ make fe_admin
```

Using `CMAK` as Kafka-Manager to add **Cluster** then setup proper **partition-assignment**, going to *http://localhost:9000*

### Getting up
Run everything and scale the services (2 kafka-brokers, 3 spark-worker)

``` shell
$ make up-scale k=2 n=3
```

### TODO
Considering what to add to complete the Architechture

- [x] Add CouchDB
- [x] Add **API Client App**
- [x] Add **Admin Client App** with PouchDB for db real-time tracking
- [x] Developing **Producer Backend API**
- [x] Add **Spark** to consumer, connect to **Kafka** for streaming
- [x] Scale Consumer
- [ ] Setup CouchDB Cluster
- [x] Scale Kafka Broker and Spark Worker
- [ ] Apache Beam?
- [ ] Apache Avro
- [ ] KSQL?
- [ ] Deploy everything with **Kubernetes**
- [ ] Stress-testing
