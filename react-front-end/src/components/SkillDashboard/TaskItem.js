import React, { useState } from "react";

import { TableCell, TableRow, Checkbox } from '@material-ui/core';
// import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";


export default function TaskItem(props) {
  const { task, setTasks, isItemSelected, labelId, handleClick } = props;
  function deleteTask(id) {
    return axios.delete(`api/deliverables/${id}`, { id })
      .then(function(response) {
        const taskCopy = [...task];
        for (let task of taskCopy) {
          if (task.id === props.task.id) {
            task.deleted = true;
          }
        }
        setTasks(taskCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <TableRow key={task.id}
      hover
      onClick={(event) => handleClick(event, task.name)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={task.name}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {task.name}
      </TableCell>
      <TableCell align="right">{task.status}</TableCell>
      <TableCell align="right">{task.start_date}</TableCell>
      <TableCell align="right">{task.end_date}</TableCell>
      <TableCell >
        < Checkbox
          disabled
          checked={task.is_completed}
        />
      </TableCell>
      <TableCell >
        <IconButton
          aria-label="delete"
          onClick={(event) => {
            if (window.confirm('Are you sure you want to delete?')) {
              deleteTask(task.id);
            }
          }}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}