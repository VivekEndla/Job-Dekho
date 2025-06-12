import React from 'react';
import { NavLink } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="container py-5">
      <div className="row">
        {/* Left Side - Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div 
            className="h-100 rounded shadow" 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px'
            }}
          >
           
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-4">Contact Us</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Your name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Your email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select className="form-select" id="subject">
                    <option>General Inquiry</option>
                    <option>Job Posting</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Your message"></textarea>
                </div>
                <NavLink  to='/' className='btn btn-primary w-100 py-2'>
                  Send Message
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;