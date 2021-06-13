import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Libraries */
const axios = require('axios');
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
});
export default function CustomProgressBar(props) {
  const classes = useStyles();
  const [stagedCount, setStagedCount] = useState(0);
  const [inProgCount, setInProgCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  function getPercent(partialValue, totalValue, should_round) {
    if (should_round) {
      return Math.floor((100 * partialValue) / totalValue);
    }
      return (100 * partialValue) / totalValue;
  }

  useEffect(() => {
    axios.get(`/api/deliverables/counts/${props.userID}/${props.skillID}`)
      .then(response => {
        const data = response.data
        console.log(data)

        const staged = parseInt(data.find(status => status.status == "Staged").count)
        const inProg = parseInt(data.find(status => status.status == "In Progress").count)
        const complted = parseInt(data.find(status => status.status == "Completed").count)

        setStagedCount(staged)
        setInProgCount(inProg)
        setCompleteCount(complted)
             
        setTotalCount(stagedCount + inProgCount + completeCount);
      })
      .catch(error => console.log(error));
  }, [stagedCount, inProgCount, ,completeCount,totalCount]);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
            Progress
          </Typography>
          <ProgressBar>
            <ProgressBar striped variant="success" now={getPercent(stagedCount, totalCount, false)} key={1} label={`In Progress ${getPercent(stagedCount, totalCount,true)}%`} />
            <ProgressBar variant="warning" now={getPercent(inProgCount, totalCount, false)} key={2} label={`Completed ${getPercent(inProgCount, totalCount,true)}%`} />
            <ProgressBar striped variant="" now={getPercent(completeCount, totalCount, false)} key={3} label={`Staged ${getPercent(completeCount, totalCount,true)}%`} />
          </ProgressBar>
        </CardContent>
      </Card>
    </>
  );
}
