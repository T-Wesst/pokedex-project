import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, SignUp, NotFound, Home, Dashboard } from './pages/index';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='dashboard' component={Dashboard} />
        <Route exact path='login' component={Login} />
        <Route exact path='signup' component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
