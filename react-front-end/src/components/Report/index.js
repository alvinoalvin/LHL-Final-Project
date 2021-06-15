import React, { useEffect, useState, useContext } from 'react';
import { authContext } from '../../providers/AuthProvider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { CSVLink } from "react-csv";
import axios from "axios";

import Member from "./components/Member"

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
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


export default function Report(props) {
  const classes = useStyles();
  const [team, setTeam] = useState([]);
  const [csvData, setcsvData] = useState([]);

  const { team_id } = useContext(authContext);
  const teamID = team_id;

  document.title = "Reports";
  
  useEffect(() => {
    axios.get(`/api/teams/${teamID}`)
      .then(function(response) {
        setTeam(response.data)
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, [teamID])

  useEffect(() => {
    axios.get(`/api/csv/teams/${teamID}`)
      .then(function(response) {
        setcsvData(response.data)
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
    <section className='report-view'>
      <div className='team-info'>
      <Typography id='team-title'>
          Reporting
        </Typography>
        <Typography id='team-title'>
          Engineering
        </Typography>
        <Button className={classes.add} variant="contained" color="primary" type="button" id='export-data'>
          <CSVLink data={csvData}>Export</CSVLink>
        </Button>
      </div> 
      <TableContainer className='report-table-container'>
        <Table className='report-table' aria-label="collapsible table">
          <TableHead>
            <TableRow className='table-header-row'>
              <TableCell />
              <TableCell className='table-header-cell'>Name</TableCell>
              <TableCell align="right" className='table-header-cell'>Staged</TableCell>
              <TableCell align="right" className='table-header-cell'>In Progress</TableCell>
              <TableCell align="right" className='table-header-cell'>Completed</TableCell>
              <TableCell align="right" className='table-header-cell'>Total</TableCell>
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