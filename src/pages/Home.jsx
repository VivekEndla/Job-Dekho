import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Marquee from "react-fast-marquee";
import JobCategory from "./Jobcategory";

const Home = () => {
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://job-portal-data.onrender.com/joblists"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      // ✅ data is already an array
      if (Array.isArray(data)) {
        setPostsList(data);
      } else {
        throw new Error("Data format is incorrect");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div className="position-relative">
        <img
          src="/assets/9984338.jpg"
          alt="Banner"
          className="img-fluid w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
      </div>

      {/* Marquee */}
      <div className="slider my-5">
        <h1 className="text-center mb-4">Our Top Companies</h1>
        <Marquee pauseOnHover={true} speed={100}>
          <img src="/assets/amazon.jpeg" alt="amazon" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/cisco.png" alt="cisco" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/coco.png" alt="coco" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/ibm.png" alt="ibm" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/meta.jpeg" alt="meta" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/shell.jpeg" alt="shell" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/sony.png" alt="sony" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/uni.jpeg" alt="unilever" style={{ width: "150px", margin: "0 30px" }} />
          <img src="/assets/visa.jpeg" alt="visa" style={{ width: "150px", margin: "0 30px" }} />
        </Marquee>
      </div>

      {/* Job Categories */}
      <div>
        <h1 className="text-center mb-4">Job Categories</h1>
        <JobCategory />
      </div>

      {/* Premium Services Section */}
      <div className="container py-5">
        <h1 className="text-center mb-5">Our Premium Services</h1>
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ transition: "transform 0.3s" }}>
              <div className="card-body text-center">
                <div className="mb-3" style={{ fontSize: "40px", color: "#0d6efd" }}>🎤</div>
                <h5 className="card-title mb-3">Mock Interviews</h5>
                <p className="card-text text-muted">
                  Practice real-time interviews with professionals and boost your confidence before the big day.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ transition: "transform 0.3s" }}>
              <div className="card-body text-center">
                <div className="mb-3" style={{ fontSize: "40px", color: "#198754" }}>🧠</div>
                <h5 className="card-title mb-3">AI Resume Builder</h5>
                <p className="card-text text-muted">
                  Build modern, optimized resumes that pass ATS filters with our intelligent resume builder.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ transition: "transform 0.3s" }}>
              <div className="card-body text-center">
                <div className="mb-3" style={{ fontSize: "40px", color: "#6f42c1" }}>📚</div>
                <h5 className="card-title mb-3">Courses</h5>
                <p className="card-text text-muted">
                  Access top-notch courses and learn in-demand skills to stay ahead in your career journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .hover-shadow:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }
        `}</style>
      </div>

      {/* Featured Jobs Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Jobs</h2>

        {isLoading && <p className="text-center">Loading jobs...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row">
          {postsList.slice(0, 3).map((job) => {
            const {
              id,
              job_role,
              skills,
              company_name,
              location,
              salary,
              description,
              posted_date,
              company_image,
            } = job;

            return (
              <NavLink key={id} className="col-md-4 mb-4 nav-link" to={"/Joblisting"}>
                <div className="card h-100 shadow-sm border-0 hover-shadow mx-2" style={{ transition: "transform 0.3s" }}>
                  <div className="header d-flex justify-content-between align-items-center">
                    <div className="m-3">
                      <h5 className="card-title">{job_role}</h5>
                      <h6>{company_name}</h6>
                    </div>
                    <img
                      src={company_image}
                      alt={`${company_name} logo`}
                      className="company-logo m-3"
                      id="company-logo"
                    />
                  </div>

                  <div className="card-body">
                    <p>
                      <span className="mx-2">
                        <i className="bi bi-currency-rupee"></i> {salary}
                      </span>{" "}
                      |{" "}
                      <span className="mx-2">
                        <i className="bi bi-geo-alt"></i> {location}
                      </span>
                    </p>

                    <p className="card-text">
                      {description.length > 100
                        ? description.slice(0, 103) + "..."
                        : description}
                    </p>

                    <p>
                      <b>
                        <i className="bi bi-clipboard2-plus"></i>
                        <span className="mx-2">Skills Required</span>
                      </b>
                    </p>
                    <p className="card-text">
                      {skills.length > 3
                        ? skills.slice(0, 3).join(", ") + "..."
                        : skills.join(", ")}
                    </p>

                    <div className="d-flex justify-content-between">
                      <p>{posted_date}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/joblisting")}>
            View More Jobs
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
