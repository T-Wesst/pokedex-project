import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp, Login, NotFound, Landing, Dashboard } from './pages/index';
import Navbar from './components/Navbar';
import { UserContext } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import { Button, ButtonGroup } from '@material-ui/core';

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(baseURL);
      setNextURL(data.next);
      setPrevURL(data.previous);
      setIsLoading(false);
      await loadPokemon(data.results);
    };
    fetchData();
  }, []);

  const nextPage = async () => {
    setIsLoading(true);
    let { data } = await axios.get(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setIsLoading(false);
  };

  const prevPage = async () => {
    if (!prevURL) return;
    setIsLoading(true);
    let { data } = await axios.get(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setIsLoading(false);
  };

  const loadPokemon = async (data) => {
    let pokeData = await Promise.all(
      data.map(async (pokemon) => {
        return await axios.get(pokemon.url);
      })
    );
    setPokemonData(pokeData);
  };

  const [user, setUser] = useState(null);
  const currentUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <Router>
        <UserContext.Provider value={currentUser}>
          <Navbar />
          {user ? (
            <ButtonGroup disableElevation variant='contained' color='primary'>
              <Button onClick={prevPage}>Prev</Button>
              <Button onClick={nextPage}>Next</Button>
            </ButtonGroup>
          ) : null}
          <Switch>
            <ProtectedRoute
              data={pokemonData}
              nextPage={nextPage}
              prevPage={prevPage}
              exact
              path='/dashboard'
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
