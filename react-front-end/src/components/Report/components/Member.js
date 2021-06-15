import React, { useState, useEffect, useContext } from 'react';
import { authContext } from '../../../providers/AuthProvider';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Grid from '@material-ui/core/Grid';

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

  const { id } = useContext(authContext);
  const userID = id;

  useEffect(() => {
    axios.get(`/api/skills/report/users/${props.member.id}`)
    .then(function(response) {
      setSkills(response.data)
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }, [props.member.id])

  const skillList = skills.map(skill => {
    return (
      <Skill
        key={props.member.id + ':' + skill.skill_id}
        userID={props.member.id}
        skill={skill}
      />
    )
  })

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className='table-body-cell'>
          <IconButton disabled={!total} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className='table-body-cell' component="th" scope="row">
          {props.member.first_name} {props.member.last_name}
          {props.member.id === userID && <span> (Me)</span>}
        </TableCell>
        <TableCell className='table-body-cell' align="right">{props.member.staged_count}</TableCell>
        <TableCell className='table-body-cell' align="right">{props.member.in_progress_count}</TableCell>
        <TableCell className='table-body-cell' align="right">{props.member.completed_count}</TableCell>
        <TableCell className='table-body-cell'align="right">{total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={8}>
                {skillList}
              </Grid>
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
