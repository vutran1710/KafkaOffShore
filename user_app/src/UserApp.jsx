import * as React from 'react'
import wretch from 'wretch'


export default class UserApp extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
    this.requestSendIntegerStream = this.requestSendIntegerStream.bind(this)
  }

  async requestSendIntegerStream() {
    this.setState({ loading: true })
    await wretch('http://localhost:8080/api/stream_int').put()
    this.setState({ loading: false })
  }

  render() {
    return (
      <div>
        Hello Dear Users!
        <hr />
        {this.state.loading && <div>Sending....</div>}
        <button disabled={this.state.loading} onClick={this.requestSendIntegerStream}>
          Send!
        </button>
      </div>
    )
  }
}
