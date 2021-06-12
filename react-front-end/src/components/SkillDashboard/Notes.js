import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

/* Libraries */
const axios = require('axios');

export default function NotesList(props) {
  const classes = useStyles();


  // useEffect(() => {
  //   // console.log("ResourceList")
  //   axios.get(`/api/notes/${props.userID}/${props.skillID}`)
  //     .then(response => {
  //       setNotes(response.data);
  //       console.log(response.data)
  //     }).catch(error => console.log(error));
  // }, []);

  /* make sure ids match db column names */

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

