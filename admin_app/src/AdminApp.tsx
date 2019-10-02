import React from 'react'
import PouchDB from 'pouchdb'
import ConsumerLabors from './ConsumerLabors'
import DistributionContainer from './DistributionContainer'
import Notification from './Notification'

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
  autoScroll: boolean;
  consumerLabors: any;
}

export default class AdminApp extends React.Component<{}, AppState> {

  private myRef = React.createRef<HTMLDivElement>()

  constructor(props: {}) {
    super(props)
    this.state = {
      loading: false,
      db: undefined,
      docs: undefined,
      hostnameClass: {},
      autoScroll: true,
      consumerLabors: {},
    }
  }

  registerDoc = d => {
    const hostnameClass = { ...this.state.hostnameClass }
    const consumerLabors = { ...this.state.consumerLabors }
    const docs = [...(this.state.docs || []), d]

    if (!this.state.hostnameClass[d.hostname]) {
      const color = colors.find(c => !Object.values(this.state.hostnameClass).some(cls => cls === c))
      hostnameClass[d.hostname] = color
    }

    consumerLabors[d.hostname] = (consumerLabors[d.hostname] || 0) + 1

    this.setState({ hostnameClass, consumerLabors, docs })
  }

  async componentDidMount() {
    const remotedb = new PouchDB('http://localhost:5984/flightdb')
    const docs = await remotedb.allDocs({ include_docs: true }).then(resp => resp.rows.map(r => r.doc))

    docs.forEach(this.registerDoc)
    this.setState({ db: remotedb })

    remotedb.changes({
      since: 'now',
      live: true,
      include_docs: true,
    }).on('change', change => {
      this.registerDoc(change.doc)
      this.state.autoScroll && this.scroll()
    })
  }

  scroll() {
    const element = this.myRef.current
    const scroll = element.scrollHeight
    element.scrollTop = scroll
  }

  render() {

    const {
      hostnameClass,
      consumerLabors,
      docs: Docs,
    } = this.state

    const legendsClass = (hostname: string) => 'legends-color bg-' + hostnameClass[hostname]

    return (
      <div className="app-container">
        <div className="header shadow">
          <div className="page-title">
            Admin App
          </div>
          <div className="legends">
            <div className="legends-item">
              Consumer ID
            </div>
            {Object.keys(hostnameClass).map(k => (
              <div className="legends-item" key={k}>
                <div className={legendsClass(k)} />
                <div className="legends-text">{k}</div>
              </div>
            ))}
          </div>
        </div>
        {!Docs && <Notification.Sync />}
        {Docs && Docs.length === 0 && <Notification.Empty />}
        {Docs && Docs.length && (
          <div className="flex">
            <DistributionContainer docs={Docs} classes={hostnameClass} />
            <ConsumerLabors consumers={consumerLabors} colors={hostnameClass} />
          </div>
        )}
      </div>
    )
  }
}
