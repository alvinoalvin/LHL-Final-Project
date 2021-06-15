import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import "../../../styles/variables.scss";
import { purple } from "@material-ui/core/colors";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "40px 0 0 0",
    color: '#fff',
    fontFamily: 'var(--header-font)',
    backgroundColor: 'var(--button)',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
  },
  h5: {
    margin: "0 0 15px 0",
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: purple,
  }
});

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

  const [snack, setSnack] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    severity: ''
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };

  function checkRec() {
    if (!name) {
      setAlert({ message: 'Please enter name!', severity: 'warning'})
      return false
    }
  
    if (!link) {
      setAlert({ message: 'Please enter a link!', severity: 'warning'})
      return false
    }
  
    return true;
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.h5}>
          Add New Resource
        </Typography>
        <form className='new-member-form' noValidate>
          <ThemeProvider theme={theme}>
            <Grid container spacing={3}>
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
                if (!checkRec()) {
                  setSnack(true)
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
        </ThemeProvider>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snack}
          key={'report-snack-bar'}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </div>
    </Container>

  )
}