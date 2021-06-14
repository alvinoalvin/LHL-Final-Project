import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Line } from "react-chartjs-2";
import moment from "moment";

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
        const newLabels = response.data.reduce((acc, dataPoint) => {
          acc.push(moment(dataPoint.end_date).format("MMM Do"));
          return acc;
        }, []);
        const newData = response.data.reduce((acc, dataPoint) => {
          acc.push(dataPoint.count);
          return acc;
        }, []);
        setLabels(newLabels);
        setData(newData);
      });
  }, []);

// only show last 7 days date library (moment js)
// Array.filter (moments is between date x y, today and a week ago)
// date fns, Date Object (js)
// filter (homepage)

  const lineData = {
    labels,
    datasets: [{
      label: 'Number of Completed Tasks',
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#063bd0",
      borderColor: "#063bd0",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#063bd0",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#063bd0",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: testdata,
    }],
  };

  return (
    <div className={classes.root}>
         
            <Line data={lineData} />
          
    </div>
  );
}
