import React from 'react'
import wretch from 'wretch'
import './style.scss'


export default class UserApp extends React.Component {
  state = {
    loading: false
  }

  requestSendIntegerStream = async () => {
    this.setState({ loading: true })
    await wretch('http://localhost:8080/api/stream_int').put()
    this.setState({ loading: false })
  }

  render() {
    return (
      <div>
        <h1>Hello Dear Users!</h1>
        <hr />
        {this.state.loading && <div>Sending....</div>}
        <button disabled={this.state.loading} onClick={this.requestSendIntegerStream}>
          Send!
        </button>
      </div>
    )
  }
}
