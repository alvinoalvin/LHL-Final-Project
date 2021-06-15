import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "../../../styles/variables.scss";
import { purple } from "@material-ui/core/colors";

import { CssBaseline, TextField,  Grid, Typography, Container } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "40px 0 0 0",
    color: '#fff',
    fontFamily: 'var(--header-font)',
    backgroundColor: 'var(--button)',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
  },
  h5: {
    margin: "0 0 15px 0",
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
  }
});

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
      due_date: dueDate,
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
        const taskCopy = [...props.rows, newTask]
        props.setRows(taskCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const [snack, setSnack] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    severity: ''
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };

  function checkRec() {
    if (!name) {
      setAlert({ message: 'Please enter task name!', severity: 'warning'})
      return false
    }
  
    if (!estDuration) {
      setAlert({ message: 'Please enter an estimate!', severity: 'warning'})
      return false
    }
    
    const newDate = new Date(dueDate)

    if (newDate < new Date() && newDate) {
      console.log(newDate,":", new Date())
      setAlert({ message: 'That date has already passed!', severity: 'warning'})
      return false
    }

    if (!dueDate) {
      setAlert({ message: 'Please pick a date!', severity: 'warning'})
      return false
    }
  
    return true;
  };

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper} >
        <Typography component="h1" variant="h5" className={classes.h5}>
          Add New Task
        </Typography>
        <form className='new-member-form' noValidate>
          <ThemeProvider theme={theme}>
            <Grid container spacing={3}>
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
                  required
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
          </ThemeProvider>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={(event) => {
              if (!checkRec()) {
                setSnack(true)
              } else {
                addTask()
                props.handleClose()
              }
            }
            }
          >
            Save
        </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snack}
          key={'report-snack-bar'}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </div>
    </Container>

  )
}