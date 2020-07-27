import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.spark.SparkConf
import org.apache.spark.streaming._
import org.apache.spark.streaming.kafka010._
import org.apache.log4j.{LogManager, Logger}


object StreamJob  {
  var log: Logger = LogManager.getLogger(this.getClass.getName)

  def main(args: Array[String]): Unit = {
    runApp("flight")
  }

  def runApp(topic: String): Unit = {
    val brokers = "kafka:9092,kafka:9093"
    val groupId = "any-id"

    // Create context with 2 second batch interval
    val sparkConf = new SparkConf()
      .setAppName("StreamJob")
      .set("spark.executor.memory", "512m")
      .set("spark.executor.cores", "1")

    val ssc = new StreamingContext(sparkConf, Seconds(2))

    // Create direct kafka stream with brokers and topics
    val topicsSet = Set(topic)
    val kafkaParams = Map[String, Object](
      ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG -> brokers,
      ConsumerConfig.GROUP_ID_CONFIG -> groupId,
      ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG -> classOf[StringDeserializer],
      ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG -> classOf[StringDeserializer],
    )

    val stream = KafkaUtils.createDirectStream[String, String](
      ssc,
      LocationStrategies.PreferConsistent,
      ConsumerStrategies.Subscribe[String, String](topicsSet, kafkaParams),
    )

    val rdds = stream.map(record => (record.key, record.value))

    rdds.foreachRDD(rdd => {
      rdd.collect().foreach(item => {
        val (key, value) = item
        this.log.info(s">>>>> $key = $value")
      })
    })

    ssc.start()
    ssc.awaitTermination()
  }

}

// scalastyle:on println
