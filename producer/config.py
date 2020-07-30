""" load config
"""
from typing import List
from os import environ
from typing import Optional
from configparser import ConfigParser
from logzero import logger, loglevel
from pydantic import BaseModel


class AppConfig(BaseModel):
    """Config Model
    - all keys are required, unless specified `Optional`
    """

    KAFKA_TOPICS: List[str]
    KAFKA_SERVER: str
    ZOOKEEPER_SERVER: Optional[str]
    COUCHDB_SERVER: Optional[str]
    LOG_LEVEL: int

    @staticmethod
    def load():
        """Load config from init if possible
        For production, get config from env variables
        """
        config = {}
        stage = environ.get("STAGE", "DEVELOPMENT")
        parser = ConfigParser()
        parser.read("config.ini")

        for k, val in parser.items(stage):
            key = k.upper()
            value = val or environ.get(key)
            config.update({key: value})

        config = AppConfig(**config)
        loglevel(level=config.LOG_LEVEL)
        logger.debug("Worker-Config: %s", config)
        return config
