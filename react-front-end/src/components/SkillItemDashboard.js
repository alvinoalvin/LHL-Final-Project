/* Custom Components */
import React from 'react';
import TasksListComponent from './TasksListComponent';
import '../styles/SkillItemDashboard.scss';
export default function SkillItemDashboard() {
  return (
    <div id="skill-item-container">
      <div >
        <TasksListComponent />
      </div>
      <div>
        <TasksListComponent />          
      </div>       
    </div>
  );
}