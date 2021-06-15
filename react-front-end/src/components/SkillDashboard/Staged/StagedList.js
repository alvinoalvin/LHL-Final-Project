import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Input, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    color: "black",
    textDecoration: "underline black"
  }
});

/* Libraries */
const axios = require('axios');

export default function StagedList(props) {
  const classes = useStyles();
  const { stagedDeliv, setStagedDeliv, tasks, setTasks, resources, setResources } = props

  function addStaged(stageItem) {
    return axios.post(`api/deliverables/staging/${stageItem.id}`, { stageItem })
      .then(function(response) {
        const stagedCopy = stagedDeliv.filter((staged) => {
          if (staged.id !== stageItem.id) {
            return staged
          }
        });
        setStagedDeliv(stagedCopy);

        if (stageItem.type_id === 1) {
          const taskCopy = [...tasks, stageItem]
          props.setTasks(taskCopy)
        }
        else if (stageItem.type_id === 2) {
          const resourceCopy = [...resources, stageItem]
          props.setResources(resourceCopy)
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function deleteStaged(stageItem) {
    return axios.delete(`api/deliverables/?array=[${stageItem.id}]`, { stageItem })
      .then(function(response) {
        const stagedCopy = stagedDeliv.filter((staged) => {
          if (staged.id !== stageItem.id) {
            return staged
          }
        });
        setStagedDeliv(stagedCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  const Spacing = () => { return <span style={{ padding: 30 }} >&nbsp;</span> };

  return (
    <Card className={classes.root}>
      <CardContent style={{ height: 418, overflow: 'auto' }}>
        <Typography gutterBottom variant="h6" component="h4">
          Tasks/Resource Staging
          </Typography>
        <Typography className={classes.pos} >
          {Object.keys(stagedDeliv).map((id) => {
            return (<>
              <div class="flexcontainer">
                <IconButton
                  aria-label="add"
                  onClick={(event) => {
                    addStaged(stagedDeliv[id]);
                  }}>
                  <CheckIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={(event) => {
                    if (window.confirm('Are you sure you want to delete?')) {
                      deleteStaged(stagedDeliv[id]);
                    }
                  }}>
                  <CloseIcon />
                </IconButton>
                <div class="divItem1">{stagedDeliv[id].type}</div>
                {stagedDeliv[id].link ? (
                  <a class={classes.link} href={stagedDeliv[id].link}><div class="divItem2" style={{ textDecoration: 'underline black' }}>{stagedDeliv[id].name}</div></a>) : (
                  <div class="divItem2">{stagedDeliv[id].name}</div>)
                }
              </div>
            </>
            )
          })}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}

