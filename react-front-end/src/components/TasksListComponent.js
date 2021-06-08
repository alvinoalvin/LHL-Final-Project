import React from "react";
import { DataGrid} from '@material-ui/data-grid';
import { Button } from "@material-ui/core";
import '../styles/TasksListComponent.scss';
const axios = require('axios');


export default class TasksListComponent extends React.Component {

  state = {
    tasks: [],
    userId:1
  }

  componentDidMount() {
    axios.get(`/api/tasks/${this.state.userId}`)
      .then(response => {
        const tasks = response.data;
        console.log(tasks)
        this.setState({ tasks });
      }).catch(error => console.log("ERROR: ", error));
  }

  render() {
    const rows = this.state.tasks;

    const columns = [
      { field: 'id', headerName: 'id', width: 150 },
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