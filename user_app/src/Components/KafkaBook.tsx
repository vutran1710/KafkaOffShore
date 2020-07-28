import React from 'react'
import { Link } from 'react-router-dom'
import BookCover from './BookCover'

type AppState = {
  loading: boolean;
  buttonText: string;
}

export default class KafkaBook extends React.Component<{}, AppState> {
  state = {
    loading: false,
    buttonText: "request here!",
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
      <React.Fragment>
        <div className="author">
          <div>inspired by</div>
          <div>haruki murakami</div>
        </div>
        <div className="info-container">
          <BookCover loading={loading} />
        </div>
        <div className="footer text--center">
          <Link
            to="/send-int"
            className={`button ${loading && 'button--disabled'}`}
            onMouseEnter={this.changeText('send Kafka request?')}
            onMouseLeave={this.changeText("request here!")}
          >
            {buttonText}
          </Link>
        </div>
      </React.Fragment>
    )
  }
}
