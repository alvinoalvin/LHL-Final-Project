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

  function getCount(data, status) {
    if (data.find(row => row.status === status)) {
      return parseInt(data.find(row => row.status === status).count)
    } else {
      return 0;
    }
  }
  useEffect(() => {
    axios.get(`/api/deliverables/counts/${props.userID}/${props.skillID}`)
      .then(response => {
        const data = response.data

        const staged = getCount(data, "Staged")
        const inProg = getCount(data, "In Progress")
        const completed = getCount(data, "Completed")

        setStagedCount(staged)
        setInProgCount(inProg)
        setCompleteCount(completed)

        setTotalCount(stagedCount + inProgCount + completeCount);
      })
      .catch(error => console.log(error));
  }, [stagedCount, inProgCount, completeCount, totalCount, props.userID, props.skillID]);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
            Progress
          </Typography>
          <ProgressBar>
            <ProgressBar striped variant="" now={getPercent(stagedCount, totalCount, false)} key={1} label={`Staging ${getPercent(stagedCount, totalCount, true)}%`} />
            <ProgressBar variant="warning" now={getPercent(inProgCount, totalCount, false)} key={2} label={`In Progress ${getPercent(inProgCount, totalCount, true)}%`} />
            <ProgressBar striped variant="success" now={getPercent(completeCount, totalCount, false)} key={3} label={`Completed ${getPercent(completeCount, totalCount, true)}%`} />
          </ProgressBar>
        </CardContent>
      </Card>
    </>
  );
}
