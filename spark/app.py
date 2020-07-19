""" Spark code
"""
from logzero import logger as log
from pyspark import SparkContext, SparkConf


conf = SparkConf()
conf.setAppName("app")
conf.setMaster("spark://localhost:7077")
conf.set("spark.executor.memory", "512m")
conf.set("spark.executor.cores", "1")

sc = SparkContext(conf=conf)
sc.setLogLevel("INFO")


def multiply(val):
    """ A fake map function
    """
    log.info("this is a value before multiplication: %s", val)
    newval = val * 2

    log.warning("Fake processing...: val=%s -> newval=%s", val, newval)

    log.info("this is a value after multiplication: %s", newval)
    return newval


result = sc.parallelize(range(10)).map(multiply).collect()
log.info(">>> Result = %s", result)
