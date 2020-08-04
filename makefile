#######################################################################################
# SETUP EVERYTHING
#######################################################################################
__deps:
# Installing all required dependencies
	cd user_app && npm install
	cd ..
	cd admin_app && npm install
	cd ..
	cd producer && pipenv install --dev
	cd ..
	cd consumer && pipenv install --dev
	cd ..

__network:
# creating docker network
# NOTE: using a specific subnet
# in case we want to assign static IP later
	docker network create --subnet=172.16.238.0/24 kafka_offshore

setup: __deps __network

#######################################################################################
# GET UP AND RUNNING
#######################################################################################
getup:
# docker-compose up, can scale more kafka-brokers and/or
# spark-worker using arguments: n=<int> s=<int>
# Eg: make up-scale k=2 s=3
	docker-compose up -d --force-recreate --build --scale kafka=$(k) --scale spark-worker=$(s)

app_user:
	echo "Running User Application to interact with Producer Backend API"
	cd user_app && npm start

app_admin:
	echo "Running Admin Application to view real-time changes from CouchDB"
	cd admin_app && npm start

couch_cors:
	npx add-cors-to-couchdb http://localhost:5984 -u admin -p 1234abc


#######################################################################################
# SUBMITTING JOBS
#######################################################################################
job_hosting_ip := "docker inspect -f \"{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\" job_hosting"

spark_submit_command := spark-submit \
												--class StreamJob \
												--master spark://spark-master:7077 \
												--deploy-mode cluster \
												--executor-memory 1G \
												--total-executor-cores 1 \
												--num-executors 1

spark_docker_options := --network=kafka_offshore --name spark-job

assemble_scala_code := rm -rf spark_job/target/ && cd spark_job/ && sbt assembly && cd ..

spark_image = bitnami/spark:3

assemble_job:
	$(assemble_scala_code)

job:
	$(assemble_scala_code)
	docker rm spark-job
	docker run $(spark_docker_options) $(spark_image) $(spark_submit_command) http://$$(eval $(job_hosting_ip))/jobs/stream-job.jar

submit_job:
	docker stop spark-job && docker rm spark-job
	docker run $(spark_docker_options) $(spark_image) $(spark_submit_command) http://$$(eval $(job_hosting_ip))/jobs/stream-job.jar
