FROM kennethreitz/pipenv:latest
WORKDIR /

ADD consumer.py .
ADD wait-for-it.sh .
ADD Pipfile .
ADD Pipfile.lock .

RUN chmod +x wait-for-it.sh
RUN pipenv install --three

CMD ./wait-for-it.sh -s -t 30 $ZOOKEEPER_SERVER -- ./wait-for-it.sh -s -t 30 $KAFKA_SERVER -- pipenv run python consumer.py
