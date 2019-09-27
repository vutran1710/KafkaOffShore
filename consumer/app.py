import time
from datetime import datetime
from logzero import logger as logs
from os import getenv
from kafka import KafkaConsumer
from cloudant.client import CouchDB

HOSTNAME = getenv('HOSTNAME')
KAFKA_SERVER = getenv('KAFKA_SERVER')
KAFKA_TOPIC = getenv('KAFKA_TOPIC')

logs.info('Hostname: %s', str(HOSTNAME))
logs.info('=====> Kafka Servers: %s', str(KAFKA_SERVER))

couchdb_server = getenv('COUCHDB_SERVER')
client = CouchDB('admin', '1234abc', url='http://{}'.format(couchdb_server), connect=True)
db_name = 'flightdb'
db = client.get(db_name, None) or client.create_database(db_name)

# continuous loop
while True:

    # initialize consumer to given topic and broker
    consumer = None
    try_count = 0
    while not consumer and try_count < 5:
        try:
            try_count += 1
            consumer = KafkaConsumer(KAFKA_TOPIC, group_id='consumer-1', bootstrap_servers=KAFKA_SERVER)
        except:
            logs.debug('Not found broker')
            time.sleep(2)

    if not consumer:
        logs.error('=======> Too many retries! Exit program...')
        raise SystemExit
    else:
        logs.info('BROKER CONNECTED')

    # loop and print messages
    for msg in consumer:
        # NOTE: in case of downtime, how to recover the missing data?
        # Verify block height?
        # then do what?
        logs.info("%s:%d:%d: key=%s value=%s" % (msg.topic, msg.partition, msg.offset, msg.key, msg.value))

        new_document = {
            "hostname": HOSTNAME,
            "partition": msg.partition,
            "offset": msg.offset,
            "value": msg.value.decode('utf-8'),
            "timestamp": int(datetime.now().strftime('%s')),
        }

        record = db.create_document(new_document)
        logs.info('New doc: %s, ---- at timestamp: %s', record['_id'], record['timestamp'])
        time.sleep(1.5)
