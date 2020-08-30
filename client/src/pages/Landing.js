import React from 'react';
import pokeball from '../images/pokeball2.jpg';
import Login from './Login';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    marginBottom: '-36px',
  },

  image: {
    backgroundImage: `url(${pokeball})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  paper: {
    marginTop: '200px',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Landing() {
  const classes = useStyles();
  return (
    <Grid container component='main' className={classes.root}>
      <Grid item sm={4} md={7} className={classes.image}></Grid>
      <Grid item sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Login />
        </div>
      </Grid>
    </Grid>
  );
}
