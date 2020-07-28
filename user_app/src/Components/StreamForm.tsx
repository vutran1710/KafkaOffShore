import React from 'react'
import * as ApiClient from '../ApiClient'


export default class StreamForm extends React.Component {
  state = {
    count: 0,
    infoText: '',
  }

  handleChange = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement
    const count = parseInt(target.value, 10)
    this.setState({ count: count < 0 ? 0 : count })
  }

  submit = () => {
    const onOk = () => this.setState({ count: 0 })
    const onErr = () => {
      this.setState({
        count: 0,
        infoText: 'Error! Backend may not be alive!'
      })
      setTimeout(() => this.setState({ infoText: '' }), 2000)
    }

    ApiClient.streamNumber(this.state.count, onOk, onErr)
  }

  render() {
    return (
      <div className="kafka-stream-form">
        <h2 className="kafka-stream-form--header">Stream Job</h2>
        <form className="kafka-stream-form--form" onSubmit={this.submit}>
          <div className="kafka-stream-form--form stream-form--count">
            <label htmlFor="stream-count-input">
              Number to stream
              <input
                id="stream-count-input"
                name="stream-count-input"
                className="stream-count-input"
                type="number"
                value={this.state.count}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <a className="stream-form-button" onClick={this.submit}>
            Send!
          </a>
          <div>
            <small className="warning-text">
              {this.state.infoText}
            </small>
          </div>
        </form>
      </div>
    )
  }
}
