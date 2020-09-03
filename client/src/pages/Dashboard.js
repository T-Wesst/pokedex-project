import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import PokemonCard from '../components/PokemonCard';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PokemonCards({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container direction='row' spacing={3}>
          {data.map((pokemon) => (
            <Grid item xs={2}>
              <Paper elevation={3}>
                <PokemonCard key={pokemon.data.id} {...pokemon} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
