""" FastAPI background tasks
"""
from typing import List
from time import sleep
from logzero import logger as log
from kafka_client import KafkaClient


def send_stream_of_int(kkc: KafkaClient, count: int):
    """ sending a stream of numbers to kafka
    """
    counter = 0
    while counter < count:
        kkc.send_integers(counter)
        log.debug("having sent >> %s", counter)
        counter += 1
        sleep(0.1)


def send_read_noti(kkc: KafkaClient, tags: List[str]):
    """ send user-reading-noti to kafka
    """
    kkc.send_read_noti(tags)
