import React, { useState, useEffect } from "react";

import { TableCell, TableRow, Checkbox, Input, Select, MenuItem, TextField, } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
    minWidth: 650,
    height: 500
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 110,
    height: 40,
    padding: 0
  },
  select: {
    width: 130,
    height: 40
  }
}));


const CustomTableCell = ({ row, name, onChange, attr, type }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  function renderAttr() {
    if (type === "link" || type === "Link") {
      return (<a href={row.link}>{row.link !== "No Link Needed?" && row.link !== "" ? "Task Link" : ""}</a>)
    }
    if (type === "date" || type === "Date") {
      return getDate(row[attr])
    }
    return row[attr]
  }
  function renderInput() {
    if (type === "date") {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.input}
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={row.end_date}
            onChange={(value) => { onChange(value, row, attr, "date") }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            width="200"
          />
        </MuiPickersUtilsProvider>
      )
    }
    if (type === "number") {
      return (<Input
        id="create-task-est-dur-input"
        label="Estimated Duration (mins)"
        defaultValue={row[attr]}
        type="number"
        className={classes.input}
        onChange={(e, value) => { onChange(e, row, attr) }}
      />)
    }
    return (
      <Input
        name={name}
        onChange={(e, value) => { onChange(e, row, attr) }}
        className={classes.input}
        defaultValue={row[attr]}
        size="small"

      />
    )
  }
  return (
    <TableCell align="left" className={classes.tableCell}
      component="th"
      padding="2px"
    >
      {isEditMode ? (
        <>
          {renderInput()}
        </>
      ) : (<>
        {renderAttr()}
      </>
      )}
    </TableCell>
  );
};

const CustomStatusCell = ({ row, status, onStatusChange, statusMap }) => {
  const classes = useStyles();
  const { isEditMode } = row;

  function getKey(key) {
    if (statusMap != {}) {
      for (let row of statusMap) {
        if (row.status === key) {
          return row.id
        }
      }
    }
  }
  function createMenu() {
    const menu = []
    for (let row of statusMap) {
      menu.push(<MenuItem value={row.id}>{row.status}</MenuItem>)
    }
    return menu
  }

  return (
    <TableCell align="left" className={classes.statusCell}
      padding="none">
      {isEditMode ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className={classes.select}

          value={getKey(status)}
          onChange={(e) => { onStatusChange(e, row, statusMap) }}
        >
          {createMenu()}
        </Select>

      ) : (
        status
      )}
    </TableCell>
  );
};

export default function TaskItem(props) {
  const { row, rows, setRows, isItemSelected, labelId, handleClick, selected, setSelected } = props;
  const [previous, setPrevious] = React.useState({});
  const [statusMap, setStatusMap] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    axios.get(`/api/status`)
      .then(response => {
        setStatusMap(response.data)
      }).catch(error => console.log(error));
  }, [statusMap]);

  function deleteTask(id) {
    return axios.delete(`api/deliverables/?array=[${id}]`, { id })
      .then(function(response) {
        const taskCopy = rows.filter((task) => {
          if (task.id !== row.id) {
            return task
          }
        });

        const selectedCopy = selected.filter((selectedTask) => {
          if (selectedTask !== row.id) {
            return selectedTask
          }
        });
        setSelected(selectedCopy);
        setRows(taskCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const onToggleEditMode = (id, updateDb) => {
    setRows((state) => {
      return rows.map((task) => {
        if (task.id === id) {
          setPrevious({ "task": task })
          return { ...task, isEditMode: !task.isEditMode };
        }
        return task;
      });
    });
    /* run axios api to update tasks on db here. */
    if (updateDb) {
      return axios.post(`http://localhost:8080/api/tasks/${id}`, { task: row })
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const onChange = (e, task, attr, type) => {
    if (!previous["task"]) {
      setPrevious({ "task": task });
    }

    let value;
    if (type === "date") {
      value = e.toISOString();
    } else {
      value = e.target.value;
    }

    const { id } = task;
    const newTasks = rows.map((task) => {
      if (task.id === id) {
        task[attr] = value
        return task;
      }
      return task;
    });
    setRows(newTasks);
  };

  const onStatusChange = (e, task, statusMap) => {
    function getStatus(id) {
      for (const status of statusMap) {
        if (status.id === id) {
          return status.status
        }
      }
    }
    if (!previous["task"]) {
      setPrevious({ "task": task });
    }

    const value = e.target.value;
    const status = getStatus(value);


    const { id } = task;
    const newTasks = rows.map((task) => {
      if (task.id === id) {

        return {
          ...task, "status_id": value, "status": status, "is_completed": status === "Completed" ? true : false
        };
      }
      return task;
    });
    setRows(newTasks);
  };

  const onRevert = (id) => {

    const newTasks = rows.map((task) => {
      if (task.id === id) {
        task.name = previous.task.name
        task.status = previous.task.status
        task.status_id = previous.task.status_id
        task.link = previous.task.link
        task.end_date = previous.task.end_date
        task.time_estimate_minutes = previous.task.time_estimate_minutes
        if (task.status == "Completed") {
          task.is_completed = true;
        } else {
          task.is_completed = false;
        }
      }
      return task;
    });
    setRows(newTasks);
    setPrevious({});
    onToggleEditMode(id, false);
  };
  return (
    <TableRow key={row.id}
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >

      <TableCell align="left">
        < Checkbox
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>

      <CustomTableCell
        {...{ row: row, name: row.name, onChange, attr: "name", type: "text" }}
      />
      <CustomStatusCell
        {...{ row: row, status: row.status, onStatusChange, statusMap }}
      />
      <CustomTableCell
        {...{ row: row, name: getDate(row.end_date), onChange, attr: "end_date", type: "date" }}
      />
      <CustomTableCell
        {...{ row: row, name: row.time_estimate_minutes, onChange, attr: "time_estimate_minutes", type: "number" }}
      />
      <CustomTableCell
        {...{ row: row, name: row.name, onChange, attr: "link", type: "link" }}
      />
      <TableCell align="left" >
        < Checkbox
          disabled
          checked={row.is_completed}
        />
      </TableCell>
      <TableCell className={classes.selectTableCell}>
        {row.isEditMode ? (
          <>
            <IconButton
              aria-label="done"
              onClick={() => onToggleEditMode(row.id, true)}
            >
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            aria-label="delete"
            onClick={() => onToggleEditMode(row.id, false)}
          >
            <EditIcon />
          </IconButton>

        )}
      </TableCell>
      <TableCell align="left">
        {row.isEditMode ? (
          <IconButton
            aria-label="revert"
            onClick={() => onRevert(row.id)}
          >
            <RevertIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              if (window.confirm('Are you sure you want to delete?')) {
                deleteTask(row.id);
              }
            }}>
            <DeleteIcon />
          </IconButton>)}
      </TableCell>
    </TableRow>
  )
}