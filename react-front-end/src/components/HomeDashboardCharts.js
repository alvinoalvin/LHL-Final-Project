import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import SkillViewAll from './SkillViewAll';

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

export default function CenteredGrid() {
  const classes = useStyles();
  //update wth actual datacalls
  const [testdata, setData] = useState();

  const [labels, setLabels] = useState();

  //only run on first load []
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/analytics/skill-status", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data);
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
        console.log(stackBarData);
        setData(stackBarData);
      });
  }, []);

  // change string to number

  //Bar chart real data
  const data = {
    labels: labels,
    datasets: Object.entries(testdata || {}).map(([label, values], i) => ({
      label,
      data: values,
      backgroundColor: `rgba(${i * 100},250,250)`,
    })),
  };

  console.log("datasets?", data);

  //placeholder for line chart
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Completed",
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
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  //placeholder for pie chart
  const pieData = {
    labels: ["In Progress", "Complete", "Staged"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ],
  };

  return (
    <div className={classes.root}>
      <SkillViewAll />
      <Grid container spacing={6}>
        
        {/* <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h3>Most in-progress</h3>
            <h2>React</h2>
            <Doughnut data={pieData} />
          </Paper>
        </Grid> */}
        
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <div>
              <h2>Progress this week</h2>
              <Bar
                data={data}
                width={100}
                height={50}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "subheading",
                    },
                  },
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
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2>Completion Rate</h2>
            <Line data={lineData} />
          </Paper>
        </Grid>
        {/* <Grid item xs={3}>
          <Paper className={classes.paper}><h3>Newest Skill</h3><h2>Javascript</h2><Doughnut data={pieData}/></Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
