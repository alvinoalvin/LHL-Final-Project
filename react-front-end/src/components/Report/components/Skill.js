import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

import Deliverable from "./Deliverable";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function Skill(props) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

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
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton disabled={!props.skill.task_count && !props.skill.resource_count} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.skill.skill_name}
        </TableCell>
        <TableCell align="right">{props.skill.task_count}</TableCell>
        <TableCell align="right">{props.skill.resource_count}</TableCell>
        <TableCell align="right">{Math.round(props.skill.total_time / 60)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
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
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}