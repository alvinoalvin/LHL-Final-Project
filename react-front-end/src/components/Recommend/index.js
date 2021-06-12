import React, {useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MailIcon from '@material-ui/icons/Mail';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import axios from 'axios';
import { authContext } from '../../providers/AuthProvider';

 
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Recommend(props) {
  const classes = useStyles();
  const [userID, setUserID] = useState('');
  const [type, setType] = useState('');
  const [skill, setSkill] = useState('');
  const [deliverableName, setDeliverableName] = useState('');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [alert, setAlert] = useState({
    message: '',
    severity: ''
  });

  const [snack, setSnack] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };

  const { id, team_id } = useContext(authContext);
  const user_id = id;

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(`/api/teams/${team_id}`)
    .then(function(response) {
      setUserList(response.data)
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }, [team_id]);

  const userChoice = userList.map(userInfo => {
    return (
      <MenuItem key={userInfo.id} value={userInfo.id}>{userInfo.first_name} {userInfo.last_name}</MenuItem>
    )
  })

  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    axios.get(`/api/type`)
    .then(function(response) {
      setTypeList(response.data)
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }, []);

  const typeChoice = typeList.map(typeInfo => {
    return (
      <MenuItem key={typeInfo.id} value={typeInfo.id}>{typeInfo.type}</MenuItem>
    )
  })

  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    if (!userID) {
      return 
    }

    axios.get(`/api/skills/users/${userID}`)
    .then(function(response) {
      setSkillList(response.data)
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }, [userID])
  
  const skillChoice = skillList.map(skillInfo => {
    return (
      <MenuItem key={skillInfo.skill_id} value={skillInfo.skill_id}>{skillInfo.name}</MenuItem>
    )
  })

  function addDeliverable() {
    const newDeliverable = {
      creator: user_id,
      assigned_to: userID,
      skill_id: skill,
      status_id: 1,
      time_estimate_minutes: Number(time),
      type_id: type,
      name: deliverableName,
      notes: notes,
      link: link
    }

    return axios.post(`/api/deliverables`, newDeliverable)
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }

  function checkRec() {
    if (!userID) {
      setAlert({ message: 'Please pick a user!', severity: 'warning'})
      return false
    }
  
    if (!type) {
      setAlert({ message: 'Please pick a type!', severity: 'warning'})
      return false
    }
  
    if (!skill) {
      setAlert({ message: 'Please pick a skill!', severity: 'warning'})
      return false
    }
  
    if (!deliverableName) {
      setAlert({ message: 'Please enter a description', severity: 'warning'})
      return false
    }
  
    if (!time) {
      setAlert({ message: 'Please enter an estimated time', severity: 'warning'})
      return false
    }
  
    if (isNaN(Number(time))) {
      setAlert({ message: 'Please enter a number', severity: 'error'})
      return false
    }
  
    return true;
  };

  console.log(isNaN(Number(time)))

  return (
    <>
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Make a recommendation
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Name</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={userID}
              onChange={(event) => {
                setUserID(event.target.value)
                setSkill('')
              }}
            >
              {userChoice}
            </Select>
            <FormHelperText>Team Member</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              {typeChoice}
            </Select>
            <FormHelperText>Type</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Skill</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={skill? skill : ''}
              onChange={(event) => {
                setSkill(event.target.value)
              }
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {skillChoice}
            </Select>
            <FormHelperText>Type</FormHelperText>
          </FormControl>
          <TextField
            autoComplete="dname"
            fullWidth
            name="deliverableName"
            variant="outlined"
            required
            id="deliverableName"
            label="Deliverable Name"
            autoFocus
            value={deliverableName}
            onChange={(event) => setDeliverableName(event.target.value)}
          />
          {/* change to only take in number */}
          <TextField
            variant="outlined"
            fullWidth
            id="time"
            label="Time Estimate"
            name="time"
            autoComplete="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
          <TextField
            // How can i conditionally tack this one??
            error={true}
            id="outlined-error-helper-text"
            label="Error"
            defaultValue=""
            helperText="Please Enter A Number"
            variant="outlined"
          />
          <TextField
            variant="outlined"
            fullWidth
            id="deliverableLink"
            label="Link"
            name="deliverableLink"
            autoComplete="dlink"
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
          <TextField
            variant="outlined"
            id="notes"
            fullWidth
            label="Notes/Comments"
            name="notes"
            autoComplete="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              event.preventDefault()
              if(!checkRec()) {
                setSnack(true)
              } else {
                addDeliverable()
                .then(function(response) {
                  setAlert({message: 'Submit Success!', severity: 'success'})
                  setSnack(true)
                })
                .catch(function (error) {
                  console.log(error);
                });
              }
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snack}
        key={'report-snack-bar'}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </>
  );
}