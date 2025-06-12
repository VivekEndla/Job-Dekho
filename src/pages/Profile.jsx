import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Esidebar from '../components/Esidebar';

const Profile = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeName: '',
    role: '',
    email: '',
    phone: '',
    profilePic: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('employee'));

    if (stored?.employeeId) {
      fetch(`https://job-portal-data.onrender.com/employees?employeeId=${stored.employeeId}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            setEmployee(prev => ({
              ...prev,
              ...data[0]
            }));
          }
        })
        .catch(err => console.error('Failed to fetch employee:', err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployee(prev => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    fetch(`https://job-portal-data.onrender.com/employees/${employee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    })
      .then(res => res.json())
      .then(() => {
        localStorage.setItem('employee', JSON.stringify(employee));
        setIsEditing(false);
      })
      .catch(err => console.error('Failed to save:', err));
  };

  const handleBack = () => navigate(-1);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        <Esidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: '30px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: '1px solid #eee',
            paddingBottom: '15px'
          }}>
            <h2 style={{ margin: 0 }}>Employee Profile</h2>
            <button onClick={handleBack} style={{
              backgroundColor: 'transparent',
              border: '1px solid #6c757d',
              color: '#6c757d',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              ← Back
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img
              src={employee.profilePic || './src/assets/boy.png'}
              alt="Profile"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #007bff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            />
          </div>

          {['employeeName', 'role', 'email', 'phone'].map(field => (
            <div key={field} style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#495057'
              }}>
                {field === 'employeeName' ? 'Name' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                name={field}
                value={employee[field] || ''}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  backgroundColor: isEditing ? 'white' : '#f8f9fa'
                }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            {isEditing ? (
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
