import utils.Context
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.apache.spark.streaming.kafka010._
import org.apache.spark.streaming.kafka010.LocationStrategies.PreferConsistent
import org.apache.spark.streaming.kafka010.ConsumerStrategies.Subscribe



object Sparkling extends App with Context {

  val streamingContext = new StreamingContext(sctx, Seconds(1))

  streamingContext.checkpoint("~/checkpoints")

  val kafkaParams = Map[String, Object](
    "bootstrap.servers" -> "172.21.0.4:9092,172.21.0.6:9092",
    "key.deserializer" -> classOf[StringDeserializer],
    "value.deserializer" -> classOf[StringDeserializer],
    "group.id" -> "use_a_separate_group_id_for_each_stream",
    "auto.offset.reset" -> "latest",
    "enable.auto.commit" -> (false: java.lang.Boolean)
  )

  val topics = Array("flight")
  val stream = KafkaUtils.createDirectStream[String, String](
    streamingContext,
    PreferConsistent,
    Subscribe[String, String](topics, kafkaParams)
  )

  stream.map(record => {
    println(s"record = $record")
    (record.key, record.value)
  }).foreachRDD(rdd => {
    println(s"rd = $rdd")
    rdd.foreach(s => println(s">>>>>>>>>>>>>>>>> haha = $s"))
  })

  streamingContext.start()
  streamingContext.awaitTermination()
}
