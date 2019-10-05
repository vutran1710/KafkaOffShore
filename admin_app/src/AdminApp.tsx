import React from 'react'
import PouchDB from 'pouchdb'
import ConsumerLabors from './ConsumerLabors'
import StaticTimeGraph from './StaticTimeGraph'
import DistributionContainer from './DistributionContainer'
import Notification from './Notification'
import Header from './Header'
import { BarColors } from './constants'
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
  timestamp: number;
}

type AppState = {
  loading: boolean;
  db: PouchDB.Database<{}>;
  docs: Doc[];
  hostnameClass: object;
  consumerLabors: any;
  pulse: object;
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
      pulse: {},
    }
  }

  registerDoc = (d: Doc, realtimeUpdate) => {
    const hostnameClass = { ...this.state.hostnameClass }
    const consumerLabors = { ...this.state.consumerLabors }

    const docs = [...(this.state.docs || []), d]
    let color = this.state.hostnameClass[d.hostname]

    if (!color) {
      color = colors.find(c => !Object.values(this.state.hostnameClass).some(cls => cls === c))
      hostnameClass[d.hostname] = color
    }

    consumerLabors[d.hostname] = (consumerLabors[d.hostname] || 0) + 1

    let pulse = {}
    if (realtimeUpdate) {
      pulse = {
        ...this.state.pulse,
        [d.hostname]: {
          label: false,
          pointBackgroundColor: BarColors[color],
          pointBorderColor: BarColors[color],
          pointBorderWidth: 1,
          fill: false,
          lineTension: 0,
          showLine: false,
          data: [
            ...(this.state.pulse[d.hostname] || { data: [] }).data,
            {
              x: d.value,
              y: colors.indexOf(color),
            },
          ]
        }
      }
    }

    this.setState({ hostnameClass, consumerLabors, docs, pulse })
  }

  async componentDidMount() {
    const remotedb = new PouchDB('http://localhost:5984/flightdb')
    const docs = await remotedb.allDocs({ include_docs: true }).then(resp => resp.rows.map(r => r.doc)) as Doc[]

    docs.forEach(d => this.registerDoc(d, true))
    this.setState({ db: remotedb })

    remotedb.changes({
      since: 'now',
      live: true,
      include_docs: true,
    }).on('change', change => {
      this.registerDoc(change.doc, true)
    })
  }

  render() {

    const {
      hostnameClass,
      consumerLabors,
      docs: Docs,
      pulse,
    } = this.state

    return (
      <div className="app-container">
        <Header classes={hostnameClass} />
        {!Docs && <Notification.Sync />}
        {Docs && Docs.length === 0 && <Notification.Empty />}
        {Docs && Docs.length && (
          <div className="flex-container">
            <DistributionContainer docs={Docs} classes={hostnameClass} />
            <div className="flex-item flex flex-column w_50">
              <ConsumerLabors consumers={consumerLabors} colors={hostnameClass} />
              <StaticTimeGraph pulse={pulse} colors={hostnameClass} />
            </div>
          </div>
        )}
      </div>
    )
  }
}
