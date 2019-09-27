import React from 'react'
// import wretch from 'wretch'
import KafkaInterface from './KafkaInterface'
import './style.scss'

type AppState = {
  loading: boolean;
  hitCount: number;
  buttonText: string;
}

export default class UserApp extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      loading: false,
      hitCount: 0,
      buttonText: "com' heree!"
    }
  }

  requestSendIntegerStream = () => {
    if (this.state.loading) {
      return
    }

    return setTimeout(() => {
      this.setState({
        loading: true,
        buttonText: 'Sent!'
      })

      /*
       * wretch('http://localhost:8080/api/stream_int').put().res().then(() => {
       *   this.setState({ loading: false })
       * })
       *
       */

    }, 1000)
  }

  changeText = (buttonText: string) => () => {
    if (!this.state.loading) {
      this.setState({ buttonText })
    }
  }

  render() {

    const {
      buttonText,
      loading,
    } = this.state

    return (
      <div className="kafka-container">
        <div className="author">
          <div>inspired by</div>
          <div>haruki murakami</div>
        </div>
        <div className="info-container">
          <KafkaInterface loading={loading} />
        </div>
        <div className="footer">
          <div className="text--center">
            <a
              className={`button ${loading && 'button--disabled'}`}
              onClick={this.requestSendIntegerStream}
              onMouseEnter={this.changeText('send Kafka request?')}
              onMouseLeave={this.changeText("com' heree!")}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    )
  }
}
