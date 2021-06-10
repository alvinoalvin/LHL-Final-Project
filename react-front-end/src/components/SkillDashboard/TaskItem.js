import React, { useState } from "react";

import { TableCell, TableRow, Checkbox } from '@material-ui/core';
// import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";


export default function TaskItem(props) {
  const { task, tasks, setTasks, isItemSelected, labelId, handleClick, selected, setSelected } = props;

  function deleteTask(id) {
    return axios.delete(`api/deliverables/${id}`, { id })
      .then(function(response) {
        const taskCopy = tasks.filter((task) => {
          if (task.id !== props.task.id) {
            return task
          }
        });
        const selectedCopy = selected.filter((selectedTask) => {
          if (selectedTask !== props.task.name) {
            return selectedTask
          }
        });
        setSelected(selectedCopy);
        setTasks(taskCopy);
      })
      .catch(function(error) {
        console.log("Error")
        console.log(error);
      });
  }

  return (
    <TableRow key={task.id}
      hover
      onClick={(event) => handleClick(event, task.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={task.id}
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
            console.log("blah")
            // if (window.confirm('Are you sure you want to delete?')) {
            deleteTask(task.id);
            // }
          }}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}