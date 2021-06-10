import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Doughnut } from "react-chartjs-2";
import { red } from "@material-ui/core/colors";

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

export default function SkillViewAll() {
  const classes = useStyles();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/analytics/time-estimate", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {

        const pieData = response.data.reduce((acc, dataPoint) => {
          const skill = acc[dataPoint.skill_id] || {
            name: dataPoint.name,
            chartData: {
              labels: [],
              datasets: [{
                data:[],
                backgroundColor: ["red", "blue", "green"]
              }],
            },
          };
          skill.chartData.labels.push(dataPoint.status)
          skill.chartData.datasets[0].data.push(dataPoint.total_estimate)
          return {
            ...acc, [dataPoint.skill_id]: skill
          };
        }, {});

        setData(pieData);
      });
  }, []);

  console.log("data", data);
  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {Object.keys(data).map((skill_id) => (
          <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>{data[skill_id].name}</h2><h3>Total time in minutes</h3>
            <Doughnut data={data[skill_id].chartData} />
          </Paper>
        </Grid>
        ))}
      </Grid>
    </div>
    // continuous load for all skill graphs
    // make each container onClick go to skill page
    // wrap paper in <a
  );
}
