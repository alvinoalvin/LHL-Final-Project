import axios from "axios";
import React, { useState, useEffect } from "react";
import Member from "./components/Member";
import Form from "./components/Form";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
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


export default function Team(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [team, setTeam] = useState([]);

  let team_id = 1

  useEffect(() => {
    axios.get(`/api/teams/${team_id}`)
      .then(function(response) {
        setTeam(response.data)
      })
  }, [])

  const teamList = team.map(member => {
    return (
      <Member
        member={member}
        setTeam={setTeam}
        team={team}
      />
    )
  })

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamList}

          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
        Add New Member
      </Button>
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
          <div className={classes.paper}>
          <Form 
            setTeam={setTeam}
            team={team}
            handleClose={handleClose}
          />
          </div>
        </Fade>
      </Modal>

    </div>

  )
}