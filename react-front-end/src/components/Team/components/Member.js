import React from "react";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

export default function Member(props) {

  const userID = 1;

  function deleteMember(id) {
    return axios.delete(`api/users/${id}`, {id})
    .then(function (response) {
      const teamCopy = [...props.team];
      for (let member of teamCopy) {
        if (member.id === props.member.id) {
          member.delete = true
        }
      }
      console.log(teamCopy);
      props.setTeam(teamCopy);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // to do: add customization to existing team members
  return (
    <>
    {!props.member.delete && <TableRow key={props.member.id}>
    <TableCell >
      {props.member.first_name + ' ' + props.member.last_name}
      {props.member.id === userID && <span> (Me)</span>}
      </TableCell>
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
  </TableRow>}
  </>
  )
}