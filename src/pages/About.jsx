import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">About JobDekho</h1>
        <p className="lead text-muted">
          Connecting talented professionals with their dream opportunities since 2020
        </p>
      </div>

      {/* Mission Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <div 
            className="ratio ratio-16x9 rounded shadow"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">Our Mission</h2>
          <p className="mb-4">
            We're revolutionizing the job search process by creating meaningful connections between 
            companies and candidates through intelligent matching algorithms.
          </p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <span className="text-primary me-2">✓</span>
              Simplify the job search process
            </li>
            <li className="mb-2">
              <span className="text-primary me-2">✓</span>
              Provide valuable career resources
            </li>
            <li className="mb-2">
              <span className="text-primary me-2">✓</span>
              Build long-term professional relationships
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row text-center bg-light py-4 rounded shadow-sm mb-5">
        {[
          { value: '15K+', label: 'Jobs Posted' },
          { value: '50K+', label: 'Professionals Hired' },
          { value: '2K+', label: 'Companies' },
          { value: '95%', label: 'Satisfaction Rate' }
        ].map((stat, index) => (
          <div key={index} className="col-md-3">
            <h3 className="display-4 text-primary">{stat.value}</h3>
            <p className="text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Meet Our Team</h2>
        <div className="row">
          {[
            { name: 'Sarah Johnson', role: 'CEO & Founder', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Michael Chen', role: 'CTO', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Priya Patel', role: 'Head of Partnerships', img: 'https://randomuser.me/api/portraits/women/68.jpg' }
          ].map((member, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src={member.img} 
                  className="card-img-top rounded-top" 
                  alt={member.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{member.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{member.role}</h6>
                  <p className="card-text">
                    {member.role.includes('CEO') 
                      ? 'With 15 years in HR tech, founded JobConnect to transform hiring.' 
                      : member.role.includes('CTO') 
                        ? 'Leads our engineering team to build innovative matching algorithms.' 
                        : 'Connects top companies with our talented professionals.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div>
        <h2 className="text-center mb-4">Our Values</h2>
        <div className="row g-4">
          {[
            { icon: '👥', title: 'People First', text: 'We prioritize human connections over transactions.' },
            { icon: '💡', title: 'Innovation', text: 'Constantly evolving with cutting-edge technology.' },
            { icon: '🛡️', title: 'Integrity', text: 'Maintaining transparency in all our operations.' }
          ].map((value, index) => (
            <div key={index} className="col-md-4">
              <div className="p-4 text-center bg-light rounded h-100">
                <div className="mb-3" style={{ fontSize: '2rem' }}>{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;