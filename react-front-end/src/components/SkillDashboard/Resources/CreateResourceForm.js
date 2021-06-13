import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import { CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "40px 0 0 0"
  },
  h5: {
    margin: "0 0 15px 0",
  }
}));

export default function CreateResourceForm(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function addResource() {
    const newResource = {
      creator: props.userID,
      assigned_to: props.userID,
      skill_id: props.skillID,
      type_id: 2,
      name: name,
      link: link,
      create_date: new Date().toISOString()
    }

    return axios.post(`/api/tasks`, newResource)
      .then(function(response) {
        newResource.id = response.data.result.id
        const resourceCopy = [...props.rows, newResource]
        props.setRows(resourceCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.h5}>
          Add New Resource
        </Typography>
        <form className='new-member-form' noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="create-resource-name-input"
                name="name"
                variant="outlined"
                required
                fullWidth
                placeholder="Resource"
                label="Resource Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="create-resource-link-input"
                name="link"
                variant="outlined"
                required
                fullWidth
                placeholder="Link"
                label="Resource Link"
                value={link}
                onChange={(event) => setLink(event.target.value)}
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={(event) => {
              const nameInput = document.getElementById("create-resource-name-input");
              const linkInput = document.getElementById("create-resource-link-input");

              if (!nameInput.value) {
                alert("Please enter a name")
              }
              else if (!linkInput.value) {
                alert("Please enter a link")
              }
              else {
                addResource()
                props.handleClose()
              }
            }
            }
          >
            Save
        </Button>
        </form>
      </div>
    </Container>

  )
}