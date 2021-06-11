import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
      <Deliverable deliverable={deliverable}/>
    )
  })

  return (
    <Grid item xs={6} onClick={handleOpen}>
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
        <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell align="right">Time Esimate (min)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliverableList}
                </TableBody>
              </Table>
          </Box>
          <button type="button" onClick={handleClose2}>
            Close
          </button>
        </div>
      </Fade>
    </Modal>
    </Grid>


  )
}