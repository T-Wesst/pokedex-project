import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import PokemonCard from '../components/PokemonCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PokemonCards({ match: { params: { page = 1 } } }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
  const offset = (page - 1) * 20;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get(baseURL, {
        params: { offset },
      });
      setIsLoading(false);
      await loadPokemon(data.results);
    };
    fetchData();
  }, [offset]);

  const loadPokemon = async (data) => {
    let pokeData = await Promise.all(
      data.map(async (pokemon) => {
        return await axios.get(`${baseURL}${pokemon.name}`);
      })
    );
    setPokemonData(pokeData);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <ButtonGroup disableElevation variant='contained' color='primary'>
          <Button component={Link} to={`/dashboard/${Number(page) - 1}`}>
            Prev
          </Button>
          <Button component={Link} to={`/dashboard/${Number(page) + 1}`}>
            Next
          </Button>
        </ButtonGroup>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <Grid container direction='row' spacing={3}>
            {pokemonData.map((pokemon) => (
              <Grid item xs={2}>
                <Paper elevation={3}>
                  <PokemonCard key={pokemon.data.id} {...pokemon} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}
