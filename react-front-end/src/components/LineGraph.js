import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Line } from "react-chartjs-2";

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

export default function LineGraph() {
  const classes = useStyles();
  const [testdata, setData] = useState();
  const [labels, setLabels] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/analytics/completion-rate", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        const newLabels = response.data.reduce((acc, dataPoint) => {
          if (acc.includes(dataPoint.end_date)) {
            return acc;
          } else {
            acc.push(dataPoint.end_date);
          }
          return acc;
        }, []);
        setLabels(newLabels);

        // const dataState = response.data.reduce((acc, dataPoint) => {
        //   if (acc[dataPoint.status]) {
        //     acc[dataPoint.status].push(Number(dataPoint.count));
        //   } else {
        //     acc[dataPoint.status] = [Number(dataPoint.count)];
        //   }
        //   return acc;
        // }, {});
        // console.log({dataState: response.data})
        setData(response.data);
      });
  }, []);

// only show last 7 days date library (moment js)
// Array.filter (moments is between date x y, today and a week ago)
// date fns, Date Object (js)
// filter (homepage)



  //placeholder for line chart
  const lineData = {
    labels,
    datasets: Object.entries(testdata || {}).map(([label, values]) => {
      console.log(label, values)
      return {
        label: values.name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values.end_date,
      }
    },
    ),
  };

  return (
    <div className={classes.root}>

      <Grid container spacing={6}>
      
          <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2>All Completed Tasks in the Last Week</h2>
            <Line data={lineData} />
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}
