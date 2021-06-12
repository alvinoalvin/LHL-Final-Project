import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Libraries */
const axios = require('axios');

export default function CustomProgressBar(props) {
  // const classes = useStyles();
  // const [notes, setNotes] = useState("");
  // const bull = <span className={classes.bullet}>• &nbsp;</span>;

  // useEffect(() => {
  //   axios.get(`/api/notes/${props.userID}/${props.skillID}`)
  //     .then(response => {
  //       const data = response.data.map(note => {
  //         return <div>{bull}{note.note}</div>
  //       })
  //       setNotes(data);
  //       console.log(data)
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  // function addNote(note) {
  //   const newNote = {
  //     user_id: props.userID,
  //     skill_id: props.skillID,
  //     note: note,

  //   }

  //   return axios.post(`/api/notes`, newNote)
  //     .then(function(response) {
  //       newNote.id = response.data.result.id
  //       const notesCopy = [...props.notes, newNote]
  //       props.setNote(notesCopy)
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  return (
    <ProgressBar>
      <ProgressBar striped variant="success" now={55} key={1} label={`${55}%`} />
      <ProgressBar variant="warning" now={25} key={2} label={`${60}%`} />
      <ProgressBar striped variant="danger" now={15} key={3} label={`${60}%`} />
    </ProgressBar>
  );
}
