import React from 'react'
import wretch from 'wretch'
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
      buttonText: "com' her!"
    }
  }

  requestSendIntegerStream = () => {

    this.setState({
      loading: true,
      hitCount: this.state.hitCount + 1,
    })

    wretch('http://localhost:8080/api/stream_int').put().res().then(() => {
      this.setState({ loading: false })
    })
  }

  changeText = (buttonText: string) => () => {
    this.setState({ buttonText })
  }

  render() {

    const {
      buttonText,
      loading,
    } = this.state

    return (
      <div className="kafka-container">
        <div className="author">
          by <b>vutr</b>, inspired by <i>Haruki Murakami</i>
        </div>
        <div className="info-container">
          <KafkaInterface loading={loading} />
        </div>
        <div className="footer">
          <div className="text--center">
            <button
              disabled={loading}
              onClick={this.requestSendIntegerStream}
              onMouseEnter={this.changeText('send kafka request?')}
              onMouseLeave={this.changeText('click here!')}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
