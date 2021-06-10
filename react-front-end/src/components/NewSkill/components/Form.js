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
    marginTop: theme.spacing(4),
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

export default function Form(props) {
  const classes = useStyles();

  const [skillName, setSkillName] = useState('');

  const user_id = 1;

  function addSkill() {
    const newSkill = {
      skill_name: skillName
    }

    axios.post(`api/skills/users/${user_id}`, newSkill)
    .then(function(response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <MailIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add A New Skill
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          autoComplete="sname"
          fullWidth
          name="skillName"
          variant="outlined"
          required
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
            addSkill()
            }}
        >
          Add
        </Button>
      </form>
    </div>
  )
}