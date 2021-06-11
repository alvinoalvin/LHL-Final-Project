import React, { useEffect, useState } from 'react';
import { makeStyles, lighten } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import Table from "./Table";
import Deliverable from "./Deliverable";


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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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

  const [deliverables, setDeliverables] = useState([]);


  useEffect(() => {
    axios.get(`/api/deliverables/users/skills/${props.userID}&${props.skill.skill_id}`)
    .then(function(response) {
      setDeliverables(response.data)
    })
  }, [])

  const deliverableList = deliverables.map(deliverable => {
    return (
      <Deliverable key={deliverable.deliverable_id} deliverable={deliverable}/>
    )
  })

  const [pieData, setPieData] = useState({})

  useEffect(() => {
    axios.get(`/api/skills/report/time/users/${props.userID}&${props.skill.skill_id}`)
    .then(function(response) {
      const responseData = response.data
      let staged_time = 0;
      let progress_time = 0;
      let completed_time = 0;

      for (let object of responseData) {
        if (object.status_id === 1) {
          staged_time = object.total_estimate
        }

        if (object.status_id === 2) {
          progress_time = object.total_estimate
        }

        if (object.status_id === 3) {
          completed_time = object.total_estimate
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
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

      setPieData(data)
    })
  }, [])


  return (
    <Grid item xs={4}>
      <Doughnut data={pieData} />
      <button type="button" onClick={handleOpen}>
        View Details
      </button>
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
          <Table/>
          <button type="button" onClick={handleClose2}>
            Close
          </button>
        </div>
      </Fade>
    </Modal>
    </Grid>


  )
}