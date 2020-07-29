import React from 'react'
import posts from '../utils/article_data'

type AppState = {
  cursorPosition: number;
  readTime: number;
}

type Post = {
  id: number;
  content: string;
  image?: string;
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
        <div className="article-container--header">
          <h2>Stories</h2>
        </div>
        <div className="article-container--body">
          {posts.map((p: Post) => (
            <div className="article-container--post article-container--post__container" key={p.id}>
              <div className="article-container--post__header">
                ... #{p.id}
              </div>
              <div className="article-container--post__body">
                <p>{p.content}</p>
                <div>
                  <img alt={`${p.id}-image`} src={p.image} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
