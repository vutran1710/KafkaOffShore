FROM python:3.6-slim

WORKDIR /app

COPY . .

RUN chmod +x wait-for-it.sh

RUN apt-get update && apt-get install gcc -y && pip install pipenv

RUN pipenv install --deploy

EXPOSE 9009

CMD STAGE=PRODUCTION ./wait-for-it.sh -s -t 60 $KAFKA_SERVER -- pipenv run dev
