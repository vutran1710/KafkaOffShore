from os import environ
import sys
from pyspark import SparkContext, SparkConf
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils
from config import AppConfig


if __name__ == "__main__":

    cfg = AppConfig.load()

    spark_cfg = SparkConf()
    spark_cfg.setAppName("app")
    spark_cfg.setMaster("spark://localhost:7077")
    spark_cfg.set("spark.executor.memory", "512m")
    spark_cfg.set("spark.executor.cores", "1")

    sc = SparkContext(conf=spark_cfg)
    ssc = StreamingContext(sc, 2)

    kvs = KafkaUtils.createDirectStream(
        ssc, [cfg.TOPIC], {"metadata.broker.list": cfg.BROKERS},
    )

    lines = kvs.map(lambda x: x[1])
    counts = (
        lines.flatMap(lambda line: line.split(" "))
        .map(lambda word: (word, 1))
        .reduceByKey(lambda a, b: a + b)
    )

    counts.pprint()
    ssc.start()
    ssc.awaitTermination()
