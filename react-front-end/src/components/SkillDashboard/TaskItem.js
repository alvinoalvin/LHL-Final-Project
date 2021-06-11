import React, { useState, useEffect } from "react";

import { TableCell, TableRow, Checkbox, Input, Select, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getDate } from "../../helpers/dateFuncs"

import { makeStyles } from '@material-ui/core/styles';

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));


const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}
      component="th"
      padding="2px"
    >
      {isEditMode ? (
        <Input
          name={name}
          onChange={(e, value) => { onChange(e, row) }}
          className={classes.input}
          defaultValue={row["name"]}
        />
      ) : (
        row.name
      )}
    </TableCell>
  );
};

const CustomStatusCell = ({ row, status, onStatusChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  // const [status, setStatus] = React.useState('');


  return (
    <TableCell align="left" className={classes.statusCell}
      padding="none">
      {isEditMode ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={onStatusChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

      ) : (
        status
      )}
    </TableCell>
  );
};

export default function TaskItem(props) {
  const { task, tasks, setTasks, isItemSelected, labelId, handleClick, selected, setSelected } = props;
  const [previous, setPrevious] = React.useState({});
  const [statusMap, setStatusMap] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    axios.get(`/api/status`)
      .then(response => {
        setStatusMap(response.data)
      }).catch(error => console.log(error));
  }, []);

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

  const onToggleEditMode = (id) => {
    setTasks((state) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isEditMode: !task.isEditMode };
        }
        return task;
      });
    });
    /* run axios api to update tasks on db here. */
  };

  const onChange = (e, task) => {
    if (!previous["task"]) {
      setPrevious({ "task": task });
    }
    const value = e.target.value;
    const { id } = task;
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, "name": value };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const onStatusChange = (e, task) => {
    if (!previous["task"]) {
      setPrevious({ "task": task });
    }
    const value = e.target.value;
    const { id } = task;
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, "status": value, "status": value };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const onRevert = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.name = previous.task.name
        task.status = previous.task.status
        task.status_id = previous.task.status_id
      }
      return task;
    });
    console.log(tasks)
    setTasks(newTasks);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };
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

      <TableCell align="left">
        < Checkbox
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>

      <CustomTableCell
        {...{ row: task, name: task.name, onChange }}
      />
      <TableCell align="left">{task.status}</TableCell>
      <TableCell align="left">{getDate(task.end_date)}</TableCell>
      <TableCell align="left">{task.time_estimate_minutes}</TableCell>
      <TableCell align="left"><a href={task.link}>{task.link !== "No Link Needed?" && task.link !== "" ? "Link" : ""}</a></TableCell>
      <TableCell align="left" >
        < Checkbox
          disabled
          checked={task.is_completed}
        />
      </TableCell>
      <TableCell className={classes.selectTableCell}>
        {task.isEditMode ? (
          <>
            <IconButton
              aria-label="done"
              onClick={() => onToggleEditMode(task.id)}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              aria-label="revert"
              onClick={() => onRevert(task.id)}
            >
              <RevertIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            aria-label="delete"
            onClick={() => onToggleEditMode(task.id)}
          >
            <EditIcon />
          </IconButton>
        )}
      </TableCell>
      <TableCell align="left">
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