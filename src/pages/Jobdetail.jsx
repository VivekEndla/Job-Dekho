import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Jobdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching job with ID:', id);
    fetch('/db.json')
      .then((res) => res.json())
      .then((data) => {
        // Compare as strings since IDs are strings in db.json
        const foundJob = data.joblists.find(j => j.id === id);
        console.log('Found job:', foundJob);
        if (!foundJob) {
          console.error('Job not found with id:', id);
          navigate('/not-found');
        }
        setJob(foundJob);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading job data:', err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  if (!job) {
    return <div className="container py-5 text-center">Job not found</div>;
  }

  return (
    <div className="container py-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-primary mb-4"
      >
        ← Back to Jobs
      </button>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <img
              src={job.company_image}
              alt={job.company_name}
              className="me-3 rounded-circle"
              width="80"
              height="80"
            />
            <div>
              <h1 className="h3 mb-1">{job.job_role}</h1>
              <h2 className="h5 text-muted mb-2">{job.company_name}</h2>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">{job.location}</span>
                <span className="badge bg-success">{job.job_type}</span>
                <span className="badge bg-info">{job.experience_level}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <h3 className="h5 mb-3">Job Description</h3>
              <p className="mb-4">{job.description}</p>

              <h3 className="h5 mb-3">Responsibilities</h3>
              <ul className="mb-4">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>

              <h3 className="h5 mb-3">Requirements</h3>
              <ul className="mb-4">
                {job.requirements.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h4 className="h6 card-title">Job Highlights</h4>
                  <ul className="list-unstyled">
                    {job.job_highlights.map((highlight, index) => (
                      <li key={index} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h4 className="h6 card-title">About {job.company_name}</h4>
                  <p>{job.about_company}</p>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary">Apply Now</button>
                    <button className="btn btn-outline-secondary">Save Job</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobdetails;