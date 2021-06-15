import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "475px",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "475px",
  },
}));

export default function BarGraph() {
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
      <div>
        <h2>Progress this week</h2>
        <h6>Number of Tasks</h6>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
