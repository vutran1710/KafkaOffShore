""" Spark-Streamer Client
"""
from pyspark import SparkContext, SparkConf
from pyspark.streaming import StreamingContext
from config import AppConfig


class SparkStreaming:
    """ Context-Streaming API
    """

    def __init__(self, cfg: AppConfig):
        spark_cfg = SparkConf()
        spark_cfg.setAppName(cfg.SPARK_APP_NAME)
        spark_cfg.setMaster(cfg.SPARK_REMOTE_URL)
        spark_cfg.set("spark.executor.memory", "512m")
        spark_cfg.set("spark.executor.cores", "1")

        ctx = SparkContext(conf=spark_cfg)
        ctx.setLogLevel("WARN")
        self._ssc = StreamingContext(ctx, 2)
        # self._ssc.checkpoint("checkpoint_app")
        self._ssc.socketTextStream("localhost", 9009)
