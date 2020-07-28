import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'

const Bookmarker = _ => {
  const bookmarkPath = _.location.pathname !== '/' ? '/' : '/read'
  return (
    <Link to={bookmarkPath}>
      <div className="bookmarker" />
    </Link>
  )
}

export default withRouter(Bookmarker)
