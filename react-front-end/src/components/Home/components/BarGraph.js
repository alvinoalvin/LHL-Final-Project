import React, { useEffect, useState } from "react";

import axios from "axios";
import { Bar } from "react-chartjs-2";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "475px",
    padding: "30px",
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
      .get("api/analytics/skill-status", {
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
