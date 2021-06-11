import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import { Avatar, CssBaseline, TextField, Input, Grid, Typography, Container } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "40px 0 0 0"
  },
  h5: {
    margin: "0 0 15px 0",
  }
}));

export default function CreateTaskForm(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [estDuration, setEstDuration] = useState();
  const [dueDate, setDueDate] = useState();
  const [link, setLink] = useState("");
  // const [description, setDescription] = useState("");

  function addTask() {
    const newTask = {
      creator: props.userID,
      assigned_to: props.userID,
      skill_id: props.skillID,
      status_id: 2,
      time_estimate_minutes: estDuration,
      end_date: dueDate,
      type_id: 1,
      name: name,
      // notes: description,
      link: link,
      create_date: new Date().toISOString()
    }

    return axios.post(`/api/tasks`, newTask)
      .then(function(response) {
        newTask.id = response.data.result.id
        newTask.status = "In Progress"
        const taskCopy = [...props.tasks, newTask]
        props.setTasks(taskCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5" className={classes.h5}>
          Add New Task
        </Typography>
        <form className='new-member-form' noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="create-task-name-input"
                name="name"
                variant="outlined"
                required
                fullWidth
                placeholder="Task"
                label="Task Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="create-task-link-input"
                name="link"
                variant="outlined"
                fullWidth
                placeholder="Link"
                label="Resource Link"
                value={link}
                onChange={(event) => setLink(event.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="create-task-due-date-input"
                label="Due Date"
                type="date"
                defaultValue={Date.now().toISOString}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setDueDate(event.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="create-task-est-dur-input"
                label="Estimated Duration (mins)"
                type="number"
                className={classes.numInput}
                InputLabelProps={{
                  shrink: true, min: "0", step: "1"
                }}
                onChange={(event) => setEstDuration(event.target.value)}
              />
            </Grid>

          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={(event) => {
              const nameInput = document.getElementById("create-task-name-input");
              const estDurInput = document.getElementById("create-task-est-dur-input");

              if (!nameInput.value) {
                alert("Please enter a name")
              }
              else if (estDurInput.validity.badInput == true || estDurInput.value < 0) {
                alert("Please enter a postive number for Estimated Duration")
              }
              else {
                addTask()
                props.handleClose()
              }
            }
            }
          >
            Save
        </Button>
        </form>
      </div>
    </Container>

  )
}