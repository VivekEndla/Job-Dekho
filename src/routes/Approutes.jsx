import React from 'react';
import { useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Joblisting from '../pages/Joblisting';
import { Routes, Route } from 'react-router-dom';
import Jobdetails from '../pages/Jobdetail';
import Logout from '../pages/Logout';
import JobCategory from '../pages/Jobcategory';
import ProtectedRoute from './Protectedroutes';
import Eregister from '../components/Eregister';
import Elogin from '../components/Elogin';
import Employee from '../pages/Employee';
import Employeeprofile from '../pages/Employeeprofile';
import Createjobs from '../pages/Createjobs';
import Postedjobs from '../pages/Postedjobs';
import Settings from '../pages/Settings';
import Esidebar from '../components/Esidebar';
import Profile from '../pages/Profile';

const Approutes = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  
  // List of paths where Navbar and Footer should be hidden
  const noNavbarFooterPaths = [
    '/eregister',
    '/elogin',
    '/employee',
    '/employeeprofile',
    '/createjobs',
    '/postedjobs',
    '/settings',
    '/profile'
  ];
  
  const shouldShowNavbarFooter = !noNavbarFooterPaths.includes(location.pathname);

  return (
    <div>
      {/* Show Navbar only if not in excluded paths */}
      {shouldShowNavbarFooter && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route path="/elogin" element={<Elogin />} />
        <Route path="/eregister" element={<Eregister />} />
        
        {/* Regular routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Protected regular user routes */}
        <Route 
          path="/joblisting" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Joblisting />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/logout" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/Jobcategory" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <JobCategory />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/jobs/:id" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Jobdetails />
            </ProtectedRoute>
          }
        />
        
        {/* Protected employee routes */}
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute isEmployeeRoute>
              <Employee />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/employeeprofile" 
          element={
            <ProtectedRoute isEmployeeRoute>
              <Employeeprofile />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/createjobs" 
          element={
            <ProtectedRoute isEmployeeRoute>
              <Createjobs />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/postedjobs" 
          element={
            <ProtectedRoute isEmployeeRoute>
              <Postedjobs />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute isEmployeeRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute isEmployeeRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
     
      {/* Show Footer only if not in excluded paths */}
      {shouldShowNavbarFooter && <Footer />}
    </div>
  );
};

export default Approutes;