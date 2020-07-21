from logzero import logger as log
from streamer import SparkStreaming
from consumer import Consumer
from config import AppConfig


if __name__ == "__main__":

    cfg = AppConfig.load()
    log.debug(cfg)

    spk = SparkStreaming(cfg)
    consumer = Consumer(cfg)

    host, port = consumer.create_socket_host()
    spk.map_r(host, port)
    consumer.read_stream()
