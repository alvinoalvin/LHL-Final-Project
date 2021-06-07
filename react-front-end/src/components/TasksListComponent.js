import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";
import '../styles/TasksListComponent.scss';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  { id: 4, col1: 'Material-UI', col2: 'is Amazing' },
  { id: 5, col1: 'Material-UI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Task Name', width: 150 },
  { field: 'col1', headerName: 'Date Created', width: 150 },
  { field: 'col2', headerName: 'Status', width: 150 },
  { field: 'col2', headerName: 'Status', width: 150 },
];

export default function TasksListComponent() {

  return (
    <div class="task-list-component">
      <DataGrid rows={rows} columns={columns} checkboxSelection />
      <Button variant="outlined" color="primary">
        Add Task
      </Button>
    </div>
  );
}