import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../providers/AuthProvider";

import Member from "./components/Member";
import Form from "./components/Form";

import "./styles.scss"

import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import "../../styles/variables.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
    borderRadius: 50,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "var(--content)",
    border: '2px solid var(--nav)',
    borderRadius: '50px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '600px',
  },
  dialogPaper: {
    height : '400px'
  },
  add: {
    fontFamily: 'var(--header-font)',
    backgroundColor: 'var(--button)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
  },
}));




export default function Team(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  document.title = "Team";


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [team, setTeam] = useState([]);

  const { team_id } = useContext(authContext);
  const teamID = team_id
  const team_name = 'Engineering'

  useEffect(() => {
    axios.get(`/api/teams/${teamID}`)
      .then(function(response) {
        setTeam(response.data)
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, [teamID])

  const teamList = team.map(member => {
    return (
      <Member
        key={member.id}
        member={member}
        setTeam={setTeam}
        team={team}
      />
    )
  })

  return (
    <div className='team-view'>
      <div className='team-info'>
      <Typography id='team-title'>
          Team Overview
        </Typography>
        <Typography id='team-title'>
          {team_name}
        </Typography>
        <Button variant="contained" className={classes.add} type="button" onClick={handleOpen}>
          Add New Member
        </Button>
      </div>
      <TableContainer className='table-container'>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className='table-header-row'>
              <TableCell className='table-header'>Name</TableCell>
              <TableCell align='right' className='table-header'>Email</TableCell>
              <TableCell align='right' className='table-header'>Position</TableCell>
              <TableCell align='right' className='table-header'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamList}
          </TableBody>
        </Table>
      </TableContainer>
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