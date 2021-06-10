import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { CSVLink } from "react-csv";

import axios from "axios";

import Member from "./components/Member"


export default function Report(props) {
  const [team, setTeam] = useState([]);
  const [csvData, setcsvData] = useState([]);

  const team_id = 1;

  useEffect(() => {
    axios.get(`/api/teams/${team_id}`)
      .then(function(response) {
        setTeam(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/csv/teams/${team_id}`)
      .then(function(response) {
        setcsvData(response.data)
      })
  })


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
    <section>
      <Typography component="h1" variant="h5">
        Team: Engineering
      </Typography>
      <Button variant="contained" color="primary" type="button">
        <CSVLink data={csvData}>Export</CSVLink>
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Staged</TableCell>
              <TableCell align="right">In Progress</TableCell>
              <TableCell align="right">Completed</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamList}
          </TableBody>
        </Table>
      </TableContainer>
    </section>

  )
}