import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NoMeetingRoom, MeetingRoom, Home } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const logout = async () => {
    const {
      data: { message },
    } = await axios.get('/api/users/logout');
    // do something with message
    console.log(message);
    setUser(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            {user ? `Welcome ${user}` : 'Pokedex Project'}
          </Typography>
          {user ? (
            <Button color='inherit'>
              <Link to='/dashboard'>
                Home <Home />
              </Link>
            </Button>
          ) : null}
          {user ? (
            ''
          ) : (
            <Button color='inherit'>
              <Link to='/login'>
                Login <MeetingRoom />
              </Link>
            </Button>
          )}
          {!user ? null : (
            <Button onClick={logout} color='inherit'>
              <Link to='/'>
                Logout <NoMeetingRoom />
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <CssBaseline />
    </div>
  );
}
