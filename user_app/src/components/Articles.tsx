import React from 'react'
import posts from '../utils/article_data'

type AppState = {
  cursorPosition: number;
  readTime: number;
}

type Post = {
  id: number;
  content: string;
}

export default class Articles extends React.Component<{}, AppState> {
  state = {
    cursorPosition: 0,
    readTime: 0,
  }

  render() {
    const { cursorPosition, readTime } = this.state
    return (
      <div className="article-container">
        {posts.map((p: Post) => (
          <div className="article-container--post article-container--post__container" key={p.id}>
            <div className="article-container--post__header">
              #{p.id}
            </div>
            <div className="article-container--post__body">
              <p className="article-container--post__body--content">
                {p.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
