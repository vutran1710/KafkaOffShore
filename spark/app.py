""" Spark code
"""
from time import sleep
from logzero import logger as log
from pyspark import SparkContext, SparkConf


conf = SparkConf()
conf.setAppName("app")
conf.setMaster("spark://localhost:7077")
conf.set("spark.executor.memory", "512m")
conf.set("spark.executor.cores", "1")

sc = SparkContext(conf=conf)
sc.setLogLevel("INFO")


data = [1, 2, 3, 5]
flow = sc.parallelize(data)


def mapper(val):
    """ A fake map function
    """
    log.info("this is a value before multiplication: %s", val)
    newval = val * 2

    for _ in range(5):
        log.warning("Fake processing...: val=%s -> newval=%s", val, newval)

    log.info("this is a value after multiplication: %s", newval)
    return newval


result = flow.map(mapper).collect()
log.info(">>> Result = %s", result)
