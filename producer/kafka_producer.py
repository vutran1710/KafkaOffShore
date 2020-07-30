""" encapsulation of kafka-client/producer
"""
from typing import List
from time import sleep
from logzero import logger as log
from kafka import KafkaProducer
from config import AppConfig
from helpers import Singleton


class KafkaClient(metaclass=Singleton):
    """ kafka client
    """

    def __init__(self, cfg: AppConfig):
        self._cfg = cfg
        self._p = None

    def connect(self) -> bool:
        """ Get kafka producer
        """
        if self._p:
            return self._p

        producer = None

        for _ in range(5):
            producer = KafkaProducer(bootstrap_servers=self._cfg.KAFKA_SERVER)
            if producer:
                self._p = producer
                log.info("BROKER CONNECTED")
                return True

            sleep(1)

        log.warning("Too many retries. Exiting....")
        raise SystemExit

    def send_integers(self, data: int):
        """ send stream of integers to kafka
        """
        byte_value = bytes(str(data), encoding="utf-8")
        byte_key = bytes("number", encoding="utf-8")
        kwargs = {"value": byte_value, "key": byte_key}
        (
            self._p.send(self._cfg.KAFKA_TOPIC, **kwargs)
            .add_callback(self.on_send_success)
            .add_errback(self.on_send_error)
        )

    def send_read_noti(self, tags: List[str]):
        """ send read-noti to kafka
        """
        byte_value = bytes(",".join(tags), encoding="utf-8")
        byte_key = bytes("read", encoding="utf-8")
        kwargs = {"value": byte_value, "key": byte_key}
        (
            self._p.send(self._cfg.KAFKA_TOPIC, **kwargs)
            .add_callback(self.on_send_success)
            .add_errback(self.on_send_error)
        )

    def on_send_success(self, record_metadata):
        """ callback on success
        """
        sent_value = record_metadata.value.decode("utf-8")
        log.info("Success! value sent == %s", sent_value)

    def on_send_error(self, excp):
        """ callback on error
        """
        log.error("ERROR", exc_info=excp)
        # handle exception
