import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Esidebar = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    employeeName: 'VIVEK',
    role: 'WEB DEVELOPER'
  });

  useEffect(() => {
    // Fetch employee data from localStorage or API
    const employee = JSON.parse(localStorage.getItem('employee')) || {};
    
    // If employee data exists in localStorage, use it
    if (employee.employeeName || employee.role) {
      setEmployeeData({
        employeeName: employee.employeeName || 'VIVEK',
        role: employee.role || 'WEB DEVELOPER'
      });
    } else {
      // If not in localStorage, fetch from API using employeeId
      const employeeId = localStorage.getItem('employeeId');
      if (employeeId) {
        fetch(`https://job-portal-data.onrender.com/employees?employeeId=${employeeId}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              const emp = data[0];
              setEmployeeData({
                employeeName: emp.employeeName || 'Employee',
                role: emp.role || 'WEB DEVELOPER'
              });
              // Store in localStorage for future use
              localStorage.setItem('employee', JSON.stringify({
                employeeName: emp.employeeName,
                role: emp.role
              }));
            }
          })
          .catch(error => console.error('Error fetching employee data:', error));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isEmployeeAuthenticated');
    localStorage.removeItem('employee');
    localStorage.removeItem('employeeId');
    navigate('/elogin');
  };

  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-section">
      <div className="profile-image-container">
          <Link to="/profile">
            <img 
              src="./src/assets/boy.png" 
              alt="Profile" 
              className="profile-image"
              style={{ cursor: 'pointer' }} // Optional: show it's clickable
            />
          </Link>
      </div>
                <div className="profile-info">
          <h3 className="employee-name">{employeeData.employeeName}</h3>
          <p className="employee-role">{employeeData.role}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="sidebar-nav">
        <NavLink 
          to="/postedjobs" 
          className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
        >
          <i className="bi bi-file-earmark-text"></i> Posted Jobs
        </NavLink>
        
        <NavLink 
          to="/createjobs" 
          className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
        >
          <i className="bi bi-plus-circle"></i> Create a Job
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
        >
          <i className="bi bi-gear"></i> Settings
        </NavLink>
        <NavLink className="nav-button logout-button bi bi-box-arrow-right" to='/'>Logout</NavLink>
      </div>
    </div>
  );
};

export default Esidebar;  