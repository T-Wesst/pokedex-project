import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Person from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { UserContext } from '../UserContext';
import {Redirect} from 'react-router-dom';

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

function Login({ classes }) {
  const { handleSubmit, register } = useForm();
  const { user, setUser } = useContext(UserContext);
  const login = async (input) => {
    const {data: { message, status } } = await axios.post('/api/users/login', input);
    const { username } = input;
    setUser(username);
    // do something with message & status
    console.log(message, status);
  };
  if(user){
    return <Redirect to="/dashboard"/>
  }
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <form onSubmit={handleSubmit(login)} className={classes.form}>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='username'>User Name</InputLabel>
            <Input
              id='username'
              type='text'
              name='username'
              inputRef={register}
              autoComplete='username'
              autoFocus
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              name='password'
              type='password'
              id='password'
              autoComplete='current-password'
              inputRef={register({ require: true })}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                name='remember'
                color='secondary'
                defaultValue={false}
              />
            }
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' varaint='body2'>
                {'Dont have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Login);
