""" Data API
"""
from typing import Any
from time import sleep
from fastapi import APIRouter, BackgroundTasks
from kafka_producer import KafkaClient
from tasks import send_stream_of_int


router = APIRouter()


@router.get("/stream-int", response_model=Any)
async def send_integers(background_tasks: BackgroundTasks, count: int = 0):
    """ send a stream of integers
    """
    kkc = KafkaClient(...)
    background_tasks.add_task(send_stream_of_int, kkc, count)
    sleep(3)
    return "OK"


@router.get("/ping", response_model=Any)
async def ping():
    """ health-check
    """
    return "OK"
