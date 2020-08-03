FROM python:3.7.8-slim
WORKDIR /

ADD app.py .
ADD wait-for-it.sh .
ADD Pipfile .
ADD Pipfile.lock .

RUN pip install pipenv
RUN chmod +x wait-for-it.sh
RUN pipenv install --deploy

CMD ./wait-for-it.sh -s -t 30 $ZOOKEEPER_SERVER -- ./wait-for-it.sh -s -t 30 $KAFKA_SERVER -- pipenv run python app.py
