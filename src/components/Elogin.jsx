import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Elogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    employeeId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!loginData.employeeId || !loginData.password) {
        throw new Error('Both fields are required');
      }

      const response = await fetch(
        `https://job-portal-data.onrender.com/employees?employeeId=${loginData.employeeId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }

      const employees = await response.json();

      if (employees.length === 0) {
        throw new Error('Employee ID not found');
      }

      const employee = employees[0];

      if (employee.password !== loginData.password) {
        throw new Error('Incorrect password');
      }

      localStorage.setItem('isEmployeeAuthenticated', 'true');
      localStorage.setItem(
        'employee',
        JSON.stringify({
          id: employee.id,
          employeeName: employee.employeeName,
          employeeId: employee.employeeId,
          company: employee.company,
          role: employee.role,
        })
      );

      navigate('/employee');
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Employee Login</h2>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    name="employeeId"
                    value={loginData.employeeId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-2">
                Don't have an account?{' '}
                <NavLink to="/eregister" className="text-primary">
                  Register here
                </NavLink>
              </p>
              {/* Back to Home Button */}
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate('/')}
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elogin;
