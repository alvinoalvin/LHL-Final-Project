import React, { useContext } from "react";
import { authContext } from '../../providers/AuthProvider';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HomePieGraphs from "./components/HomePieGraphs";
import LineGraph from "./components/LineGraph";
import BarGraph from "./components/BarGraph";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    padding: theme.spacing(4),
    
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },

}));

export default function CenteredGrid() {
  const { id } = useContext(authContext);
  const classes = useStyles();

  document.title = "Life Long Learning";
  const userId = id;
  

  return (
    <div className={classes.root}>
     <br/>
      <Grid container spacing={10}> 
        <HomePieGraphs userId={userId} />
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <BarGraph/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2>Completion Rate</h2>
            <LineGraph />
          </Paper>
        </Grid>
      </Grid>
      
    </div>
  );
}
