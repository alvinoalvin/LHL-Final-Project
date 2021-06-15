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
    width: "auto",
    minWidth: "60%",
    padding: "47px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F6F5F3",
    },
  },

  pieContainer: {
    margin: "15px, 15px, 15px"
  }

}));

export default function HomePieGraphs(props) {
  const classes = useStyles();
  const [data, setData] = useState({});
  const history = useHistory();
  const labels = [
    "Most Completed Tasks",
    "Most Progress Tasks",
    "Most Staged Tasks",]

  function handleClick(id) {
    history.push("/skill", { skillId: id });
  }

  useEffect(() => {
    axios.get("api/analytics/topskills", {
      headers: {
        "Content-Type": "application/json",
      }, params: { id: props.userId }
    }, [])
      .then((response) => {
        let maxStageSkill = { stage_count: 0 };
        let maxProgressSkill = { progress_count: 0 };
        let maxCompleteSkill = { complete_count: 0 };
        let maxObjs = {};
        response.data.map((skill) => {
          if (skill.stage_count > maxStageSkill.stage_count) {
            maxStageSkill = skill;
            maxStageSkill.skill_id = skill.id;
          }
          if (skill.progress_count > maxProgressSkill.progress_count) {
            maxProgressSkill = skill;
            maxProgressSkill.skill_id = skill.id;
          }
          if (skill.complete_count > maxCompleteSkill.complete_count) {
            maxCompleteSkill = skill;
            maxCompleteSkill.skill_id = skill.id;
          }
          
          return { maxStageSkill, maxProgressSkill, maxCompleteSkill, maxObjs }
        });

        axios.get(`api/analytics/topskills/timeest/?array=[${maxStageSkill.skill_id}, ${maxProgressSkill.skill_id}, ${maxCompleteSkill.skill_id}]`)
          .then(timeResp => {
            timeResp.data.map((skill) => {
              if (skill.skill_id === maxStageSkill.skill_id && skill.status === "Staged") {
                maxStageSkill.total_estimate = skill.estimated_time;
              }
              if (skill.skill_id === maxProgressSkill.skill_id && skill.status === "In Progress") {
                maxProgressSkill.total_estimate = skill.estimated_time;
              }
              if (skill.skill_id === maxCompleteSkill.skill_id && skill.status === "Completed") {
                maxCompleteSkill.total_estimate = skill.estimated_time;
              }

              return {maxStageSkill, maxProgressSkill, maxCompleteSkill}
            });

            maxObjs = {
              "maxCompleteSkill": maxCompleteSkill,
              "maxProgressSkill": maxProgressSkill,
              "maxStageSkill": maxStageSkill
            };
            maxObjs.maxProgressSkill.label = "Most Progress Tasks"
            maxObjs.maxCompleteSkill.label = "Most Completed Tasks"
            maxObjs.maxStageSkill.label = "Most Staged Tasks"

            const dataObj = {};
            Object.keys(maxObjs).map((key) => {
              const dataPoint = maxObjs[key]
              const skill = {
                id: maxObjs[key].id,
                name: dataPoint.name,
                label: dataPoint.label,
                total_time: Math.round((parseInt(maxObjs[key].sum_stage_time ? maxObjs[key].sum_stage_time : 0) + parseInt(maxObjs[key].sum_progress_time ? maxObjs[key].sum_progress_time : 0) + parseInt(maxObjs[key].sum_complete_time ? maxObjs[key].sum_complete_time : 0)) / 60),
                chartData: {
                  labels: ["Staged (mins)",  "In Progress (mins)","Completed (mins)"],
                  datasets: [
                    {
                      data: [maxObjs[key].sum_stage_time, maxObjs[key].sum_progress_time, maxObjs[key].sum_complete_time],
                      backgroundColor: ["#d4d0d0","#643bd1","#c83cd0"]
                    },
                  ],
                },
              };
              return dataObj[key] = skill
            });
            setData(dataObj);
          }, [])
          .catch((error) => { console.log(error) });

      })
  }, [props.userId]);


  return (
    <div className={classes.root}>

      <Grid container spacing={6}>
        {Object.keys(data).map((skill_id, index) => (
          <Grid key={index} item xs={4}>
            <div
              onClick={() => {
                handleClick(data[skill_id].id);
              }}
            >
              <Paper className={classes.paper}>
                <h3>{labels[index]}</h3>
                <h5>{data[skill_id].name}</h5>
                <h7>Total Skill Time: {data[skill_id].total_time}hrs</h7>
                <Doughnut key={index} data={data[skill_id].chartData} />
              </Paper>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
