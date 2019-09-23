import React from 'react'
import wretch from 'wretch'
import './style.scss'


export default class UserApp extends React.Component {
  state = {
    loading: false,
    hitCount: 0,
  }

  requestSendIntegerStream = () => {
    this.setState({ loading: true, hitCount: this.state.hitCount + 1 })
    wretch('http://localhost:8080/api/stream_int').put().res().then(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <h1>Hello Dear Users!</h1>
        <hr />
        {this.state.loading && (
          <div>
            <div>Sending....</div>
            <hr />
          </div>
        )}
        <button disabled={this.state.loading} onClick={this.requestSendIntegerStream}>
          Send!
        </button>
        <hr />
        Hit count: {this.state.hitCount}
      </div>
    )
  }
}
