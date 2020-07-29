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
    buttonText: "~ vutran ~",
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
      <Link to="/content" className="cover-link-container">
        <div className="author">
          <div>inspired by</div>
          <div>haruki murakami</div>
        </div>
        <div className="info-container">
          <BookCover loading={loading} />
        </div>
        <div className="footer text--center">
          <div className="author-signature">
            {buttonText}
          </div>
        </div>
      </Link>
    )
  }
}
