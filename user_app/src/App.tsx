import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Articles from './Components/Articles'
import KafkaBook from './Components/KafkaBook'
import Bookmarker from './Components/Bookmarker'
import StreamForm from './Components/StreamForm'
import './style.scss'


const App = () => (
  <Router>
    <div className="kafka-container">
      <div className="kafka-container--inner">
        <Switch>
          <Route path="/" exact component={KafkaBook} />
          <Route path="/send-int" component={StreamForm} />
          <Route path="/read" component={Articles} />
        </Switch>
      </div>
      <Bookmarker />
    </div>
  </Router>
)

export default App
