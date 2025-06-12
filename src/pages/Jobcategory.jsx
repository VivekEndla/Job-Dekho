const jobCategories = [
  {
    id: 1,
    logo: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    jobCategory: "Software Development"
  },
  {
    id: 2,
    logo: "https://cdn-icons-png.flaticon.com/512/3011/3011270.png",
    jobCategory: "Data Science"
  },
  {
    id: 3,
    logo: "https://cdn-icons-png.flaticon.com/512/906/906175.png",
    jobCategory: "Project Management"
  },
  {
    id: 4,
    logo: "https://cdn-icons-png.flaticon.com/512/1821/1821060.png",
    jobCategory: "UI/UX Design"
  },
  {
    id: 5,
    logo: "https://cdn-icons-png.flaticon.com/512/1684/1684375.png",
    jobCategory: "Network Engineering"
  },
  {
    id: 6,
    logo: "https://cdn-icons-png.flaticon.com/512/906/906334.png",
    jobCategory: "Digital Marketing"
  },
  {
    id: 7,
    logo: "https://cdn-icons-png.flaticon.com/512/4149/4149643.png",
    jobCategory: "Cybersecurity"
  },
  {
    id: 8,
    logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    jobCategory: "Human Resources"
  },
  {
    id: 9,
    logo: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
    jobCategory: "Finance and Accounting"
  },
  {
    id: 10,
    logo: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
    jobCategory: "Content Writing"
  },
  {
    id: 11,
    logo: "https://cdn-icons-png.flaticon.com/512/2885/2885432.png",
    jobCategory: "Sales and Business Development"
  },
  {
    id: 12,
    logo: "https://cdn-icons-png.flaticon.com/512/2736/2736180.png",
    jobCategory: "Customer Support"
  },
];
const JobCategory = () => {
  return (
    <div className="container">
      <div className="row">
        {jobCategories.map((category) => (
          <div key={category.id} className="col-md-2 col-sm-6 mb-4">
            <div className="card h-100 text-center p-3 hover-shadow">
              <img 
                src={category.logo} 
                alt={category.jobCategory} 
                className="card-img-top mx-auto d-block" 
                style={{width: '80px', height: '80px', objectFit: 'contain'}}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{category.jobCategory}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategory;