/* React Libraries */
import React, { useState, useEffect } from "react";

/* Custom components */
import ResourceItem from './ResourceItem';
import CreateTaskForm from './CreateTaskForm';
import ListComponent from './ListComponent';

/* scss */
import '../../styles/TasksListComponent.scss';

/* Libraries */
const axios = require('axios');

export default function ResourceListComponent(props) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(`/api/resources/${props.userID}/${props.skillID}`)
      .then(response => {
        setResources(response.data);
        console.log(response)
      }).catch(error => console.log("ERROR: ", error));
  }, [resources]);

  /* make sure ids match db column names */
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Resource Name', align: "left", width: 210 },
    { id: 'link', numeric: false, disablePadding: false, label: 'Link', align: "left", width: 110 },
  ];

  const handleDelete = (selected, setSelected, resources, setResources) => {
    return axios.delete(`api/deliverables/?array=[${selected.toString()}]`, {})
      .then(function(response) {
        const resourceCopy = resources.filter((resource) => {
          if (!selected.includes(resource.id)) {
            return resource
          }
        });
        setSelected([]);
        setResources(resourceCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <ListComponent
      headCells={headCells}
      rows={resources}
      setRows={setResources}
      handleDelete={handleDelete}
      RowComponent={ResourceItem}
      CreateForm={CreateTaskForm}
      tableName="All Resources"
    />
  );
}

