import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp, Login, NotFound, Landing, Dashboard } from './pages/index';
import Navbar from './components/Navbar';
import { UserContext } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(baseURL);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setIsLoading(false);
      await loadPokemon(data.results);
    };
    fetchData();
  }, []);

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
          <Switch>
            <ProtectedRoute data={pokemonData} exact path='/dashboard' component={Dashboard}
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
