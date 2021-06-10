import React, {useState, useEffect } from 'react';
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

import axios from 'axios';

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
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [skill, setSkill] = useState('');
  const [deliverableName, setDeliverableName] = useState('');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submission, setSubmission] = useState('')

  const team_id = 1;
  const user_id = 1;

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(`/api/teams/${team_id}`)
    .then(function(response) {
      setUserList(response.data)
    })
  }, []);

  const userChoice = userList.map(userInfo => {
    return (
      <MenuItem value={userInfo.id}>{userInfo.first_name} {userInfo.last_name}</MenuItem>
    )
  })

  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    axios.get(`/api/type`)
    .then(function(response) {
      setTypeList(response.data)
    })
  }, []);

  const typeChoice = typeList.map(typeInfo => {
    return (
      <MenuItem value={typeInfo.id}>{typeInfo.type}</MenuItem>
    )
  })

  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    axios.get(`/api/skills`)
    .then(function(response) {
      setSkillList(response.data)
    })
  }, [])
  
  const skillChoice = skillList.map(skillInfo => {
    return (
      <MenuItem value={skillInfo.id}>{skillInfo.name}</MenuItem>
    )
  })

  function addDeliverable() {
    const newDeliverable = {
      creator: user_id,
      assigned_to: name,
      skill_id: skill,
      status_id: 1,
      time_estimate_minutes: Number(time),
      type_id: type,
      name: deliverableName,
      notes: notes,
      link: link
    }

    axios.post(`/api/deliverables`, newDeliverable)
    .then(function(response) {
      setSubmission('Success')
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
            >
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
              addDeliverable()
              }}
          >
            Submit
          </Button>
        </form>
        <div>
          {submission}
        </div>
      </div>
    </Container>
  );
}