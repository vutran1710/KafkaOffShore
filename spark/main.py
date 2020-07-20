from logzero import logger as log
from streamer import SparkStreaming
from consumer import Consumer
from config import AppConfig


if __name__ == "__main__":

    cfg = AppConfig.load()
    log.debug(cfg)

    # SparkStreaming(cfg)
    consumer = Consumer(cfg)

    consumer.create_socket_host()
    consumer.read_stream()
