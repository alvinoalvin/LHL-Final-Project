import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Input, Typography } from '@material-ui/core';

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
  const [notes, setNotes] = useState("");
  const bull = <span className={classes.bullet}>• &nbsp;</span>;

  useEffect(() => {
    axios.get(`/api/notes/${props.userID}/${props.skillID}`)
      .then(response => {
        const data = response.data.map(note => {
          return <div>{bull}{note.note}</div>
        })
        setNotes(data);
        console.log(data)
      })
      .catch(error => console.log(error));
  }, []);

  function addNote(note) {
    const newNote = {
      user_id: props.userID,
      skill_id: props.skillID,
      note: note,

    }

    return axios.post(`/api/notes`, newNote)
      .then(function(response) {
        newNote.id = response.data.result.id
        const notesCopy = [...props.notes, newNote]
        props.setNote(notesCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  return (
    <Card className={classes.root}>
      <CardContent>

        <Typography gutterBottom variant="h6" component="h4">
          Notes
          </Typography>
        <Typography className={classes.pos} >
          {notes}
        </Typography>
      </CardContent>
      <CardActions>
        <Input />
        <Button size="small">add Note</Button>
      </CardActions>
    </Card>
  );
}

