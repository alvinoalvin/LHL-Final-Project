import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HomePieGraphs from "./HomePieGraphs";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [testdata, setData] = useState();
  const [labels, setLabels] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/analytics/skill-status", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
      
        const newLabels = response.data.reduce((acc, dataPoint) => {
          if (acc.includes(dataPoint.name)) {
            return acc;
          } else {
            acc.push(dataPoint.name);
          }
          return acc;
        }, []);
        setLabels(newLabels);

        const stackBarData = response.data.reduce((acc, dataPoint) => {
          if (acc[dataPoint.status]) {
            acc[dataPoint.status].push(Number(dataPoint.count));
          } else {
            acc[dataPoint.status] = [Number(dataPoint.count)];
          }
          return acc;
        }, {});
        
        setData(stackBarData);
      });
  }, []);

  //Bar chart real data
  const data = {
    labels: labels,
    datasets: Object.entries(testdata || {}).map(([label, values], i) => ({
      label,
      data: values,
      backgroundColor: `rgba(${i * 100},59,208)`,
    })),
  };


  return (
    <div className={classes.root}>
     <br></br>
      <Grid container spacing={10}> 
      
      <HomePieGraphs />
    
   
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
