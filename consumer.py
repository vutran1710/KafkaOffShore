from datetime import datetime
from logzero import logger as logs
from os import getenv
from kafka import KafkaConsumer
from cloudant.client import CouchDB

KAFKA_SERVER = getenv('KAFKA_SERVER')
KAFKA_TOPIC = getenv('KAFKA_TOPIC')

couchdb_server = getenv('COUCHDB_SERVER')
DBCLIENT = CouchDB('admin', '1234abc', url=couchdb_server, connect=True)

# Open DB or Create new one
db = None

def open_db():
    global db

    if not db:
        db = DBCLIENT['flightdb'] or client.create_database('flightdb')

    return db

# continuous loop
var = 1
while var == 1:

    # initialize consumer to given topic and broker
    consumer = KafkaConsumer(KAFKA_TOPIC, group_id='consumer-1', bootstrap_servers=KAFKA_SERVER)

    # loop and print messages
    count = 0
    total = 0
    for msg in consumer:
        # NOTE: in case of downtime, how to recover the missing data?
        # Verify block height?
        # then do what?
        count += 1
        total = total + count
        logs.info('Received: %s, nth = %s', msg, count)

        new_document = {
            "count": count,
            "total": total,
            "timestamp": int(datetime.now().strftime('%s')),
        }

        mydb = open_db()
        record = mydb.create_document(new_document)
        logs.info('New doc: %id', record['_id'])
