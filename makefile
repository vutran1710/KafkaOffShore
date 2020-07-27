setup:
	echo "===== Installing dependencies"
	cd user_app && npm i
	cd ..
	cd admin_app && npm i
	cd ..
	cd producer && pipenv install --dev
	cd ..
	cd consumer && pipenv install --dev
	cd ..
	echo "===== Getting dockerization"
	docker network create kafka_offshore

up-scale:
# Compose up with shortcut to scale more brokers and/or spark-worker
# eg: make up-scale k=2 s=3
	docker-compose up -d --force-recreate --build --scale kafka=$(k) --scale spark-worker=$(s)

fe_user:
	echo "Running User Application to interact with Producer Backend API"
	cd user_app && npm start

fe_admin:
	echo "Running Admin Application to view real-time changes from CouchDB"
	cd admin_app && npm start

add_cors_couch:
	npx add-cors-to-couchdb http://localhost:5984 -u admin -p 1234abc


# The following is the command to submit the spark-job to our tiny spark custer
spark_submit_command := spark-submit --class StreamJob \
												--master spark://spark-master:7077 \
												--deploy-mode client \
												/tmp/jobs/stream-job.jar

spark_docker_options := --mount type=bind,src=$$(pwd)/spark_job/target/scala-2.12,dst=/tmp/jobs \
												--network=kafka_offshore \
												--name spark-job

submit_job:
	rm -rf spark_job/target/ && cd spark_job/ && sbt assembly && cd ..
	docker run $(spark_docker_options) bitnami/spark:3 $(spark_submit_command)
