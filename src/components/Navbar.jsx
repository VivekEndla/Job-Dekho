import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLog = () => {
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center fw-bold fs-3 text-danger">
          JOBDEKHO
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={isLoggedIn ? '/Joblisting' : '/login'}>
                Findjob
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Employee Button */}
          <div className='d-flex gap-2 mt-3 mt-lg-0'>
            <div >
            <NavLink className="btn btn-outline-light" to="/Eregister">
              Employee
            </NavLink>
          </div>

          {/* Login / Logout Button */}
          <div >
            <button className="btn btn-outline-light" onClick={handleLog}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
