import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import axios from "axios";

import Deliverable from "./Deliverable";

import '../../../styles/variables.scss';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  {
    id: 'date',
    label: 'Date Completed',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'time',
    label: 'Time Estimate (min)',
    minWidth: 170,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tableHeaderRow: {
    backgroundColor: 'var(--table-header)',
    fontFamily: 'var(--header-font)',
  }
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [deliverables, setDeliverables] = useState([]);

  useEffect(() => {
    axios.get(`/api/deliverables/users/skills/${props.userID}&${props.skill.skill_id}`)
    .then(function(response) {
      setDeliverables(response.data)
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }, [props.userID, props.skill.skill_id])

  const deliverableList = deliverables.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(deliverable => {
    return (
      <Deliverable key={deliverable.deliverable_id} deliverable={deliverable}/>
    )
  })

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table className='deliverable-table' stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deliverableList}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={deliverables.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(handleChangePage)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
