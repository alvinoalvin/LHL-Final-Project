/* React Libraries */
import React, { useState, useEffect } from "react";

/* Material Ui */
// import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper } from "@material-ui/core";
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";
// import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';

/* Custom components */
import TaskItem from './TaskItem';
import CreateTaskForm from './CreateTaskForm';
import EnhancedTable from "./EnhancedTable";
/* scss */
import '../../styles/TasksListComponent.scss';

/* Libraries */
const axios = require('axios');
/* TODO
    - name need to be editable
    - status need to be dropdown editable 
    - add trash can on click thingy (for bulk)
    
    https://codesandbox.io/s/f71wj
*/

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 400,
  },
  dialogPaper: {
    height: '400px'
  },
}));

export default function TasksListComponent(props) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(`/api/tasks/${props.userID}/${props.skillID}`)
      .then(response => {
        setTasks(response.data);
      }).catch(error => console.log("ERROR: ", error));
  }, []);

  /* make sure ids match db column names */
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'start_date', numeric: false, disablePadding: false, label: 'Start Date' },
    { id: 'end_date', numeric: false, disablePadding: false, label: 'End Date' },
    { id: 'completed', numeric: false, disablePadding: false, label: 'Completed' },
  ];

  const handleDelete = (selected) => {
    console.log("DELETING")
    console.log(selected)
  }

  return (
    <div class="task-list-component" >
      <EnhancedTable
        key={1}
        rows={tasks}
        headCells={headCells}
        tasks={tasks}
        setTasks={setTasks}
        rowComponent={TaskItem}
        handleDelete={handleDelete}
        tableName={"All Tasks"}
      />

      <Button variant="outlined" color="primary" onClick={setOpen}>
        Add Task
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CreateTaskForm
              userID={props.userID}
              skillID={props.skillID}
              setTasks={setTasks}
              tasks={tasks}
              handleClose={handleClose}
            />
          </div>
        </Fade>
      </Modal>

    </div>
  );
}
