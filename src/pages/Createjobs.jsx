import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Esidebar from '../components/Esidebar';

const Createjobs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: '',
    job_role: '',
    skills: [],
    location: '',
    salary: '',
    description: '',
    job_type: '',
    experience_level: '',
    posted_date: new Date().toISOString().split('T')[0],
    company_image: '',
    about_company: '',
    job_highlights: [],
    responsibilities: [],
    requirements: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const [tempSkill, setTempSkill] = useState('');
  const [tempHighlight, setTempHighlight] = useState('');
  const [tempResponsibility, setTempResponsibility] = useState('');
  const [tempRequirement, setTempRequirement] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleArrayInput = (type, value, setValue) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], value.trim()],
    }));
    setValue('');
  };

  const removeArrayItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.company_name) newErrors.company_name = 'Company name is required';
    if (!formData.job_role) newErrors.job_role = 'Job role is required';
    if (!formData.skills.length) newErrors.skills = 'At least one skill is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.job_type) newErrors.job_type = 'Job type is required';
    if (!formData.experience_level) newErrors.experience_level = 'Experience level is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const jobWithId = { ...formData, id: Date.now().toString() };
      const response = await fetch('https://job-portal-data.onrender.com/newjobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobWithId),
      });
      if (!response.ok) throw new Error('Failed to create job');
      alert('Job created successfully!');
      navigate('/postedjobs');
    } catch (error) {
      setServerError(error.message || 'Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderArrayField = (label, tempValue, setTempValue, arrayKey) => (
    <div style={{ marginBottom: '15px' }}>
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder={`Add ${label.toLowerCase()}`}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="button" onClick={() => handleArrayInput(arrayKey, tempValue, setTempValue)}>Add</button>
      </div>
      <div style={{ marginTop: '5px' }}>
        {formData[arrayKey].map((item, index) => (
          <span key={index} style={{ marginRight: '8px', background: '#0d6efd', color: '#fff', padding: '5px 10px', borderRadius: '20px', display: 'inline-block' }}>
            {item}
            <button onClick={() => removeArrayItem(arrayKey, index)} style={{ marginLeft: '8px', background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>×</button>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '250px', borderRight: '1px solid #ddd' }}>
        <Esidebar />
      </div>
      <div style={{ flex: 1, padding: '30px' }}>
        <div style={{ background: '#fff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <div style={{ backgroundColor: '#0d6efd', color: '#fff', padding: '20px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Create New Job Posting</h2>
          </div>
          <div style={{ padding: '20px' }}>
            {serverError && <div style={{ color: 'red' }}>{serverError}</div>}
            <form onSubmit={handleSubmit}>
              {/* Basic Info */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Company Name</label>
                  <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                  {errors.company_name && <div style={{ color: 'red' }}>{errors.company_name}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label>Job Role</label>
                  <input type="text" name="job_role" value={formData.job_role} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                  {errors.job_role && <div style={{ color: 'red' }}>{errors.job_role}</div>}
                </div>
              </div>

              {renderArrayField('Skills', tempSkill, setTempSkill, 'skills')}

              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                  {errors.location && <div style={{ color: 'red' }}>{errors.location}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label>Salary</label>
                  <input type="text" name="salary" value={formData.salary} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '8px' }} />
                {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Job Type</label>
                  <select name="job_type" value={formData.job_type} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                    <option value="">Select job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                  {errors.job_type && <div style={{ color: 'red' }}>{errors.job_type}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label>Experience Level</label>
                  <select name="experience_level" value={formData.experience_level} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                    <option value="">Select experience level</option>
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                  {errors.experience_level && <div style={{ color: 'red' }}>{errors.experience_level}</div>}
                </div>
              </div>

              {/* Additional Arrays */}
              {renderArrayField('Highlights', tempHighlight, setTempHighlight, 'job_highlights')}
              {renderArrayField('Responsibilities', tempResponsibility, setTempResponsibility, 'responsibilities')}
              {renderArrayField('Requirements', tempRequirement, setTempRequirement, 'requirements')}

              <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '20px' }} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Job'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createjobs;
