import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Articles from './components/Articles'
import KafkaBook from './components/KafkaBook'
import Bookmarker from './components/Bookmarker'
import StreamForm from './components/StreamForm'
import TableOfContent from './components/TableOfContent'


const App = () => (
  <Router>
    <div className="kafka-container">
      <div className="kafka-container--inner">
        <Switch>
          <Route path="/" exact component={KafkaBook} />
          <Route path="/content" exact component={TableOfContent} />
          <Route path="/send-int" component={StreamForm} />
          <Route path="/read" component={Articles} />
        </Switch>
      </div>
      <Bookmarker />
    </div>
  </Router>
)

export default App
