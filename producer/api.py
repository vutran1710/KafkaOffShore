""" Feed API
"""
from typing import Any
from time import sleep
from fastapi import APIRouter
from logzero import logger as log
from kafka_producer import KafkaClient

router = APIRouter()


@router.get("/stream-int", response_model=Any)
async def get_user_feed(count: int = 0):
    """ send a stream of integers
    """
    producer = KafkaClient(...)

    counter = 0
    while counter < count:
        producer.send(counter)
        log.debug("having sent >> %s", counter)
        counter += 1
        sleep(0.1)

    return "OK"


@router.get("/ping", response_model=Any)
async def ping():
    """ health-check
    """
    return "OK"
