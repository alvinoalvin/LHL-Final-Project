import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import date from 'date-and-time';

export default function Deliverable(props) {
  const newDate = new Date(props.deliverable.end_date);
  const dueDate = date.format(newDate, 'YYYY/MM/DD');

  return (
    <TableRow >
      <TableCell>{props.deliverable.deliverable_name}</TableCell>
      <TableCell>{props.deliverable.type}</TableCell>
      <TableCell>{props.deliverable.time_estimate_minutes}</TableCell>
      <TableCell>{props.deliverable.status}</TableCell>
      <TableCell>{dueDate}</TableCell>
    </TableRow>
  )
}