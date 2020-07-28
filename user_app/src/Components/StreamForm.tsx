import React from 'react'


export default class StreamForm extends React.Component {
  state = {
    count: 0
  }

  handleChange = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement
    const count = parseInt(target.value, 10)
    this.setState({ count })
  }


  submit = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className="kafka-stream-form">
        <h3 className="kafka-stream-form--header">Stream Job</h3>
        <form className="kafka-stream-form--form" onSubmit={this.submit}>
          <div className="kafka-stream-form--form stream-form--count">
            <label htmlFor="">Number to stream</label>
            <input
              name="stream-count-value"
              type="number"
              value={this.state.count}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">
            send stream
          </button>
        </form>
      </div>
    )
  }
}
