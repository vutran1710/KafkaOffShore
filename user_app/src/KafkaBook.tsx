import React from 'react'
import BookCover from './BookCover'
import * as ApiClient from './ApiClient'

type AppState = {
  loading: boolean;
  hitCount: number;
  buttonText: string;
  count: number;
}

export default class KafkaBook extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      loading: false,
      hitCount: 0,
      buttonText: "request here!",
      count: 0,
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

      const onOk = () => this.setState({
        loading: false,
        buttonText: "request here!",
      })

      const onErr = () => this.setState({
        loading: false,
        buttonText: "Kafka is not alive..."
      })

      ApiClient.streamNumber(this.state.count, onOk, onErr)

    }, 1000)
  }

  changeText = (buttonText: string) => () => {
    if (!this.state.loading) {
      this.setState({ buttonText })
    }
  }

  setCount = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement
    const count = parseInt(target.value, 10)
    this.setState({ count })
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
            <BookCover loading={loading} />
          </div>
          <div className="footer">
            <div className="text--center">
              <a
                className={`button ${loading && 'button--disabled'}`}
                onClick={this.requestSendIntegerStream}
                onMouseEnter={this.changeText('send Kafka request?')}
                onMouseLeave={this.changeText("request here!")}
              >
                {buttonText}
              </a>
            </div>
          </div>
          <div className="bookmarker" />
        </div>
        <div>
          <input
            value={count}
            onChange={this.setCount}
            className="request-count-input"
            type="number"
          />
        </div>
      </React.Fragment>
    )
  }
}
