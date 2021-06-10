import React, { useState } from "react";

import { TableCell, TableRow, Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";


export default function TaskItem(props) {
  const { task, tasks, setTasks, isItemSelected, labelId, handleClick, selected, setSelected } = props;

  function deleteTask(id) {
    return axios.delete(`api/deliverables/?array=[${id}]`, { id })
      .then(function(response) {
        const taskCopy = tasks.filter((task) => {
          if (task.id !== props.task.id) {
            return task
          }
        });
        const selectedCopy = selected.filter((selectedTask) => {
          if (selectedTask !== props.task.id) {
            return selectedTask
          }
        });
        setSelected(selectedCopy);
        setTasks(taskCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // function getDate(dateStr) {
  //   const date = new Date(dateStr);
  //   const year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   let dt = date.getDate();

  //   if (dt < 10) {
  //     dt = '0' + dt;
  //   }
  //   if (month < 10) {
  //     month = '0' + month;
  //   }
  //   return (year + '-' + month + '-' + dt)
  // }

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
      <TableCell align="left">{task.status}</TableCell>
      {/* <TableCell align="left">{getDate(task.start_date)}</TableCell> */}
      <TableCell align="left">{task.time_estimate_minutes}</TableCell>
      <TableCell align="left"><a href={task.link}>{task.link !== "No Link Needed?" ? task.link : ""}</a></TableCell>
      <TableCell align="left" >
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