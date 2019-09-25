setup:
	echo "===== Installing dependencies"
	cd user_app && npm i
	cd ..
	cd admin_app && npm i
	cd ..
	cd producer && pipenv install
	cd ..
	cd consumer && pipenv install
	cd ..
	echo "===== Getting dockerization"
	docker-compose up -d --build

up-build:
	docker-compose up -d --force-recreate --build

up:
	docker-compose up -d

up-scale:
	docker-compose up -d --force-recreate --build --scale kafka=3 --scale kafka-consumer=3

fe_user:
	echo "Running User Application to interact with Producer Backend API"
	cd user_app && npm start

fe_admin:
	echo "Running Admin Application to view real-time changes from CouchDB"
	cd admin_app && npm start

producer_dev:
	cd producer && pipenv run dev

add_cors_couch:
	npx add-cors-to-couchdb http://localhost:5984 -u admin -p 1234abc
