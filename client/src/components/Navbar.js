import React, { useContext } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { AppBar, Toolbar, InputBase } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          ) : null}
          {user ? (
            <Button color='inherit'>
              <Link to='/dashboard'>Home</Link>
            </Button>
          ) : null}

          {user ? null : (
            <Button color='inherit'>
              <Link to='/login'>Login</Link>
            </Button>
          )}
          {!user ? null : (
            <Button onClick={logout} color='inherit'>
              <Link to='/'>Logout</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <CssBaseline />
    </div>
  );
}
