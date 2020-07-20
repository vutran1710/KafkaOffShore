FROM kennethreitz/pipenv:latest

WORKDIR /

COPY . .

RUN chmod +x wait-for-it.sh

RUN pipenv install --deploy --system

CMD ./wait-for-it.sh -s -t 60 $KAFKA_SERVER -- pipenv run dev
