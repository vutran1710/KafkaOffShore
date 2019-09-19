from kafka import KafkaConsumer

# continuous loop
var = 1
while var == 1:

    # initialize consumer to given topic and broker
    consumer = KafkaConsumer('test-topic',
                            group_id='consumer-1',
                            bootstrap_servers='localhost:32768')

    # loop and print messages
    for msg in consumer:
        print (msg)
