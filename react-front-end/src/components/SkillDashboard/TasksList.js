/* React Libraries */
import React, { useState, useEffect } from "react";

/* Custom components */
import TaskItem from './TaskItem';
import CreateTaskForm from './CreateTaskForm';
import ListComponent from './ListComponent';

/* scss */
import '../../styles/TasksListComponent.scss';

/* Libraries */
const axios = require('axios');

export default function TasksList(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/api/tasks/${props.userID}/${props.skillID}`)
      .then(response => {
        setTasks(response.data);
      }).catch(error => console.log("ERROR: ", error));
  }, []);

  /* make sure ids match db column names */
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Task Name', align: "left", width: 210 },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status', align: "left" },
    { id: 'end_date', numeric: false, disablePadding: false, label: 'Due Date', align: "left",width:200 },
    { id: 'time_estimate_minutes', numeric: false, disablePadding: false, label: 'Estimated Time (mins)', align: "left" },
    { id: 'link', numeric: false, disablePadding: false, label: 'Link', align: "left", width: 110 },
    { id: 'is_completed', numeric: false, disablePadding: false, label: 'Done', align: "left" },
  ];

  const handleDelete = (selected, setSelected, tasks, setTasks) => {
    return axios.delete(`api/deliverables/?array=[${selected.toString()}]`, {})
      .then(function(response) {
        const taskCopy = tasks.filter((task) => {
          if (!selected.includes(task.id)) {
            return task
          }
        });
        setSelected([]);
        setTasks(taskCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <ListComponent
      headCells={headCells}
      rows={tasks}
      setRows={setTasks}
      handleDelete={handleDelete}
      RowComponent={TaskItem}
      CreateForm={CreateTaskForm}
      tableName={"All Tasks"}
    />
  );
}

