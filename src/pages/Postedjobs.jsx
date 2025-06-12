import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Esidebar from '../components/Esidebar';

const Postedjobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const jobsPerPage = 3;
  const navigate = useNavigate();

  // Debounce searchTerm
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      const filtered = postedJobs.filter(job =>
        job.job_role.toLowerCase().includes(term) ||
        job.company_name.toLowerCase().includes(term) ||
        (Array.isArray(job.skills) &&
          job.skills.some(skill => skill.toLowerCase().includes(term)))
      );
      setFilteredJobs(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, postedJobs]);

  // Fetch jobs once
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`https://job-portal-data.onrender.com/newjobs?_=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setPostedJobs(data || []);
        setFilteredJobs(data || []);
      } catch (err) {
        console.error('Error loading job data:', err);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (jobId) => navigate(`/jobs/${jobId}`);

  const handleDeleteJob = async (jobId, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this job permanently?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`https://job-portal-data.onrender.com/newjobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Delete failed');

      setPostedJobs(prev => prev.filter(job => job.id !== jobId));
      setFilteredJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfLastJob - jobsPerPage, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const renderPagination = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        style={getPageBtnStyle(currentPage === 1)}
      >
        &laquo;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          style={getPageBtnStyle(currentPage === i + 1, true)}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={getPageBtnStyle(currentPage === totalPages)}
      >
        &raquo;
      </button>
    </div>
  );

  const getPageBtnStyle = (disabled, isActive = false) => ({
    padding: '5px 10px',
    margin: '0 5px',
    border: '1px solid #dee2e6',
    backgroundColor: disabled ? '#e9ecef' : isActive ? '#007bff' : 'white',
    color: isActive ? 'white' : 'black',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: '4px'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '250px', backgroundColor: '#343a40' }}>
        <Esidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search posted jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}
          />
          {searchTerm && (
            <div style={{ color: '#6c757d', marginTop: '5px' }}>
              Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching your search
            </div>
          )}
        </div>

        {/* Job Cards */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleJobClick(job.id)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <img
                    src={job.company_image}
                    alt={job.company_name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
                  />
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1.25rem' }}>{job.job_role}</h3>
                    <p style={{ color: '#6c757d', margin: '0' }}>{job.company_name}</p>
                  </div>
                </div>
                <p style={{ marginBottom: '15px' }}>{job.description}</p>
                <div style={{ marginBottom: '15px' }}>
                  {job.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        marginRight: '5px',
                        marginBottom: '5px',
                        fontSize: '0.875rem'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '10px',
                    borderTop: '1px solid #e9ecef',
                    paddingTop: '15px'
                  }}
                >
                  <div><strong>Location:</strong> {job.location}</div>
                  <div><strong>Salary:</strong> {job.salary}</div>
                  <div><strong>Type:</strong> {job.job_type}</div>
                  <div><strong>Experience:</strong> {job.experience_level}</div>
                  <div><strong>Posted:</strong> {job.posted_date}</div>
                </div>
                <button
                  onClick={(e) => handleDeleteJob(job.id, e)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '15px'
                  }}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '8px'
              }}
            >
              <h4 style={{ marginBottom: '15px' }}>
                {postedJobs.length === 0
                  ? "You haven't posted any jobs yet"
                  : "No jobs found matching your search criteria"}
              </h4>
              <button
                onClick={() => postedJobs.length === 0 ? navigate('/createjobs') : setSearchTerm('')}
                style={{
                  backgroundColor: postedJobs.length === 0 ? '#007bff' : 'transparent',
                  color: postedJobs.length === 0 ? 'white' : '#007bff',
                  border: postedJobs.length === 0 ? 'none' : 'none',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textDecoration: postedJobs.length === 0 ? 'none' : 'underline'
                }}
              >
                {postedJobs.length === 0 ? 'Create Your First Job Posting' : 'Clear search'}
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && renderPagination()}
      </div>
    </div>
  );
};

export default Postedjobs;
