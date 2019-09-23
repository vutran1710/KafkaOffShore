## SETUP

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

Given our CouchDB (must be exposed to localhost) with default Authentication config being used
``` text
user: admin
pwd: 1234abc
```

Add CORS to CouchDB so AdminApp can sync with it

``` shell
$ make add_cors_couch
```

Start frontend apps (*UserApp* and *AdminApp*) in separated terminals, using commands

``` shell
$ make fe_user
$ make fe_admin
```

Developing *Producer Backend* with `aiohttp_devtool` dev-server using command

``` shell
$ make producer_dev
```

## DATA DESCRIPTION
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

## TODO
Considering what to add to sweeten the pot and make shit easier to understand!

- [x] Add CouchDB
- [x] Add **API Client App**
- [x] Add **Admin Client App** with PouchDB for db real-time tracking
- [ ] Developing **Producer Backend API**
- [ ] Add **Flink** to consumer
- [ ] Scale Consumer & DB Replicate
- [ ] Add more topics and addtional Producers
- [ ] Scale Broker
- [ ] Crash some services for testing
- [ ] Apache Beam?
- [ ] KSQL?
