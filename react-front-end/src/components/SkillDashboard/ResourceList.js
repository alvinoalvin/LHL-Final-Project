/* React Libraries */
import React, { useState, useEffect } from "react";

/* Custom components */
import ResourceItem from './ResourceItem';
import CreateResourceForm from './CreateResourceForm';
import ListComponent from './ListComponent';

/* scss */
import '../../styles/TasksListComponent.scss';

/* Libraries */
const axios = require('axios');

export default function ResourceListComponent(props) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // console.log("ResourceList")
    axios.get(`/api/resources/${props.userID}/${props.skillID}`)
      .then(response => {
        setResources(response.data);
        console.log(response.data)
      }).catch(error => console.log(error));
  }, []);

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
      CreateForm={CreateResourceForm}
      tableName="All Resources"
      addName={"Add Resource"}
      userID={props.userID}
      skillID={props.skillID}
      numRows={5}
    />
  );
}

