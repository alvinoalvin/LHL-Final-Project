import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    padding: "30px",
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    
    
  },
}));

export default function LineGraph() {
  const classes = useStyles();
  const [testdata, setData] = useState();
  const [labels, setLabels] = useState();

  useEffect(() => {
    axios
      .get("api/analytics/completion-rate", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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
    <div className={`${classes.root} lineGraph`}>    
            <Line 
            data={lineData}/> 
    </div>
  );
}
