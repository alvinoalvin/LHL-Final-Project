/* Custom Components */
import React, { useEffect, useContext, useState } from 'react';
import TasksList from './Tasks/TasksList';
import ResourceList from './Resources/ResourceList';
import NotesList from './Notes/Notes';
import StagedList from './Staged/StagedList';
import CustomProgressBar from './Progress/progressBar';
import '../../styles/SkillItemDashboard.scss';
import { authContext } from '../../providers/AuthProvider';
import { useLocation } from "react-router-dom";

import {
  Link
} from "react-router-dom";

const axios = require('axios');


export default function SkillDashboard() {
  const { id } = useContext(authContext);
  const location = useLocation();
  const skillID = location.state ? location.state.skillId : undefined;

  const userID = id;

  const [skill, setSkill] = React.useState("");
  const [resources, setResources] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [stagedDeliv, setStagedDeliv] = useState([]);

  document.title = skill;

  useEffect(() => {
    axios.get(`/api/skills`)
      .then(response => {
        setSkill(response.data.find(x => x.id === parseInt(skillID)).name);
      }).catch(error => console.log(error));
  }, [skillID]);


  useEffect(() => {
    axios.get(`/api/tasks/${userID}/${skillID}`)
      .then(response => {
        setTasks(response.data);
      }).catch(error => console.log(error));
  }, [userID, skillID]);

  useEffect(() => {
    axios.get(`/api/resources/${userID}/${skillID}`)
      .then(response => {
        setResources(response.data);
      }).catch(error => console.log(error));
  }, [userID, skillID]);

  useEffect(() => {
    axios.get(`/api/deliverables/${userID}/${skillID}/staged`)
      .then(response => {
        setStagedDeliv(response.data);
      }).catch(error => console.log(error));
  }, [userID, skillID]);

  return (<>
    {
      skillID === undefined ? (
        <div id="skill-item-container" style={{ margin: 0 }}>
          <Link to="/">
            {'Skill not selected, please click here to go back to home page'}
          </Link>
        </div>
      ) : (
        <div id="skill-item-container">
          <div id="dashboardHeader"><h1>{skill}</h1></div>
          <div className="progressCont">
            <CustomProgressBar
              skillID={skillID}
              userID={userID}
            />
          </div>
          <div className="staging">
            <StagedList
              skillID={skillID}
              userID={userID}
              stagedDeliv={stagedDeliv}
              setStagedDeliv={setStagedDeliv}
              tasks={tasks}
              setTasks={setTasks}
              resources={resources}
              setResources={setResources}
            />
          </div>
          <div className="notes">
            <NotesList
              key={skillID}
              skillID={skillID}
              userID={userID}
            />
          </div>
          <div className="resources">
            <ResourceList
              key={skillID}
              skillID={skillID}
              userID={userID}
              resources={resources}
              setResources={setResources}
            />
          </div>
          <div className="tasks">
            <TasksList
              key={skillID}
              skillID={skillID}
              userID={userID}
              tasks={tasks}
              setTasks={setTasks}
            />
          </div>
        </div>)
    }</>
  );
}