import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp, Login, NotFound, Landing, Dashboard } from './pages/index';
import Navbar from './components/Navbar';
import { UserContext } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [user, setUser] = useState(null);
  const currentUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <Router>
        <UserContext.Provider value={currentUser}>
          <Navbar />
          <Switch>
            <ProtectedRoute
              exact
              path='/dashboard/:page?'
              component={Dashboard}
            />
            <Route exact path='/' render={() => <Landing />} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' render={() => <SignUp />} />
            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}
