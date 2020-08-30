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

  return (
    <div className={classes.root}>
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            {user ? user : 'Pokedex Project'}
          </Typography>
          <Button color='inherit'>
            <Link to='/dashboard'>
              Home <Home />
            </Link>
          </Button>
          {user ? (
            ''
          ) : (
            <Button color='inherit'>
              <Link to='/login'>
                Login <MeetingRoom />
              </Link>
            </Button>
          )}
          {!user ? (
            ''
          ) : (
            <Button onClick={() => setUser(null)} color='inherit'>
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
