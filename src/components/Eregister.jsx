import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Eregister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const checkResponse = await fetch('https://job-portal-data.onrender.com/employees');

      if (!checkResponse.ok) {
        throw new Error('Failed to check employee ID');
      }

      const existingEmployees = await checkResponse.json();
      const employeeExists = existingEmployees.some(
        emp => emp.employeeId === formData.employeeId
      );

      if (employeeExists) {
        throw new Error('Employee ID already exists');
      }

      const response = await fetch('https://job-portal-data.onrender.com/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeName: formData.employeeName,
          employeeId: formData.employeeId,
          company: formData.company,
          role: formData.role,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          createdAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register employee');
      }

      const data = await response.json();
      console.log('Employee registered:', data);
      alert('Registration successful!');
      navigate('/Elogin');
    } catch (error) {
      console.error('Registration error:', error);
      setServerError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Employee Registration</h2>
            </div>
            <div className="card-body">
              {serverError && (
                <div className="alert alert-danger" role="alert">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="employeeName" className="form-label">Employee Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.employeeName ? 'is-invalid' : ''}`}
                    id="employeeName"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                  />
                  {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">Employee ID</label>
                  <input
                    type="text"
                    className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                  />
                  {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="company" className="form-label">Company</label>
                  <input
                    type="text"
                    className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                  {errors.company && <div className="invalid-feedback">{errors.company}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role</label>
                  <input
                    type="text"
                    className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Enter your role (e.g., Developer, Manager, HR)"
                  />
                  {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : 'Register'}
                  </button>
                  <NavLink to="/Elogin" className="btn btn-outline-primary">
                    Already have an account? Login
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eregister;
