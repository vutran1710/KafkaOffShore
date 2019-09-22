import time
import random
from os import getenv
from logzero import logger as logs
from kafka import KafkaProducer
from aiohttp import web

# Setup Kafka Producer
kafka_server = getenv('KAFKA_SERVER')
kafka_topic = getenv('KAFKA_TOPIC')
producer = KafkaProducer(bootstrap_servers=kafka_server)

# Setup API Handler
routes = web.RouteTableDef()

@routes.get('/')
async def get_handler(request):
    return web.Response(text="Hello, Application is UP!")


@routes.post('/post')
async def post_handler(request):
    pass

@routes.put('/api/stream_int')
async def send_integer_stream(request):
    """
    Send continuous random integers (0-10) 10 times, for testing purpose only
    """
    count = 0
    while count < 11:
        num = random.randint(0, 10)
        num_bytes = bytes(str(num), encoding='utf-8')
        producer.send(kafka_topic, value=num_bytes, key=num_bytes)
        count += 1
        time.sleep(1)
        logs.info('====== Count %s', count)

    return web.Response(text='Done, Final count: {}'.format(count))


app = web.Application()
app.add_routes(routes)


if __name__ == '__main__':
    web.run_app(app)