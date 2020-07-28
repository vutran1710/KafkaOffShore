import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Articles from './Articles'
import KafkaBook from './KafkaBook'
import Bookmarker from './Bookmarker'
import './style.scss'


const App = () => (
  <Router>
    <div className="kafka-container">
      <div className="kafka-container--inner">
        <Switch>
          <Route path="/" exact component={KafkaBook} />
          <Route path="/read" component={Articles} />
        </Switch>
      </div>
      <Bookmarker />
    </div>
    <div>
      <input
        className="request-count-input"
        type="number"
      />
    </div>
  </Router>
)

export default App
