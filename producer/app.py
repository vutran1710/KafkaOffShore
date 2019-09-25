import time
import random
from os import getenv
from logzero import logger as logs
from kafka import KafkaProducer
from aiohttp import web
import aiohttp_cors

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
    def on_send_success(record_metadata):
        logs.error(record_metadata.topic)
        logs.error(record_metadata.partition)
        logs.error(record_metadata.offset)

    def on_send_error(excp):
        logs.error('I am an errback', exc_info=excp)
        # handle exception

    count = 0
    while count < 50:
        num = random.randint(0, 10)
        num_bytes = bytes(str(num), encoding='utf-8')
        producer.send(kafka_topic, value=num_bytes, key=num_bytes).add_callback(on_send_success).add_errback(on_send_error)
        count += 1
        logs.info('====== Count %s', count)
        time.sleep(1)

    return web.Response(text='Done, Final count: {}'.format(count))


app = web.Application()
app.add_routes(routes)

# Configure default CORS settings.
cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
        expose_headers="*",
        allow_headers="*",
        allow_methods="*",
    )
})

# Configure CORS on all routes.
for route in list(app.router.routes()):
    cors.add(route)

if __name__ == '__main__':
    web.run_app(app)
