import React, { useContext } from 'react';
import { Button, TextField, Link } from '@material-ui/core';
import { Grid, Typography, Container } from '@material-ui/core';
import { UserContext } from '../UserContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Register() {
  const { handleSubmit, register } = useForm();
  const { setUser } = useContext(UserContext);
  const signup = async (input) => {
    const { data: { message, status } } = await axios.post('/api/users/signup', input);
    const { username } = input;
    setUser(username);
    // do something with message & status
    // redirect to dashboard
  };

  return (
    <Container component='main' maxWidth='xs' onSubmit={handleSubmit(signup)}>
      <div className='flex-col flex-center'>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className='full-width theme-mtx3'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='username'
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                type='email'
                id='email'
                label='Email Address'
                name='email'
                inputRef={register}
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                inputRef={register({ require: true, minLength: 8 })}
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className='theme-mt'
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end' className='theme-mt'>
            <Grid item>
              <Link href='/' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
