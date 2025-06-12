import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Joblisting = () => {
  const [joblists, setJoblists] = useState([]); // Job listings from db.json
  const [postedJobs, setPostedJobs] = useState([]); // Posted jobs (from another source, e.g., localStorage or another API)
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job listings (this could be from a server or db.json)
    fetch('https://job-portal-data.onrender.com')
      .then((res) => res.json())
      .then((data) => {
        setJoblists(data.joblists || []);
        setPostedJobs(data.newjobs || []); // Assuming "newjobs" are the posted jobs
        setFilteredJobs([...data.joblists, ...data.newjobs || []]); // Combine both job listings
      })
      .catch((err) => console.error('Error loading job data:', err));
  }, []);

  // Filter jobs based on search term
  useEffect(() => {
    const combinedJobs = [...joblists, ...postedJobs]; // Combine both job lists
    const filtered = combinedJobs.filter((job) =>
      job.job_role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, joblists, postedJobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleJobClick = (jobId) => {
    console.log('Navigating to job with ID:', jobId);
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh' }}>
      <div className="row g-0">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9 p-4">
          <div className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search jobs by role, company or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" type="button">
                <i className="bi bi-search"></i> Search
              </button>
            </div>
            {searchTerm && (
              <div className="mt-2 text-muted">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} matching your search
              </div>
            )}
          </div>

          <div className="row g-4">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <div className="col-12" key={job.id}>
                  <div
                    className="card h-100 shadow-sm hover-shadow cursor-pointer"
                    style={{ transition: 'transform 0.3s' }}
                    onClick={() => handleJobClick(job.id)}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={job.company_image}
                          alt={job.company_name}
                          className="me-3 rounded-circle"
                          width="50"
                          height="50"
                        />
                        <div>
                          <h5 className="card-title mb-1">{job.job_role}</h5>
                          <h6 className="card-subtitle text-muted">{job.company_name}</h6>
                        </div>
                      </div>
                      <p className="card-text">{job.description}</p>
                      <div className="mb-2">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="badge bg-primary me-1 mb-1">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><strong>Location:</strong> {job.location}</li>
                      <li className="list-group-item"><strong>Salary:</strong> {job.salary}</li>
                      <li className="list-group-item"><strong>Type:</strong> {job.job_type}</li>
                      <li className="list-group-item"><strong>Experience:</strong> {job.experience_level}</li>
                      <li className="list-group-item"><strong>Posted:</strong> {job.posted_date}</li>
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h4>No jobs found matching your search criteria</h4>
                <button
                  className="btn btn-link"
                  onClick={() => setSearchTerm('')}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {filteredJobs.length > 0 && (
            <nav aria-label="Job pagination" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={prevPage} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>

                {pageNumbers.map((number) => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <button onClick={() => paginate(number)} className="page-link">
                      {number}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={nextPage} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Joblisting;
