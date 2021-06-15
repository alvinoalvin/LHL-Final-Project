import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Input, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import "../../../styles/variables.scss";

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
  icon: {
    color: 'var(--button)',
    '&:hover': {
      color: 'var(--button-hover)',
    },
  },
  container: {
    padding: '3rem 2rem',
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
  }, [notes, props.skillID, props.userID]);

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
        setNotes(notesCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  function deleteNote(id) {
    return axios.delete(`api/notes/${id}`, { id })
      .then(function(response) {
        const noteCopy = notes.filter((note) => {
          if (note.id !== id) {
            note.key = note.id
            return note
          }

          return null;
        });
        setNotes(noteCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  return (
    <Card className={classes.root}>
      <CardContent className={classes.container} style={{ height: 370, overflow: 'auto' }}>
        <Typography gutterBottom variant="h6" component="h4">
          Notes
          </Typography>
          {Object.keys(notes).map((id) => {
            return (<>
              <div>
                <IconButton
                  className={classes.icon}
                  aria-label="delete"
                  onClick={(event) => {
                    if (window.confirm('Are you sure you want to delete?')) {
                      deleteNote(notes[id].id);
                    }
                  }}>
                  <CloseIcon />
                </IconButton>
                {notes[id].note}
              </div>
            </>
            )
          })}
      </CardContent>
      <CardActions>
        <Input ref={inputRef} />
        <Button size="small" onClick={() => { addNote() }}>add Note</Button>
      </CardActions>
    </Card>
  );
}

