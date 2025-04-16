import React, { useState } from "react";
import UserAddIcon from "../assets/icon/user_add_ico.svg";

export const AddAlumniModal = ({ onClose, onSave }) => {
  const [alumni, setAlumni] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    sex: "",
    college: "",
    yearGraduated: "",
    batch: "",
    studentId: "",
    alumniId: "",
  });

  const [showRequestList, setShowRequestList] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumni({ ...alumni, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(alumni);
    onClose();
  };

  return (
    <div
      className="modal d-flex align-items-center justify-content-center"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
        overflowY: "auto",
      }}
    >
      <div className="modal-dialog modal-lg">
        <div
          className="modal-content position-relative"
          style={{ maxHeight: "90vh", display: "flex", flexDirection: "column" }}
        >
          {/* Modal Header */}
          <div className="modal-header bg-success text-white d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <img src={UserAddIcon} alt="User Icon" width={24} height={24} />
              <h5 className="modal-title mb-0">Adding Alumni's</h5>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={() => setShowRequestList(!showRequestList)}
              >
                Request List
              </button>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body overflow-auto" style={{ flex: 1 }}>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" name="lastName" value={alumni.lastName} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" name="firstName" value={alumni.firstName} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Middle Name</label>
                  <input type="text" className="form-control" name="middleName" value={alumni.middleName} onChange={handleChange} />
                </div>
                <div className="col-md-1">
                  <label className="form-label">Suffix</label>
                  <input type="text" className="form-control" name="suffix" value={alumni.suffix} onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Sex</label>
                  <select className="form-select" name="sex" value={alumni.sex} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">College</label>
                  <select className="form-select" name="college" value={alumni.college} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Year Graduated</label>
                  <select className="form-select" name="yearGraduated" value={alumni.yearGraduated} onChange={handleChange}>
                    <option value="">Select</option>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Batch</label>
                  <select className="form-select" name="batch" value={alumni.batch} onChange={handleChange}>
                    <option value="">Select</option>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">Student ID</label>
                  <input type="text" className="form-control" name="studentId" value={alumni.studentId} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Alumni ID</label>
                  <input type="text" className="form-control" name="alumniId" value={alumni.alumniId} onChange={handleChange} />
                </div>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer bg-light border-top">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-success" onClick={handleSubmit}>
              Save
            </button>
          </div>

          {/* Overlay Panel for Request List */}
          {showRequestList && (
            <div
              className="position-absolute top-0 end-0 bg-white shadow rounded-start border border-success"
              style={{
                width: "300px",
                height: "100%",
                zIndex: 1051,
                overflowY: "auto",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <strong>Request List</strong>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setShowRequestList(false)}
                >
                  Close
                </button>
              </div>
              <div className="p-3">
                <input type="text" className="form-control mb-3" placeholder="Search..." />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};