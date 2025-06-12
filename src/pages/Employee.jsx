import React from 'react'
import Esidebar from '../components/Esidebar'
import { NavLink } from 'react-router-dom';

const Employee = () => {
  return (
    <div className='employee-container'>
      <div className="sidebar-container">
        <Esidebar />
      </div>
      <div className="content-container">
        <div className="dashboard-content">
          <h1>Welcome to Job dekho start start posting</h1>
          <NavLink className='btn btn-primary button p-2 my-3 ' to='/Createjobs'> Start posting</NavLink>
          
          
        </div>
      </div>
    </div>
  );
};


export default Employee
