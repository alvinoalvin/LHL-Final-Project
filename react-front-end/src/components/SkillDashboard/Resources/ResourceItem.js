import React from "react";

import { TableCell, TableRow, Checkbox, Input } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import rowStyle from '../../../helpers/deliverableRowStyles';

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

import axios from "axios";

const useStyles = rowStyle;

const CustomTableCell = ({ row, name, onChange, attr, type }) => {
  const classes = useStyles();
  const { isEditMode } = row;

  function renderAttr() {
    if (type === "link" || type === "Link") {
      return (<a className={classes.link} style={{ textDecoration: 'underline black' }} href={row.link}>{row.link !== "No Link Needed?" && row.link !== "" ? "Resource Link" : ""}</a>)
    }
    return row[attr]
  }

  function renderInput() {
    return (
      <Input
        name={name}
        onChange={(e, value) => { onChange(e, row, attr) }}
        className={classes.input}
        defaultValue={row[attr]}
        size="small"
      />
    )
  }

  return (
    <TableCell align="left" className={classes.tableCell}
      component="th"
    >
      {isEditMode ? (
        <>
          {renderInput()}
        </>
      ) : (<>
        {renderAttr()}
      </>
      )}
    </TableCell>
  );
};

export default function ResourceItem(props) {
  const { row, rows, setRows, isItemSelected, labelId, handleClick, selected, setSelected } = props;
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  function deleteResource(id) {
    return axios.delete(`api/deliverables/?array=[${id}]`, { id })
      .then(function(response) {
        const resourceCopy = rows.filter((resource) => {
          if (resource.id !== props.row.id) {
            return resource
          }

          return null;
        });

        const selectedCopy = selected.filter((selectedResource) => {
          if (selectedResource !== row.id) {
            return selectedResource
          }
          return null;
        });
        setSelected(selectedCopy);
        setRows(resourceCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const onToggleEditMode = (id, updateDb) => {
    setRows((state) => {
      return rows.map((resource) => {
        if (resource.id === id) {
          setPrevious({ "resource": resource })
          return { ...resource, isEditMode: !resource.isEditMode };
        }
        return resource;
      });
    });
    /* run axios api to update tasks on db here. */
    if (updateDb) {
      return axios.post(`api/tasks/${id}`, { task: row })
        .then(function(response) {
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const onChange = (e, resource, attr) => {
    if (!previous["resource"]) {
      setPrevious({ "resource": resource });
    }

    const value = e.target.value;

    const { id } = resource;
    const newResources = rows.map((resource) => {
      if (resource.id === id) {
        resource[attr] = value
        return resource;
      }
      return resource;
    });
    setRows(newResources);
  };

  const onRevert = (id) => {
    const newResources = rows.map((resource) => {
      if (resource.id === id) {
        resource.name = previous.resource.name
        resource.link = previous.resource.link
      }
      return resource;
    });
    setRows(newResources);
    setPrevious({});
    onToggleEditMode(id, false);
  };
  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell align="left">
        < Checkbox
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>

      <CustomTableCell
        {...{ row: row, name: row.name, onChange, attr: "name", type: "text" }}
      />
      <CustomTableCell
        {...{ row: row, name: row.name, onChange, attr: "link", type: "link" }}
      />
      <TableCell className={classes.selectTableCell}>
        {row.isEditMode ? (
          <>
            <IconButton
              aria-label="done"
              onClick={() => onToggleEditMode(row.id, true)}
            >
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            aria-label="edit"
            onClick={() => onToggleEditMode(row.id, false)}
          >
            <EditIcon />
          </IconButton>

        )}
      </TableCell>
      <TableCell align="left">
        {row.isEditMode ? (
          <IconButton
            aria-label="revert"
            onClick={() => onRevert(row.id)}
          >
            <RevertIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              if (window.confirm('Are you sure you want to delete?')) {
                deleteResource(row.id);
              }
            }}>
            <DeleteIcon />
          </IconButton>)}
      </TableCell>
    </TableRow>
  )
}