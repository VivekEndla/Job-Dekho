import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Make sure Bootstrap JS is imported

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const collapseRef = useRef(null);

  const handleLog = () => {
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
    closeNavbar();
  };

  const closeNavbar = () => {
    const collapse = collapseRef.current;
    if (collapse && collapse.classList.contains('show')) {
      // Bootstrap 5 collapse toggle
      const bsCollapse = window.bootstrap.Collapse.getInstance(collapse);
      bsCollapse?.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex align-items-center fw-bold fs-3 text-danger">
          JOBDEKHO
        </NavLink>

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

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup" ref={collapseRef}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={isLoggedIn ? '/Joblisting' : '/login'}
                onClick={closeNavbar}
              >
                Findjob
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2 mt-3 mt-lg-0">
            <NavLink className="btn btn-outline-light" to="/Eregister" onClick={closeNavbar}>
              Employee
            </NavLink>
            <button className="btn btn-outline-light" onClick={handleLog}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
