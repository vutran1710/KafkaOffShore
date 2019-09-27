import React from 'react'
import * as kafka from './kafka.png'

export interface Props {
  loading: boolean;
}

const KafkaInterface = ({ loading }: Props) => {

  const whichImage = loading ? 'http://giphygifs.s3.amazonaws.com/media/2wZswhaUnzAti/giphy.gif' : kafka
  const kafkaImageClass = `kafka-image ${loading ? 'kafka-image__dark' : ''}`

  return (
    <div className="instruction">
      <div className={kafkaImageClass} >
        <img src={whichImage} height="120" width="120" />
      </div>
      <div className="title--main">
        <span>K</span><span>A</span><span>F</span><span>K</span><span>A</span>
      </div>
      <div className="title--sub">
        OFF THE SHORE
      </div>
    </div>
  )
}

export default KafkaInterface
