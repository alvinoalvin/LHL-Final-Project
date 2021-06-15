import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {Doughnut} from 'react-chartjs-2';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import Table from "./Table";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      borderBottom: 'unset',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'var(--content)',
    border: '2px solid var(--nav)',
    borderRadius: '50px',
    boxShadow: theme.shadows[5],
    padding: '4rem 3rem',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  add: {
    fontFamily: 'var(--header-font)',
    backgroundColor: 'var(--button)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
    margin: '1rem 0rem',
  },
  skillName: {
    fontFamily: 'var(--header-font)',
    fontSize: '24px',
    marginBottom: '1rem',
  }
}));


export default function Skill(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const [pieData, setPieData] = useState({})
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    axios.get(`/api/skills/report/time/users/${props.userID}&${props.skill.skill_id}`)
    .then(function(response) {
      const responseData = response.data
      let staged_time = 0;
      let progress_time = 0;
      let completed_time = 0;

      for (let object of responseData) {
        if (object.status_id === 1) {
          staged_time = Math.ceil(object.total_estimate / 60)
        }

        if (object.status_id === 2) {
          progress_time = Math.ceil(object.total_estimate / 60)
        }

        if (object.status_id === 3) {
          completed_time = Math.ceil(object.total_estimate / 60)
        }
      }

      const data = {
        labels: [
          'Staged',
          'In Progress',
          'Completed'
        ],
        datasets: [{
          label: props.skill.skill_name,
          data: [staged_time, progress_time, completed_time],
          backgroundColor: [
            "#c83cd0", "#643bd1", "#d4d0d0"
          ],
          hoverOffset: 4
        }]
      };

      setPieData(data)
      setTotalTime(Number(staged_time) + Number(progress_time) + Number(completed_time))
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }, [props.userID, props.skill.skill_id, props.skill.skill_name])


  return (
    <Grid className={classes.grid} item xs={3}>
      <Typography className='skill-info'>
        {props.skill.skill_name}
      </Typography>
      <Typography className='skill-info'>
        Time: {Math.ceil(totalTime)}h
      </Typography>
      <Doughnut data={pieData} />
      <Button variant="contained" className={classes.add} type="button" onClick={handleOpen}>
        View Details
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography className={classes.skillName}>
            Skill: {props.skill.skill_name}
          </Typography>
          <Table
            userID={props.userID}
            skill={props.skill}
          />
        </div>
      </Fade>
    </Modal>
    </Grid>


  )
}