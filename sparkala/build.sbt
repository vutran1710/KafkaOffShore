import Dependencies._

ThisBuild / scalaVersion     := "2.12.8"
ThisBuild / version          := "0.1.0-SNAPSHOT"
ThisBuild / organization     := "com.example"
ThisBuild / organizationName := "example"

name := "learn-spark"

version := "1.0"

val sparkVersion = "3.0.0"

libraryDependencies ++= Seq(
  "org.apache.spark" %% "spark-core" % sparkVersion % "provided",
  "org.apache.spark" %% "spark-streaming" % sparkVersion % "provided",
  "org.apache.spark" %% "spark-streaming-kafka-0-10" % sparkVersion,
  "org.apache.spark" %% "spark-sql" % sparkVersion % "provided",
  "org.apache.kafka" % "kafka-clients" % "2.5.0",
  "log4j" % "log4j" % "1.2.17" % "provided",
  "com.cloudant" % "cloudant-client" % "2.19.1",
  "org.apache.bahir" %% "spark-sql-cloudant" % "2.4.0",
)

test in assembly := {}

assemblyMergeStrategy in assembly := {
 case PathList("META-INF", xs @ _*) => MergeStrategy.discard
 case x => MergeStrategy.first
}

assemblyOption in assembly := (assemblyOption in assembly).value.copy(includeScala = false)

assemblyJarName in assembly := "stream-job.jar"
