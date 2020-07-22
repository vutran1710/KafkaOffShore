import org.apache.spark.SparkConf
import org.apache.spark.SparkContext


package utils {

  trait Context {

    lazy val conf = new SparkConf()
      .setAppName("Learn Spark")
      .setMaster("spark://localhost:7077")
      .set("spark.executor.cores", "1")
      .set("spark.executor.memory", "512m")

    lazy val sctx = new SparkContext(conf)
  }

}
