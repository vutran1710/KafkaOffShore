"""Initialization fastapi application
"""
from fastapi import FastAPI
from config import AppConfig
from api import router
from kafka_producer import KafkaClient


app = FastAPI()
config = AppConfig.load()


@app.on_event("startup")
async def init_conns():
    """ Init couchdb if needed
    """
    KafkaClient(config).connect()


app.include_router(router, responses={404: {"message": "Not found"}})
