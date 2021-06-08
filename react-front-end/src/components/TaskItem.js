import React, { useState } from "react";

import { TableCell, TableRow, Checkbox } from '@material-ui/core';
// import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";


export default function TaskItem(props) {

  function deletetask(id) {
    return axios.delete(`api/task/${id}`, { id })
      .then(function(response) {
        const taskCopy = [...props.task];
        for (let task of taskCopy) {
          if (task.id === props.task.id) {
            task.delete = true
          }
        }
        
        console.log(taskCopy);
        props.setTasks(taskCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  console.log(props.task)
  return (
    <>
      {!props.task.delete && <TableRow key={props.task.id}>
        <TableCell >{props.task.name}</TableCell>
        <TableCell >{props.task.status}</TableCell>
        <TableCell >{props.task.start_date}</TableCell>
        <TableCell >{props.task.end_date}</TableCell>
        <TableCell >
          < Checkbox
            disabled
            checked={props.task.is_completed}
          />
        </TableCell>
        <TableCell >
          <IconButton
            aria-label="delete"
          >
            <DeleteIcon  />
          </IconButton>
        </TableCell>
      </TableRow>}
    </>
  )
}