import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  SignUp,
  Login,
  Logout,
  NotFound,
  Landing,
  Dashboard,
} from './pages/index';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => <Landing />} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' render={() => <SignUp />} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/logout' component={Logout} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}
