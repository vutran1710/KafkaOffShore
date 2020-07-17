from logzero import logger as log
from pyspark import SparkContext

sc = SparkContext(master="local[2]")
data = [1, 2, 3, 4]
flow = sc.parallelize(data)

result = flow.map(lambda x: x * 2).reduce(lambda x, y: x + y).collect()
log.info('>>> Result = %s', result)
