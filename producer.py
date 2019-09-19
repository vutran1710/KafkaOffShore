import time
import random
from kafka import KafkaProducer

# give broker IP from docker
producer = KafkaProducer(bootstrap_servers='localhost:32768')

# continuous loop
var = 1
while var == 1:

    # generate a random integer
    num = random.randint(0, 10)

    # message value and key must be raw bytes
    num_bytes = bytes(str(num), encoding='utf-8')

    # send to topic on broker
    producer.send('test-topic', value=num_bytes, key=num_bytes)

    # wait 1 second
    time.sleep(1)
