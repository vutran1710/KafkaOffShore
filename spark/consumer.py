""" KafkaConsumer Client
"""
from time import sleep
from typing import Callable
from json import dumps
from datetime import datetime
import socket
from logzero import logger as log
from kafka import KafkaConsumer
from config import AppConfig


class Consumer:
    """ Read stream from kafka and forward to spark-stream-contezt
    """

    def __init__(self, cfg: AppConfig):
        self._server = cfg.KAFKA_SERVER
        self._topic = cfg.KAFKA_TOPIC
        self._sk = None

    def create_socket_host(self):
        """ create a local-socket to foward data from kafka to spark
        """
        tcp_ip = "localhost"
        tcp_port = 9009
        conn = None
        self._sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._sk.bind((tcp_ip, tcp_port))
        self._sk.listen(1)

        log.info("Waiting for TCP connection...")
        conn, addr = self._sk.accept()
        log.info("Connected...")

        return conn, addr

    def try_connect(self) -> KafkaConsumer:
        """ trying to connect to kafka
        """
        consumer = None

        for _ in range(5):
            consumer = KafkaConsumer(
                self._topic, group_id="consumer-1", bootstrap_servers=self._server
            )

            if consumer:
                return consumer

            sleep(1)

        log.error("=======> No broker! Exit program...")
        raise SystemExit

    def read_stream(self):
        """ read stream from kafka and forward to callback
        """
        while True:
            consumer = self.try_connect()

            for msg in consumer:
                topic, partition = msg.topic, msg.partition
                offset, key, value = msg.offset, msg.key, msg.value
                log.info(
                    "%s:%d:%d: key=%s value=%s", topic, partition, offset, key, value
                )

                data = {
                    "partition": msg.partition,
                    "offset": msg.offset,
                    "value": msg.value.decode("utf-8"),
                    "timestamp": int(datetime.now().strftime("%s")),
                }

                log.info(">> new data: %s", data)

                if self._sk:
                    self._sk.send(dumps(data))
                else:
                    log.warning("======= Read-stream not being forwarded")
                    log.info(data)
