export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          
          <div className="col-md-6 mb-3 mb-md-0">
            <h5>About Us</h5>
            <p className="small">
              We provide premium services like mock interviews, AI resume building, and professional courses to help you achieve your career goals.
            </p>
          </div>

          <div className="col-md-3 mb-3 mb-md-0">
            <h5>Services</h5>
            <ul className="list-unstyled small">
              <li>Mock Interviews</li>
              <li>AI Resume Builder</li>
              <li>Courses</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled small">
              <li>Email: info@example.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Location: Hyderabad, India</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} Premium Services. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

