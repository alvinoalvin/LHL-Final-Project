import React from "react";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";


export default function Member(props) {

function deleteMember(id) {
  return axios.put(`api/users/${id}`, {id})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

  return (
    <TableRow key={props.member.id}>
      <TableCell >{props.member.first_name} {props.member.last_name}</TableCell>
      <TableCell >{props.member.email}</TableCell>
      <TableCell >{props.member.position}</TableCell>
      <TableCell >      
        <IconButton 
          aria-label="delete" 
          onClick={(event) => 
            { if (window.confirm('Are you sure you want to delete?'))   deleteMember(props.member.id) 
            }}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}