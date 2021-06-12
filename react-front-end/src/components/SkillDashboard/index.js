/* Custom Components */
import React, { useEffect, useContext } from 'react';
import TasksList from './TasksList';
import ResourceList from './ResourceList';
import NotesList from './Notes';
import CustomProgressBar from './progressBar';
import '../../styles/SkillItemDashboard.scss';
import { authContext } from '../../providers/AuthProvider';
import { useLocation } from "react-router-dom";

const axios = require('axios');

export default function SkillDashboard() {
  const { id } = useContext(authContext);
  const location = useLocation();
  const skillID = location.state.skillId;

  const userID = id;

  const [skill, setSkill] = React.useState("");

  useEffect(() => {
    axios.get(`/api/skills`)
      .then(response => {
        setSkill(response.data.find(x => x.id === skillID).name);
      }).catch(error => console.log(error));
  }, [skillID]);


  return (
    <div id="skill-item-container">
      <div id="dashboardHeader"><h1>{skill}</h1></div>
      <div class="resources">
        <ResourceList
          key={skillID}
          skillID={skillID}
          userID={userID}
        />
      </div>
      <div class="tasks">
        <TasksList
          key={skillID}
          skillID={skillID}
          userID={userID}
        />
      </div>
      <div class="notes">
        <NotesList
          key={skillID}
          skillID={skillID}
          userID={userID}
        />
      </div>
      <div class="progressCont">
        <CustomProgressBar />
      </div>
    </div>
  );
}