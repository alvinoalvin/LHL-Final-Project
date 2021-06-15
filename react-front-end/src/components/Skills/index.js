import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Form from "./components/Form";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import "../../styles/variables.scss";
import Typography from '@material-ui/core/Typography';
import { authContext } from "../../providers/AuthProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '3rem 4em',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 600,
    maxHeight: 600,
    overflow: 'auto',
    marginTop: '1rem',
    border: '1px solid var(--border)',
    boxShadow: '5px 5px var(--box-shadow)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--border-radius)',
  },
  quote: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: '1px solid var(--border)',
    boxShadow: '5px 5px',
    borderRadius: 'var(--border-radius)',
  },
  button: {
    margin: '1rem',
    backgroundColor:  'var(--button)',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
  },
  title: {
    marginTop: '-4rem',
    marginBottom: '1rem',
    fontFamily: 'var(--header-font)',
  },
  header: {
    fontFamily: 'var(--header-font)',
    fontSize: '35px',
    fontWeight: '700',
  },
}));

export default function SkillViewAll(props) {
  const classes = useStyles();
  const history = useHistory();

  function handleClick(id) {
    history.push("/skill", { skillId: id });
  }

  const { id, team_id } = useContext(authContext);
  const userID = id;

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
      <Button
        key={skillInfo.skill_id}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={(event) => {
          handleClick(skillInfo.skill_id);
        }}
      >
        {skillInfo.name}
      </Button>
    )
  })

  return (
    <div className={classes.root}>
      <Typography className={classes.header}>Skills</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper className={classes.quote}>
            <h5>
              “You have to invest if you want to progress.” ― Erin Hatzikostas,
              You Do You(ish)"
            </h5>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} id="add-skill-container">
            <h2 className={classes.title}>Skill List</h2>
            <div className={classes.list}>
              {skillChoice}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} id="add-skill-container">
            <Form />
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}
