import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp, Login, NotFound, Landing, Dashboard } from './pages/index';
import Navbar from './components/Navbar';
import { UserContext } from './UserContext';

export default function App() {
  const [data, setData] = useState({ pokemon: [] });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/');
      setData(data);
    };
    fetchData();
  }, []);

  const [user, setUser] = useState('tyroo');
  const currentUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <Router>
        <UserContext.Provider value={currentUser}>
          <Navbar />
          <Switch>
            <Route exact path='/dashboard' component={Dashboard} />
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
