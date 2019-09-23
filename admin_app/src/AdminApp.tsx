import React from 'react'
import wretch from 'wretch'
import PouchDB from 'pouchdb'
import './style.scss'


export default class AdminApp extends React.Component {
  state = {
    loading: false,
    db: undefined,
    docs: [],
  }

  async componentDidMount() {
    const remotedb = new PouchDB('http://localhost:5984/flightdb')
    const localdb = new PouchDB('localdb')
    PouchDB.replicate(remotedb, localdb, { live: true }).on('change', info => {
      const newDoc = info.docs[0]
      this.setState({
        docs: [
          ...this.state.docs,
          newDoc,
        ]
      })
    })

    const docs = await localdb.allDocs({ include_docs: true }).then(resp => resp.rows.map(r => r.doc))
    this.setState({ db: localdb, docs })
  }

  render() {
    return (
      <div>
        <h1>
          Hello Admin!
        </h1>
        <div className="doc-container">
          <ul>
            {this.state.docs.map(r => (
              <li key={r._id} className="row">
                <div>ID: {r._id}</div>
                <div>Count: {r.count}</div>
                <div>Total: {r.total}</div>
                ====================
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
