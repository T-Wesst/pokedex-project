import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PetsIcon from '@material-ui/icons/Pets';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckIcon from '@material-ui/icons/Check';
import HomeIcon from '@material-ui/icons/Home';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';

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

  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardHeader
          title={data.name}
          subheader={data.types.map((type) => {
            return <div>{type.type.name}</div>;
          })}
        />
        <CardMedia
          className={classes.media}
          image={data.sprites.front_default}
        />
        <CardContent>
          <li>Weight: {data.weight}</li>
          <li>Height: {data.height}</li>
          <Typography color='textSecondary'>
            {data.abilities.map((ability) => {
              return <div>{ability.ability.name}</div>;
            })}
            {data.stats.map((stat) => {
              return <div>{stat.stat.name}</div>;
            })}
            {data.moves.map((move) => {
              return <div>{move.move.name}</div>;
            })}
          </Typography>
          <Paper component='ul' className={classes.root}>
            {/* {tags.map((tag) => {
              return (
                <li>
                  <Chip label={tag} className={classes.chip} />
                </li>
              );
            })} */}
          </Paper>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
