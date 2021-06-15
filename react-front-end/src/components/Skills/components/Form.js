import React, { useContext, useState } from 'react';
import { authContext } from '../../../providers/AuthProvider';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { purple } from "@material-ui/core/colors";

import axios from 'axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
  }
});


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '-4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:  'var(--button)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:  'var(--button)',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Form(props) {
  const classes = useStyles();

  const [skillName, setSkillName] = useState('');

  const { id } = useContext(authContext);
  const user_id = id;

  function addSkill() {
    const newSkill = {
      skill_name: skillName
    }

    axios.post(`api/skills/users/${user_id}`, newSkill)
    .then(function(response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }

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


  const [snack, setSnack] = useState(false);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AddIcon 
        background-color="primary"/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Add A New Skill
      </Typography>
      <ThemeProvider theme={theme}>
        <form className={classes.form} noValidate>
          <TextField
            autoComplete="sname"
            fullWidth
            name="skillName"
            variant="outlined"
            id="skillName"
            label="Skill Name"
            autoFocus
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              if (!skillName) {
                event.preventDefault()
                setAlert({message: 'Please Enter A Skill Name', severity: 'error'})
                setSnack(true)
              } else {
                addSkill()
              }
              }}
          >
            Add
          </Button>
        </form>
      </ThemeProvider>

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
  )
}