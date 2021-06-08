import React, { useState, setState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper } from "@material-ui/core";
import { Button, Checkbox } from "@material-ui/core";

import TaskItem from './TaskItem';

import FilterListIcon from '@material-ui/icons/FilterList';

import '../styles/TasksListComponent.scss';

/* Libraries */
const axios = require('axios');
/* TODO
    - name need to be editable
    - status need to be dropdown editable 
    - add trash can on click thingy 
    - Add task button needs onclick method
    - create new branch, add react router
    
    https://reactrouter.com/
    https://material-ui.com/components/data-grid/columns/
    https://codesandbox.io/s/f71wj
*/

export default function TasksListComponent(props) {
  const userId = 1;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/api/tasks/${userId}`)
      .then(response => {
        setTasks(response.data);
      }).catch(error => console.log("ERROR: ", error));
  });

  const tasksList = tasks.map(task => {
    return (
      <TaskItem
        task={task}
        tasks={tasks}
        setTasks={setTasks}
      />
    );
  })
  const rows = tasks;
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'start_date', headerName: 'Start Date', width: 150 },
    { field: 'end_date', headerName: 'End Date', width: 150 },
    {
      field: 'is_completed', headerName: 'Completed', width: 150,
      renderCell: (params) => (
        < Checkbox
          disabled
          checked={params.row.is_completed}
          onChange={() => {
            console.log(params.row);
          }}
          inputProps={{ 'aria-label': 'checkbox with small size' }}
        />
      ),
    },
    { field: 'full_name', headerName: 'Creator', width: 150 },
  ];

  return (
    <div class="task-list-component" >
      <h3>All Tasks</h3>
      <TableContainer component={Paper}>
        <Table className="task-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksList}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" color="primary">
        Add Task
      </Button>
    </div>
  );
}

