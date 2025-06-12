  import React from 'react';

  const Sidebar = () => {
    return (
      <div
        className="p-4 bg-light h-100"
        style={{
          position: 'sticky',
          top: 0,
          borderRight: '1px solid #dee2e6',
          overflowY: 'auto'
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Filters</h5>
          <button className="btn btn-sm btn-outline-secondary">Reset All</button>
        </div>

        

        {/* Location */}
        <div className="mb-4">
          <label className="form-label fw-bold">Location</label>
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="City or country"
          />
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="remote" />
            <label className="form-check-label" htmlFor="remote">Remote Only</label>
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-4">
          <label className="form-label fw-bold">Experience Level</label>
          <div className="ms-2">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exp" id="entry" />
              <label className="form-check-label" htmlFor="entry">Entry (0-2 yrs)</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exp" id="mid" />
              <label className="form-check-label" htmlFor="mid">Mid (3-5 yrs)</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exp" id="senior" />
              <label className="form-check-label" htmlFor="senior">Senior (5+ yrs)</label>
            </div>
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="form-label fw-bold">Job Type</label>
          <div className="ms-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="fulltime" />
              <label className="form-check-label" htmlFor="fulltime">Full-time</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="contract" />
              <label className="form-check-label" htmlFor="contract">Contract</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="internship" />
              <label className="form-check-label" htmlFor="internship">Internship</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="parttime" />
              <label className="form-check-label" htmlFor="parttime">Part-time</label>
            </div>
          </div>
        </div>

        {/* Salary Range */}
        <div className="mb-4">
          <label className="form-label fw-bold">Salary Range (₹/year)</label>
          <div className="d-flex align-items-center mb-2">
            <input type="number" className="form-control me-2" placeholder="Min" />
            <span>to</span>
            <input type="number" className="form-control ms-2" placeholder="Max" />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="form-label fw-bold">Skills</label>
          <div className="ms-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="python" />
              <label className="form-check-label" htmlFor="python">Python</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="javascript" />
              <label className="form-check-label" htmlFor="javascript">JavaScript</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="java" />
              <label className="form-check-label" htmlFor="java">Java</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="react" />
              <label className="form-check-label" htmlFor="react">React</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="nodejs" />
              <label className="form-check-label" htmlFor="nodejs">Node.js</label>
            </div>
          </div>
        </div>

        {/* Company Size */}
        <div className="mb-4">
          <label className="form-label fw-bold">Company Size</label>
          <select className="form-select" id="companySize">
            <option value="">Any size</option>
            <option value="small">Small (1–50)</option>
            <option value="medium">Medium (51–200)</option>
            <option value="large">Large (201+)</option>
          </select>
        </div>

        {/* Date Posted */}
        <div className="mb-4">
          <label className="form-label fw-bold">Date Posted</label>
          <select className="form-select" id="datePosted">
            <option value="">Any time</option>
            <option value="last24hrs">Last 24 hours</option>
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
          </select>
        </div>

        {/* Popular Tags */}
        <div className="mb-4">
          <label className="form-label fw-bold">Popular Tags</label>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-light text-dark border">Remote</span>
            <span className="badge bg-light text-dark border">Frontend</span>
            <span className="badge bg-light text-dark border">Backend</span>
            <span className="badge bg-light text-dark border">Fullstack</span>
            <span className="badge bg-light text-dark border">DevOps</span>
            <span className="badge bg-light text-dark border">AI/ML</span>
          </div>
        </div>

        {/* Save Search Button */}
        <button className="btn btn-primary w-100 mt-3">
          <i className="bi bi-save me-2"></i>Save Search
        </button>
      </div>
    );
  };

  export default Sidebar;