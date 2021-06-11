/* Custom Components */
import React from 'react';
import TasksList from './TasksList';
import ResourceList from './ResourceList';
import '../../styles/SkillItemDashboard.scss';
export default function SkillDashboard() {
  const skillID = 1;
  const userID = 1;
  return (
    <div id="skill-item-container">
      <div id="dashboardHeader"><h1>Ruby on Rails</h1></div>
      <TasksList
        key={skillID}
        skillID={skillID}
        userID={userID}
      />
      <div class="progress"> <h3> Progress bar</h3></div>
      <div class="notes"> <h3> notes</h3></div>
      <div class="resources">
        <ResourceList
          key={skillID}
          skillID={skillID}
          userID={userID}
        />
      </div>
    </div>
  );
}