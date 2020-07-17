""" Spark code
"""
from time import sleep
from logzero import logger as log
from pyspark import SparkContext


sc = SparkContext(master="spark://localhost:7077", appName="app_example")
sc.setLogLevel("INFO")
data = [1, 2, 3, 5, 10]
flow = sc.parallelize(data)


def mapper(val):
    """ A fake map function
    """
    log.info("this is a value before multiplication: %s", val)
    newval = val * 2
    count = 0

    while count < 10:
        sleep(1)
        log.info("Fake processing...: %s", count)
        count += 1

    log.info("this is a value after multiplication: %s", newval)
    return newval


result = flow.map(mapper).collect()
log.info(">>> Result = %s", result)
