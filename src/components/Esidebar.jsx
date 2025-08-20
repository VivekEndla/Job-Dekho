import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";

const Esidebar = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    employeeName: "VIVEK",
    role: "WEB DEVELOPER",
  });

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const employee = JSON.parse(localStorage.getItem("employee")) || {};
    if (employee.employeeName || employee.role) {
      setEmployeeData({
        employeeName: employee.employeeName || "VIVEK",
        role: employee.role || "WEB DEVELOPER",
      });
    } else {
      const employeeId = localStorage.getItem("employeeId");
      if (employeeId) {
        fetch(
          `https://job-portal-data.onrender.com/employees?employeeId=${employeeId}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const emp = data[0];
              setEmployeeData({
                employeeName: emp.employeeName || "Employee",
                role: emp.role || "WEB DEVELOPER",
              });
              localStorage.setItem(
                "employee",
                JSON.stringify({
                  employeeName: emp.employeeName,
                  role: emp.role,
                })
              );
            }
          })
          .catch((error) =>
            console.error("Error fetching employee data:", error)
          );
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isEmployeeAuthenticated");
    localStorage.removeItem("employee");
    localStorage.removeItem("employeeId");
    navigate("/elogin");
  };

  return (
    <>
      {/* Toggle button visible only on small screens */}
      <div className="d-md-none p-2">
        <Button
          variant="light"
          onClick={() => setShowSidebar(true)}
          className="d-flex align-items-center shadow-sm"
          style={{ border: "1px solid #ccc" }}
        >
          <i
            className="bi bi-list text-dark"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </Button>
      </div>

      {/* Sidebar for medium+ screens */}
      <div
        className="sidebar d-none d-md-block p-3 bg-light border-end"
        style={{ minHeight: "100vh" }}
      >
        <div className="profile-section text-center">
          <Link to="/profile">
            <img
              src="./src/assets/boy.png"
              alt="Profile"
              className="profile-image mb-2 border border-2 border-primary"
              style={{
                cursor: "pointer",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
              }}
            />
          </Link>
          <h5 className="fw-bold text-dark">{employeeData.employeeName}</h5>
          <p className="text-secondary">{employeeData.role}</p>
        </div>

        <div className="sidebar-nav mt-4">
          <NavLink
            to="/postedjobs"
            className="btn btn-outline-primary w-100 mb-2 text-start"
          >
            <i className="bi bi-file-earmark-text me-2"></i> Posted Jobs
          </NavLink>
          <NavLink
            to="/createjobs"
            className="btn btn-primary w-100 mb-2 text-start"
          >
            <i className="bi bi-plus-circle me-2"></i> Create a Job
          </NavLink>
          <NavLink
            to="/settings"
            className="btn btn-outline-secondary w-100 mb-2 text-start"
          >
            <i className="bi bi-gear me-2"></i> Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 mt-3 text-start"
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>

      {/* Offcanvas for small screens */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Employee Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center mb-4">
            <Link to="/profile" onClick={() => setShowSidebar(false)}>
              <img
                src="./src/assets/boy.png"
                alt="Profile"
                className="border border-2 border-primary"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                }}
              />
            </Link>
            <h5 className="fw-bold text-dark">{employeeData.employeeName}</h5>
            <p className="text-secondary">{employeeData.role}</p>
          </div>

          <NavLink
            to="/postedjobs"
            className="btn btn-outline-primary w-100 mb-2 text-start"
            onClick={() => setShowSidebar(false)}
          >
            <i className="bi bi-file-earmark-text me-2"></i> Posted Jobs
          </NavLink>
          <NavLink
            to="/createjobs"
            className="btn btn-primary w-100 mb-2 text-start"
            onClick={() => setShowSidebar(false)}
          >
            <i className="bi bi-plus-circle me-2"></i> Create a Job
          </NavLink>
          <NavLink
            to="/settings"
            className="btn btn-outline-secondary w-100 mb-2 text-start"
            onClick={() => setShowSidebar(false)}
          >
            <i className="bi bi-gear me-2"></i> Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 mt-3 text-start"
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Esidebar;
