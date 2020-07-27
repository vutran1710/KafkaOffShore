import React from 'react'
import wretch from 'wretch'
import KafkaInterface from './KafkaInterface'
import './style.scss'

type AppState = {
  loading: boolean;
  hitCount: number;
  buttonText: string;
  count: number;
}

export default class UserApp extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      loading: false,
      hitCount: 0,
      buttonText: "com' heree!",
      count: 1,
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

      wretch('http://localhost:8000/stream-int').query({ count: this.state.count || 1 })
        .put()
        .res()
        .then(() => {
          this.setState({
            loading: false,
            buttonText: "com' heree!"
          })
        })
        .catch(() => {
          this.setState({
            loading: false,
            buttonText: "Kafka is not alive..."
          })
        })

    }, 1000)
  }

  changeText = (buttonText: string) => () => {
    if (!this.state.loading) {
      this.setState({ buttonText })
    }
  }

  setCount = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement
    this.setState({ count: parseInt(target.value || '0', 10) })
  }

  render() {

    const {
      buttonText,
      loading,
      count,
    } = this.state

    return (
      <React.Fragment>
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
        <input value={count} onChange={this.setCount} className="request-count-input" />
      </React.Fragment>
    )
  }
}
