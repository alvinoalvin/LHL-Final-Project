import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import date from 'date-and-time';


export default function Deliverable(props) {
  const newDate = new Date(props.deliverable.end_date);
  const dueDate = date.format(newDate, 'YYYY/MM/DD');

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{props.deliverable.deliverable_name}</TableCell>
      <TableCell>{props.deliverable.status}</TableCell>
      <TableCell align="right">{dueDate}</TableCell>
      <TableCell align="right">{props.deliverable.time_estimate_minutes}</TableCell>
    </TableRow>
  )
}