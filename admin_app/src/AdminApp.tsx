import React from 'react'
import PouchDB from 'pouchdb'
import ConsumerLabors from './ConsumerLabors'
import DistributionContainer from './DistributionContainer'
import Notification from './Notification'
import Header from './Header'

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
      consumerLabors: {},
    }
  }

  registerDoc = (d: Doc) => {
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
    const docs = await remotedb.allDocs({ include_docs: true }).then(resp => resp.rows.map(r => r.doc)) as Doc[]

    docs.forEach(this.registerDoc)
    this.setState({ db: remotedb })

    remotedb.changes({
      since: 'now',
      live: true,
      include_docs: true,
    }).on('change', change => {
      this.registerDoc(change.doc)
    })
  }

  render() {

    const {
      hostnameClass,
      consumerLabors,
      docs: Docs,
    } = this.state

    return (
      <div className="app-container">
        <Header classes={hostnameClass} />
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
