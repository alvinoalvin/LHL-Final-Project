import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Modal, Backdrop, Fade, Button, Grid } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import Form from "./NewSkill/components/Form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "700px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SkillViewAll(props) {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [mode, setMode] = useState("donought");
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                  backgroundColor: ["#91C4F2", "#576AB3", "#7E1F86"],
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
        <Grid item xs={12}>
          <Paper className={classes.paper} id="quote-container">
            <h5>
              “You have to invest if you want to progress.” ― Erin Hatzikostas,
              You Do You(ish)"
            </h5>
          </Paper>
        </Grid>

        {Object.keys(data).map((skill_id) => (
          <Grid item xs={4}>
            <div onClick={() => { handleClick(skill_id) }}>
              <Paper className={classes.paper}>
                <h2>{data[skill_id].name}</h2>
                <h3>Time in Minutes</h3>
                <Doughnut data={data[skill_id].chartData} />
              </Paper>
            </div>
          </Grid>
        ))}

        <Grid item xs={4}>
          <Paper className={classes.paper} id="add-skill-container">
            <h2>Add New Skill</h2>

            <div className="appointment__add">

              <img
                className="appointment__add-button"
                // src="images/add.png"
                src="images/plus.svg"
                color="rgb(34, 47, 62)"
                alt="Add"
                onClick={handleOpen}
                onHover={styles}
              />
            </div>

          </Paper>
        </Grid>

      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} id = "modal-form-container">
            <Form />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
