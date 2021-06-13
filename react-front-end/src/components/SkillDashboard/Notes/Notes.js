import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Input, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

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
  const inputRef = useRef("");

  useEffect(() => {
    axios.get(`/api/notes/${props.userID}/${props.skillID}`)
      .then(response => {
        const data = response.data.map(note => {
          note.key = note.id
          return note
        })
        setNotes(data);
      })
      .catch(error => console.log(error));
  }, [notes]);

  function addNote() {
    const newNote = {
      user_id: props.userID,
      skill_id: props.skillID,
      note: inputRef.current.lastChild.value,
    }

    return axios.post(`/api/notes`, newNote)
      .then(function(response) {
        const notesCopy = notes
        notesCopy.push(newNote)
        console.log(notesCopy)
        setNotes(notesCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  function deleteTask(id) {
    return axios.delete(`api/notes/${id}`, { id })
      .then(function(response) {
        const noteCopy = notes.filter((note) => {
          if (note.id !== id) {
            note.key = note.id
            return note
          }
        });
        setNotes(noteCopy);
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
          {Object.keys(notes).map((id) => {
            return (<>
              <div>
                <IconButton
                  aria-label="delete"
                  onClick={(event) => {
                    if (window.confirm('Are you sure you want to delete?')) {
                      deleteTask(notes[id].id);
                    }
                  }}>
                  <CloseIcon />
                </IconButton>
                {notes[id].note}
              </div>
            </>
            )
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Input ref={inputRef} />
        <Button size="small" onClick={() => { addNote() }}>add Note</Button>
      </CardActions>
    </Card>
  );
}

