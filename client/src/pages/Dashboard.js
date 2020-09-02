import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
      <Grid container direction='row' spacing={3}>
        {data.map((pokemon) => (
          <Grid item xs={3}>
            <Paper elevation={3}>
              <PokemonCard key={pokemon.data.id} {...pokemon} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
