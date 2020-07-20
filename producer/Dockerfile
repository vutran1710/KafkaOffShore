FROM kennethreitz/pipenv:latest

WORKDIR /

COPY . .

RUN chmod +x wait-for-it.sh

RUN pipenv install --deploy --system

EXPOSE 8000

CMD ./wait-for-it.sh -s -t 30 $ZOOKEEPER_SERVER -- ./wait-for-it.sh -s -t 30 $KAFKA_SERVER -- pipenv run dev
