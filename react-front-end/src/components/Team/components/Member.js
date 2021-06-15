import React, { useContext } from "react";
import { authContext } from "../../../providers/AuthProvider";

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";

export default function Member(props) {

  const { id } = useContext(authContext);
  const userID = id;

  function deleteMember(id) {
    return axios.delete(`api/users/${id}`, {id})
    .then(function (response) {
      const teamCopy = [...props.team];
      for (let member of teamCopy) {
        if (member.id === props.member.id) {
          member.delete = true
        }
      }
      props.setTeam(teamCopy);
    })
    .catch(function (error) {
      console.log("ERROR: ", error);
    });
  }

  // to do: add customization to existing team members
  return (
    <>
    {!props.member.delete && <TableRow className='table-body-row' key={props.member.id} >
    <TableCell className='table-body-cell'>
      {props.member.first_name + ' ' + props.member.last_name}
      {props.member.id === userID && <span> (Me)</span>}
    </TableCell>
    <TableCell align='right' className='table-body-cell'>{props.member.email}</TableCell>
    <TableCell align='right' className='table-body-cell'>{props.member.position}</TableCell>
    <TableCell align='right' className='table-body-cell'>      
      <IconButton
        className='table-body-delete'
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