import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children, isEmployeeRoute = false }) => {
  const isEmployeeAuthenticated = localStorage.getItem('isEmployeeAuthenticated');
  
  if (isEmployeeRoute) {
    if (!isEmployeeAuthenticated) {
      return <Navigate to="/elogin" replace />;
    }
    return children;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;