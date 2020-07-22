import Dependencies._

ThisBuild / scalaVersion     := "2.12.8"
ThisBuild / version          := "0.1.0-SNAPSHOT"
ThisBuild / organization     := "com.example"
ThisBuild / organizationName := "example"

name := "learn-spark"

version := "1.0"

libraryDependencies += "org.apache.spark" % "spark-core_2.12" % "3.0.0"
