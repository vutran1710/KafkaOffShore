<p align="center">
  <img width="460" height="400" src="./docs/head_ss.png">
</p>

## with CouchDB, KafkaManager and Chartjs
Here we are going to simulate a system using Kafka to examine its capability to handle continous data distribution, and at the
same time testing how `PouchDB` and `CouchDB` can do auto-sync between frontend and backend

### SCREENSHOTS
<p align="center">
  <img src="/docs/kafka_ss.png" width="400" height="250" style="margin-right:10px;border:solid 2px #ddd;padding:5px;"/>
  <img src="/docs/db_ss.png" width="400" height="250" style="border:solid 2px #ddd;padding:5px;"/>
</p>

<p align="center">
  <img src="/docs/user_ss.png" width="400" height="250" style="margin-right:10px;border:solid 2px #ddd;padding:5px;"/>
  <img src="/docs/admin_ss.png" width="400" height="250" style="border:solid 2px #ddd;padding:5px;"/>
</p>


### SETUP
There are 8 components:
1. Kafka Brokers
2. Zookeeper
3. Kafka Manger
4. CouchDB
5. User Frontend Application
6. Admin Frontend Application
7. Kafka Consumer
8. Backend API as Kafka Producer


#### Prerequisites:
1. Node, Npm
2. Make
3. Pipenv
4. Docker



#### Proceed:

Basicall, run Make setup to install all dependencies and dockerization of all services
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

Developing *Producer Backend* with `aiohttp_devtool` dev-server using command

``` shell
$ make producer_dev
```

Using Kafka-Manager to add **Cluster** then setup proper **partition-assignment**, going to *http://localhost:9000*

### SPECIALS
Run docker with scaled services (5 consumers, 5 kafka brokers)
*NOTE: frontend applications support maximum 5 consumers and 5 brokers for the sake of personal computer usage limit*

``` shell
$ make up-scale n=5
```

### DATA DESCRIPTION
Using Youtube Dataset downloaded from http://netsg.cs.sfu.ca/youtubedata/
**Data format**:

```
video ID	an 11-digit string, which is unique
uploader	a string of the video uploader's username
age         an integer number of days between the date when the video was uploaded and Feb.15, 2007 (YouTube's establishment)
category	a string of the video category chosen by the uploader
length      an integer number of the video length
views       an integer number of the views
rate        a float number of the video rate
ratings     an integer number of the ratings
comments	an integer number of the comments
related IDs	up to 20 strings of the related video IDs
```

### TODO
Considering what to add to sweeten the pot and make shit easier to understand!

- [x] Add CouchDB
- [x] Add **API Client App**
- [x] Add **Admin Client App** with PouchDB for db real-time tracking
- [ ] Developing **Producer Backend API**
- [ ] Add **Flink** to consumer
- [x] Scale Consumer
- [ ] Setup CouchDB Cluster
- [ ] Add more topics and addtional Producers
- [x] Scale Broker
- [ ] Crash some services for testing
- [ ] Apache Beam?
- [ ] Apache Avro
- [ ] KSQL?
- [ ] Deploy everything with **Kubernetes**
- [ ] Stress-testing
