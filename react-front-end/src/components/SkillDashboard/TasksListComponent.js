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
    - ui update for create Task form
    - 

    (Enhanced tables)
    https://codesandbox.io/s/f71wj
    
    (Editable tables) 
    https://codesandbox.io/s/material-ui-editable-tables-wsp0c?file=/src/index.js
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
    { id: 'name', numeric: false, disablePadding: true, label: 'Name', align: "left", width: 210 },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status', align: "left", width: 100 },
    { id: 'end_date', numeric: false, disablePadding: false, label: 'Due Date', align: "left", width: 150 },
    { id: 'time_estimate_minutes', numeric: false, disablePadding: false, label: 'Estimated Time (mins)', align: "left" },
    { id: 'link', numeric: false, disablePadding: false, label: 'Resource Link', align: "left", width: 100 },
    { id: 'is_completed', numeric: false, disablePadding: false, label: 'Done', align: "left" },
  ];

  const handleDelete = (selected, setSelected, tasks, setTasks) => {
    console.log("DELETING")
    console.log(`api/deliverables/?array=[${selected.toString()}]`)

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
    <div class="task-list-component" >
      <EnhancedTable
        key={1}
        rows={tasks}
        setRows={setTasks}
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

