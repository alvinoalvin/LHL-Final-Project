/* React Libraries */
import React, { useState, setState, useEffect } from "react";

/* Material Ui */
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper } from "@material-ui/core";
import { Button, Checkbox, Modal, Backdrop, Fade } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';

/* Custom components */
import TaskItem from './TaskItem';
import SkillDashboardForm from './SkillDashboardForm';

/* scss */
import '../../styles/TasksListComponent.scss';

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
            <SkillDashboardForm
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

