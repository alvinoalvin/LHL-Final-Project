import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CreateTaskForm(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [estDuration, setEstDuration] = useState();
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  function addTask() {
    const newTask = {
      creator: props.userID,
      assigned_to: props.userID,
      skill_id: props.skillID,
      status_id: 2,
      time_estimate_minutes: estDuration,
      type_id: 1,
      name: name,
      // notes: description,
      link: link,
      create_date: Date.now() / 1000
    }

    return axios.post(`/api/tasks`, newTask)
      .then(function(response) {
        newTask.id = response.data.result.id
        const taskCopy = [...props.tasks, newTask]
        props.setTasks(taskCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <main>
      <h3>Add New Task Member</h3>
      <form className='new-member-form'>
        <input
          id="create-task-name-input"
          name="name"
          type="text"
          placeholder="Task"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          name="estDuration"
          type="text"
          placeholder="Estimated Duration (mins)"
          value={estDuration}
          onChange={(event) => setEstDuration(event.target.value)}
        />
        <input
          name="link"
          type="text"
          placeholder="link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        {/* <input
          name="description"
          type="text"
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        /> */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={(event) => {
            console.log(document.getElementById("create-task-name-input"))
            if (document.getElementById("create-task-name-input").value) {
              addTask()
              props.handleClose()
            } else {
              alert("Please enter a name")
            }
          }
          }
        >
          Save
        </Button>
      </form>
    </main>
  )
}