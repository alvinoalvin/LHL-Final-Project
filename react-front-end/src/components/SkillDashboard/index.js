/* Custom Components */
import React, { useEffect } from 'react';
import TasksList from './TasksList';
import ResourceList from './ResourceList';
import NotesList from './Notes';
import '../../styles/SkillItemDashboard.scss';
const axios = require('axios');

export default function SkillDashboard() {
  const skillID = 1;
  const userID = 1;
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
        <NotesList />
      </div>

    </div>
  );
}