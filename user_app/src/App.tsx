import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Articles from './Articles'
import KafkaBook from './KafkaBook'
import './style.scss'


const App = () => (
  <Router>
    <Route path="/" exact component={KafkaBook} />
    <Route path="/read" component={Articles} />
  </Router>
)

export default App
