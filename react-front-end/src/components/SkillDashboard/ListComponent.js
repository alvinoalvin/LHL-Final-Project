/* React Libraries */
import React, { useState, useEffect } from "react";

/* Material Ui */
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

/* Custom components */
import EnhancedTable from "./EnhancedTable";

/* scss */
import '../../styles/TasksListComponent.scss';

/* Libraries */
const axios = require('axios');

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
    padding: theme.spacing(2, 4, 3)
  },
  dialogPaper: {
    height: '400px'
  },
}));

export default function ListComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { headCells, rows, setRows, handleDelete, RowComponent, CreateForm } = props
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(`/api/tasks/${props.userID}/${props.skillID}`)
      .then(response => {
        setRows(response.data);
      }).catch(error => console.log("ERROR: ", error));
  }, []);

  return (
    <div class="task-list-component" >
      <EnhancedTable
        key={1}
        rows={rows}
        setRows={setRows}
        headCells={headCells}
        RowComponent={RowComponent}
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
            <CreateForm
              userID={props.userID}
              skillID={props.skillID}
              setTasks={setRows}
              tasks={rows}
              handleClose={handleClose}
            />
          </div>
        </Fade>
      </Modal>

    </div>
  );
}

