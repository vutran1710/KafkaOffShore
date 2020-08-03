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
job_hosting_ip := "docker inspect -f \"{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\" job_hosting"

spark_submit_command := spark-submit --deploy-mode cluster --master spark://spark-master:7077 --class StreamJob

spark_docker_options := --network=kafka_offshore --name spark-job

assemble_scala_code := rm -rf spark_job/target/ && cd spark_job/ && sbt assembly && cd ..

spark_image = bitnami/spark:3

job:
	$(assemble_scala_code)
	docker rm spark-job
	docker run $(spark_docker_options) $(spark_image) $(spark_submit_command)

submit_job:
	docker stop spark-job && docker rm spark-job
	docker run $(spark_docker_options) $(spark_image) $(spark_submit_command) http://$$(eval $(job_hosting_ip))/jobs/stream-job.jar
