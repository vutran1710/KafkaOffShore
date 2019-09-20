import time
import random
from os import getenv
from logzero import logger as logs
from kafka import KafkaProducer


# give broker IP from docker
kafka_server = getenv('KAFKA_SERVER')
kafka_topic = getenv('KAFKA_TOPIC')
producer = KafkaProducer(bootstrap_servers=kafka_server)

# continuous loop
var = 1
while var == 1:

    # generate a random integer
    num = random.randint(0, 10)

    # message value and key must be raw bytes
    num_bytes = bytes(str(num), encoding='utf-8')

    # send to topic on broker
    logs.info('TOPIC: %s -- Sending msg: %s', kafka_topic, num_bytes)
    producer.send(kafka_topic, value=num_bytes, key=num_bytes)

    # wait 1 second
    time.sleep(1)
