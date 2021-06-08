/* Custom Components */
import React from 'react';
import TasksListComponent from './TasksListComponent';
import '../styles/SkillItemDashboard.scss';
export default function SkillItemDashboard() {
  return (
    <div id="skill-item-container">
      <div id="dashboardHeader"><h1>Ruby on Rails</h1></div>
      <TasksListComponent />
      <div class="progress"> <h3> Progress bar</h3></div>
      <div class="notes"> <h3> notes</h3></div>
      <div class="resources"> <h3> Resources</h3></div>
    </div>
  );
}