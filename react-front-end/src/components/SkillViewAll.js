import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Form from "./Skills/components/Form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function SkillViewAll(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h5>
              “You have to invest if you want to progress.” ― Erin Hatzikostas,
              You Do You(ish)"
            </h5>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} id="add-skill-container">
            <h2>Skill List</h2>

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
