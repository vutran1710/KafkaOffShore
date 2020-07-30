""" Data API
"""
from typing import Any
from time import sleep
from fastapi import APIRouter, BackgroundTasks
from kafka_producer import KafkaClient
from tasks import send_stream_of_int, send_read_noti


router = APIRouter()


@router.get("/stream-int", response_model=Any)
async def send_integers(background_tasks: BackgroundTasks, count: int = 0):
    """ send a stream of integers
    """
    kkc = KafkaClient(...)
    background_tasks.add_task(send_stream_of_int, kkc, count)
    sleep(3)
    return "OK"


@router.put("/read-noti", response_model=Any)
async def send_integers(background_tasks: BackgroundTasks, tags: str = 0):
    """ send a stream of integers
    """
    kkc = KafkaClient(...)
    tags = tags.split(",")
    background_tasks.add_task(send_read_noti, kkc, tags)


@router.get("/ping", response_model=Any)
async def ping():
    """ health-check
    """
    return "OK"
