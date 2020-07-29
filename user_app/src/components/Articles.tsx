import React from 'react'
import post_mock_data from '../utils/article_data'


type PostData = {
  id: number
  content: string
  image?: string
}

type State = {
  scrollTop: number;
}

type Props = null

export default class Articles extends React.Component<Props, State> {
  myRef = React.createRef<HTMLDivElement>()
  state = { scrollTop: 0 }
  ticker = null
  lastScroll = null

  componentDidMount() {
    // Intervally check the scroll position every 1.2s,
    this.ticker = setInterval(this.checkIsReading, 1200)
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
    this.ticker = null
  }

  checkIsReading = () => {
    // if this.state.scrollTop is not changing,
    // that means User is reading the in-view post
    if (this.lastScroll === this.state.scrollTop) {
      const whichPost = Math.round(this.lastScroll / 500 + 1)
      console.log(`User is reading post: #${whichPost}`)
    } else {
      this.lastScroll = this.state.scrollTop
    }
  }

  onScroll = () => {
    const scrollTop = this.myRef.current.scrollTop
    this.lastScroll = this.state.scrollTop
    this.setState({
      scrollTop: scrollTop
    })
  }

  render() {
    return (
      <div className="article-container">
        <div className="article-container--header">
          <h2>Stories</h2>
        </div>
        <div
          className="article-container--body"
          ref={this.myRef}
          onScroll={this.onScroll}
        >
          {(post_mock_data as Array<PostData>).map(post => (
            <div className="article-container--post article-container--post__container" key={post.id}>
              <div className="article-container--post__header">
                ... #{post.id}
              </div>
              <div className="article-container--post__body">
                <p>{post.content}</p>
                <div>
                  <img alt={`${post.id}-image`} src={post.image} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
