import React from 'react'
import PouchDB from 'pouchdb'
import './style.scss'

const colors = [
  'red',
  'yellow',
  'green',
  'blue',
  'purple',
]

type Doc = {
  _id: string;
  hostname: string;
  partition: number;
  offset: number;
  value: number;
}

type AppState = {
  loading: boolean;
  db: PouchDB.Database<{}>;
  docs: Doc[];
  hostnameClass: object;
}

export default class AdminApp extends React.Component<{}, AppState> {

  private myRef = React.createRef<HTMLDivElement>()

  constructor(props: {}) {
    super(props)
    this.state = {
      loading: false,
      db: undefined,
      docs: [],
      hostnameClass: {}
    }
  }

  registerConsumer(hostname: string, prefix = 'row row--') {
    if (this.state.hostnameClass[hostname]) {
      return `${prefix}${this.state.hostnameClass[hostname]}`
    }
    const color = colors.find(c => !Object.values(this.state.hostnameClass).some(cls => cls === c))
    this.setState({
      hostnameClass: {
        ...this.state.hostnameClass,
        [hostname]: color
      }
    })
    return `${prefix}${color}`
  }

  async componentDidMount() {
    const remotedb = new PouchDB('http://localhost:5984/flightdb')
    const docs = await remotedb.allDocs({ include_docs: true }).then(resp => resp.rows.map(r => r.doc))
    this.setState({ db: remotedb, docs })
    remotedb.changes({
      since: 'now',
      live: true,
      include_docs: true,
    }).on('change', change => {
      const newDoc = change.doc
      this.setState({ docs: [...this.state.docs, newDoc] })
      this.scroll()
    })
  }

  scroll() {
    const element = this.myRef.current
    const scroll = element.scrollHeight
    element.scrollTop = scroll
  }

  render() {

    return (
      <div>
        <div className="header">
          <div className="page-title">
            Admin App
          </div>
          <div className="legends">
            <div className="legends-item">
              Docker_Consumer_ID
            </div>
            {Object.keys(this.state.hostnameClass).map(k => (
              <div className="legends-item" key={k}>
                <div className={this.registerConsumer(k, 'legends-color row--')} />
                <div className="legends-text">{k}</div>
              </div>
            ))}
          </div>
        </div>
        <hr className="divider" />
        <div className="doc-container" ref={this.myRef}>
          <ul>
            {this.state.docs.map(r => (
              <li key={r._id} className={this.registerConsumer(r.hostname)}>
                <div>Part: {r.partition}</div>
                <div>Offset: {r.offset}</div>
                <div>Value: {r.value}</div>
                <hr />
                <div className="doc-id">
                  {r._id}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <hr className="divider" />
        <div className="footer">
          Doc count: {this.state.docs.length}
        </div>
      </div>
    )
  }
}
