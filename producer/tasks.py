""" FastAPI background tasks
"""
from time import sleep
from logzero import logger as log
from kafka_producer import KafkaClient


def send_stream_of_int(kkc: KafkaClient, count: int):
    """ sending a stream of numbers to kafka
    """
    counter = 0
    while counter < count:
        kkc.send(counter)
        log.debug("having sent >> %s", counter)
        counter += 1
        sleep(0.1)
