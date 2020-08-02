FROM python:3.7.8-slim
WORKDIR /
COPY . .

RUN chmod +x wait-for-it.sh
RUN pip install pipenv
RUN pipenv install --system

EXPOSE 8000

CMD ./wait-for-it.sh -s -t 30 $ZOOKEEPER_SERVER -- ./wait-for-it.sh -s -t 30 $KAFKA_SERVER -- pipenv run dev
