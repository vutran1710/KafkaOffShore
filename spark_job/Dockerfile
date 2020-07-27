FROM bitnami/spark:3

WORKDIR /

COPY ./target/scala-2.12/stream-job.jar ./spark_jobs/

# RUN cd opt

# RUN  bin && ls

CMD ./bin/spark-submit --class StreamJob --master $SPARK_MASTER_URL --deploy-mode cluster /spark_jobs/stream-job.jar
