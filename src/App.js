import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/Not-Found" />
  </Switch>
)

export default App
