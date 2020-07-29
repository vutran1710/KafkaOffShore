import React from 'react'
import { Link } from 'react-router-dom'

const TableOfContent = () => (
  <div className="content-table">
    <Link to="/" style={{ color: 'black' }}>
      <h2>Index</h2>
    </Link>
    <ol>
      <li><Link to="/send-int">Stream Job</Link></li>
      <li><Link to="read">Reading</Link></li>
    </ol>
  </div>
)

export default TableOfContent
