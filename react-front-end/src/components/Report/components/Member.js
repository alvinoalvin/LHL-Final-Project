import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Skill from './Skill';

import axios from "axios";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


export default function Member(props) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const total = Number(props.member.staged_count) + Number(props.member.in_progress_count) + Number(props.member.completed_count);

  const [skills, setSkills] = useState([])

  const userID = 1;

  useEffect(() => {
    axios.get(`/api/skills/users/${props.member.id}`)
    .then(function(response) {
      setSkills(response.data)
    })
  }, [])

  const skillList = skills.map(skill => {
    return (
      <Skill
        userID={props.member.id}
        skill={skill}
      />
    )
  })

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton disabled={!total} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.member.first_name} {props.member.last_name}
          {props.member.id === userID && <span> (Me)</span>}
        </TableCell>
        <TableCell align="right">{props.member.staged_count}</TableCell>
        <TableCell align="right">{props.member.in_progress_count}</TableCell>
        <TableCell align="right">{props.member.completed_count}</TableCell>
        <TableCell align="right">{total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography gutterBottom component="div">
                Skills
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Tasks</TableCell>
                    <TableCell align="right">Resources</TableCell>
                    <TableCell align="right">Total Time Esimate (h)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {skillList}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
