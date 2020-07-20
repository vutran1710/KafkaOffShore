""" load config
"""
from os import environ
from configparser import ConfigParser
from logzero import logger, loglevel
from pydantic import BaseModel


class AppConfig(BaseModel):
    """Config Model
    - all keys are required
    """

    KAFKA_TOPIC: str
    KAFKA_SERVER: str
    SPARK_APP_NAME: str
    SPARK_REMOTE_URL: str
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
