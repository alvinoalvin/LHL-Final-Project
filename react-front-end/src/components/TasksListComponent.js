import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Checkbox } from "@material-ui/core";
import '../styles/TasksListComponent.scss';
const axios = require('axios');


export default class TasksListComponent extends React.Component {

  state = {
    tasks: [],
    userId: 1
  }

  componentDidMount() {
    axios.get(`/api/tasks/${this.state.userId}`)
      .then(response => {
        const tasks = response.data;
        this.setState({ tasks });
      }).catch(error => console.log("ERROR: ", error));
  }

  render() {
    const rows = this.state.tasks;
    /* TODO
        - name need to be editable
        - status need to be dropdown editable
        - add trash can on click thingy https://codesandbox.io/s/f71wj
        - Add task button needs onclick method
    */
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
        <DataGrid rows={rows} columns={columns} checkboxSelection />
        <Button variant="outlined" color="primary">
          Add Task
      </Button>
      </div>
    );
  }
}