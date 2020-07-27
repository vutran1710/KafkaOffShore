import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.common.serialization.StringDeserializer

import org.apache.spark.SparkConf
import org.apache.spark.streaming._
import org.apache.spark.streaming.kafka010._

/**
 * Consumes messages from one or more topics in Kafka and does wordcount.
 * Usage: DirectKafkaWordCount <brokers> <topics>
 *   <brokers> is a list of one or more Kafka brokers
 *   <groupId> is a consumer group name to consume from topics
 *   <topics> is a list of one or more kafka topics to consume from
 *
 * Example:
 *    $ bin/run-example streaming.DirectKafkaWordCount broker1-host:port,broker2-host:port \
 *    consumer-group topic1,topic2
 */
object StreamJob extends App {
  println("Hello, run spark,.....")
  // val Array(brokers, groupId, topics) = args
  val brokers = "zookeeper:2181"
  val groupId = "any-id"

  // Create context with 2 second batch interval
  val sparkConf = new SparkConf()
    .setAppName("StreamJob")
    .set("spark.executor.memory", "512m")
    .set("spark.executor.cores", "1")

  val ssc = new StreamingContext(sparkConf, Seconds(2))

  // Create direct kafka stream with brokers and topics
  val topicsSet = Set("flight")
  val kafkaParams = Map[String, Object](
    ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG -> brokers,
    ConsumerConfig.GROUP_ID_CONFIG -> groupId,
    ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG -> classOf[StringDeserializer],
    ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG -> classOf[StringDeserializer],
  )

  val messages = KafkaUtils.createDirectStream[String, String](
    ssc,
    LocationStrategies.PreferConsistent,
    ConsumerStrategies.Subscribe[String, String](topicsSet, kafkaParams),
  )

  // Get the lines, split them into words, count the words and print
  val lines = messages.map(_.value)
  // val words = lines.flatMap(_.split(" "))
  // val wordCounts = words.map(x => (x, 1L)).reduceByKey(_ + _)
  lines.print()

  // Start the computation
  ssc.start()
  ssc.awaitTermination()
}
// scalastyle:on println
