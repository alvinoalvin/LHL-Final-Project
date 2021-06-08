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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
  },
}));


export default function Team(props) {
  const classes = useStyles();
  const [team, setTeam] = useState([]);

  let team_id = 1

  useEffect(() => {
    axios.get(`/api/teams/${team_id}`)
      .then(function(response) {
        console.log(response.data);
        setTeam(response.data)
      })
  }, [])

  const teamList = team.map(member => {
    return (
      <Member
        member={member}
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
      <Button variant="contained" onClick={props.onAdd}>Add Team Member</Button>
      <Form />
    </div>

  )
}