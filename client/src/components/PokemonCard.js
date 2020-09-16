import React, { useRef } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { CardActions, Button } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from './Modal';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: '0 auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize: 'contain',
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function PokemonCard(pokemon) {
  const { data } = pokemon;
  const modalRef = useRef();
  const openModal = () => modalRef.current.openModal();
  const closeModal = () => modalRef.current.closeModal();

  const classes = useStyles();

  return (
    <div>
      <Modal ref={modalRef}>
        <h1>Modal Header</h1>
        <p>is simply dummy text of the printing and typesetting industry.</p>
        <Button onClick={closeModal}>X</Button>
      </Modal>
      <Card>
        <CardHeader
          title={data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          subheader={`type: ${data.types[0].type.name}`}
        />
        <CardMedia
          className={classes.media}
          image={data.sprites.front_default}
        />
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <Button onClick={openModal} size='small'>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
