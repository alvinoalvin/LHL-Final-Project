import React, { useState, useContext } from 'react';
import { authContext } from '../../../providers/AuthProvider';

import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { purple } from "@material-ui/core/colors";


import axios from "axios";

import "../../../styles/variables.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'var(--button)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'var(--button)',
    color: '#fff',
    fontFamily: 'var(--header-font)',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  text: {
    fontFamily: 'var(--text-font)'
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: purple,
  }
});

export default function Form(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const { team_id } = useContext(authContext);

  function addMember() {
    const newMember = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      position: position
    }

    return axios.post(`/api/teams/${team_id}`, newMember)
    .then(function (response) {
      const teamCopy = [...props.team, newMember]
      props.setTeam(teamCopy)
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
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
    if (!firstName) {
      setAlert({ message: 'Please enter first name!', severity: 'warning'})
      return false
    }
  
    if (!lastName) {
      setAlert({ message: 'Please enter last name!', severity: 'warning'})
      return false
    }
  
    if (!email) {
      setAlert({ message: 'Please enter email!', severity: 'warning'})
      return false
    }
  
    if (!position) {
      setAlert({ message: 'Please enter position', severity: 'warning'})
      return false
    }
  
    return true;
  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add New Team Member
        </Typography>
        <form className={classes.form} noValidate>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="position"
                label="Position"
                type="position"
                id="position"
                autoComplete="current-position"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
              />
            </Grid>
          </Grid>
          </ThemeProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={(event) => {
              if (!checkRec()) {
                event.preventDefault()
                setSnack(true)
              } else {
                addMember()
              }}
            }
          >
            Add
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
