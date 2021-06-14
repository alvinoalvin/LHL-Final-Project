import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Doughnut } from "react-chartjs-2";
import { useHistory } from "react-router-dom";

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

export default function HomePieGraphs(props) {
  const classes = useStyles();
  const [data, setData] = useState({});
  const history = useHistory();

  function handleClick(id) {
    history.push("/skill", { skillId: id });
  }

  useEffect(() => {
    axios
      .get("api/analytics/time-estimate", {
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
              datasets: [
                {
                  data: [],
                  backgroundColor: [ "#c83cd0", "#643bd1", "#d4d0d0" ]
                  //"#c991fa", "#6491fa", "#0f91fa" 
                },
              ],
            },
          };
          skill.chartData.labels.push(dataPoint.status);
          skill.chartData.datasets[0].data.push(dataPoint.total_estimate);
          return {
            ...acc,
            [dataPoint.skill_id]: skill,
          };
        }, {});

        setData(pieData);
      });
  }, []);

  const styles = {
    textDecoration: "none",
    "&:hover": {
      color: "white",
    },
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {Object.keys(data).map((skill_id) => (
          <Grid item xs={4}>
            <div
              onClick={() => {
                handleClick(skill_id);
              }}
            >
              <Paper className={classes.paper}>
                <h2>{data[skill_id].name}</h2>
                <h5>Time in Minutes</h5>
                <Doughnut data={data[skill_id].chartData} />
              </Paper>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
