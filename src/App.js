import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Dashboard from './pages/administrator/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/admin' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
