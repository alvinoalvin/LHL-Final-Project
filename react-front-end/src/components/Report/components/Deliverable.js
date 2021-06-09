import React, { useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


export default function Deliverable(props) {

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {props.deliverable.skill_name}
      </TableCell>
      <TableCell>{props.deliverable.type}</TableCell>
      <TableCell>{props.deliverable.deliverable_name}</TableCell>
      <TableCell align="right">{props.deliverable.time_estimate_minutes}</TableCell>
      <TableCell align="right">{props.deliverable.status}</TableCell>
    </TableRow>
  )
}