import React, { useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import date from 'date-and-time';


export default function Deliverable(props) {
  let newDate = new Date(props.deliverable.end_date)
  let endDate = date.format(newDate, 'YYYY/MM/DD');

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {props.deliverable.skill_name}
      </TableCell>
      <TableCell>{props.deliverable.type}</TableCell>
      <TableCell>{props.deliverable.deliverable_name}</TableCell>
      <TableCell align="right">{endDate}</TableCell>
      <TableCell align="right">{props.deliverable.time_estimate_minutes}</TableCell>
      <TableCell align="right">{props.deliverable.status}</TableCell>
    </TableRow>
  )
}