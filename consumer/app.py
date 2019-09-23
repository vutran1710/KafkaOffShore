from datetime import datetime
from logzero import logger as logs
from os import getenv
from kafka import KafkaConsumer
from cloudant.client import CouchDB

KAFKA_SERVER = getenv('KAFKA_SERVER')
KAFKA_TOPIC = getenv('KAFKA_TOPIC')

couchdb_server = getenv('COUCHDB_SERVER')
client = CouchDB('admin', '1234abc', url='http://{}'.format(couchdb_server), connect=True)
db_name = 'flightdb'
db = client.get(db_name, None) or client.create_database(db_name)

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
        logs.info("%s:%d:%d: key=%s value=%s" % (msg.topic, msg.partition, msg.offset, msg.key, msg.value))

        count += 1
        total = total + count
        logs.info('Received: %s, nth = %s', msg, count)

        new_document = {
            "count": count,
            "total": total,
            "timestamp": int(datetime.now().strftime('%s')),
        }

        record = db.create_document(new_document)
        logs.info('New doc: %s, ---- at timestamp: %s', record['_id'], record['timestamp'])
