import utils.Context
import org.apache.spark.rdd.RDD



object Sparkling extends App with Context {

  val sc = sctx
  val rdd: RDD[Int] = sc.parallelize(List(1,2,3,4,5))
  val rddCollect: Array[Int] = rdd.collect()

  println("Number of Partitions: "+rdd.getNumPartitions)
  println("Action: First element: "+rdd.first())
  println("Action: RDD converted to Array[Int] : ")
  rddCollect.foreach(println)

  sc.stop()
}
