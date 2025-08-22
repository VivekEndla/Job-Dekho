import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Esidebar from "../components/Esidebar";

const Profile = () => {
  const navigate = useNavigate();

  // ✅ Default values (keys match inputs below)
  const defaultEmployee = {
    employeeName: "Vivek",
    role: "Fullstack",
    email: "endlavivek81@gmail.com",
    phone: "9652201105",
    profilePic: "https://via.placeholder.com/150", // dummy image
  };

  const [employee, setEmployee] = useState(defaultEmployee);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Load from localStorage if available
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employee"));
    if (stored) {
      setEmployee(stored);
    }
  }, []);

  // ✅ Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployee((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Save to localStorage only
  const handleSave = () => {
    localStorage.setItem("employee", JSON.stringify(employee));
    setIsEditing(false);
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="d-md-flex">
      <div>
        <Esidebar />
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "30px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
              borderBottom: "1px solid #eee",
              paddingBottom: "15px",
            }}
          >
            <h2 style={{ margin: 0 }}>Employee Profile</h2>
            <button
              onClick={handleBack}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #6c757d",
                color: "#6c757d",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>

          {/* Profile Picture */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src={employee.profilePic}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #007bff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            />
            {isEditing && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>

          {/* Form fields */}
          {["employeeName", "role", "email", "phone"].map((field) => (
            <div key={field} style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#495057",
                }}
              >
                {field === "employeeName"
                  ? "Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                value={employee[field] || ""}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  backgroundColor: isEditing ? "white" : "#f8f9fa",
                }}
              />
            </div>
          ))}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            {isEditing ? (
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
