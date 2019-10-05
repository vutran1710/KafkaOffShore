import React from 'react'
import * as neko from './neko.png'

const Header = ({ classes }) => {

  const legendsClass = (hostname: string) => 'legends-color bg-' + classes[hostname]

  return (
    <div className="header shadow">
      <div className="page-title">
        <div className="neko flex">
          <img alt="neko" src={neko} />
        </div>
        <div>
          Admin
        </div>
      </div>
      <div className="legends">
        <div className="legends-item">
          Consumer ID
        </div>
        {Object.keys(classes).map(k => (
          <div className="legends-item" key={k}>
            <div className={legendsClass(k)} />
            <div className="legends-text">{k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
