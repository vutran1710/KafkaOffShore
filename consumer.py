from logzero import logger as logs
from os import getenv
from kafka import KafkaConsumer

kafka_server = getenv('KAFKA_SERVER')
kafka_topic = getenv('KAFKA_TOPIC')

# continuous loop
var = 1
while var == 1:

    # initialize consumer to given topic and broker
    consumer = KafkaConsumer(kafka_topic, group_id='consumer-1', bootstrap_servers=kafka_server)

    # loop and print messages
    count = 0
    for msg in consumer:
        count += 1
        logs.info('Received: %s, nth = %s', msg, count)
