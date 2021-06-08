import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";
import '../styles/TasksListComponent.scss';
const axios = require('axios');


export default class TasksListComponent extends React.Component {

  state = {
    tasks: []
  }

  componentDidMount() {
    axios.get('/api/tasks')
      .then(response => {
        const tasks = response.data;
        console.log(tasks)
        this.setState({ tasks });
      }).catch(error => console.log("ERROR: ", error));
  }

  render() {
    const rows = this.state.tasks;
    console.log(rows);

    const columns = [
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'start_date', headerName: 'Date Created', width: 150 },
      { field: 'status', headerName: 'Status', width: 150 },
      { field: 'full_name', headerName: 'Creator', width: 150 }
    ];

    return (
      <div class="task-list-component" >
        <DataGrid rows={rows} columns={columns} />
        <Button variant="outlined" color="primary">
          Add Task
      </Button>
      </div>
    );
  }
}