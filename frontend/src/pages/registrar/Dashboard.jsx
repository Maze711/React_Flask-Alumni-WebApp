import React, { useEffect, useState } from "react";
import axios from "axios";
import { SideBar } from "../../components/RegistrarNav";

export const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const rowsPerPage = 10;

  const getAllUserData = async () => {
    try {
      const { data } = await axios.get("/fetch_all_users", {
        withCredentials: true,
      });

      const transformed = data.map((user) => ({
        ...user,
        full_name: `${user.last_name}, ${user.first_name} ${user.middle_name || ""} ${user.suffix || ""}`.trim(),
      }));

      setAllUsers(transformed);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setAllUsers([]);
    }
  };

  useEffect(() => {
    getAllUserData();
    
    // Handle responsive view detection
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalPages = Math.ceil(allUsers.length / rowsPerPage);

  const paginatedUsers = allUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      {/* SideBar - Only visible on desktop */}
      <SideBar />
      
      {/* Main Content Area with its own scrolling */}
      <main 
        className="flex-grow-1 bg-light" 
        style={{
          marginTop: isMobileView ? "56px" : 0, // Only add top margin on mobile for the fixed header
          width: isMobileView ? "100%" : "calc(100% - 260px)", // Adjust width based on sidebar presence
          minHeight: isMobileView ? "calc(100vh - 56px)" : "100vh",
          overflowY: "auto"
        }}
      >
        <div className="p-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
            <h4 className="mb-0">Alumni Users</h4>
            <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
              <div className="input-group">
                <span className="input-group-text bg-success text-white border-0">
                  <i className="bi bi-search"></i>
                </span>
                <input type="text" className="form-control" placeholder="Search Alumni" />
              </div>
              <div className="d-flex gap-2">
                <i className="bi bi-sliders fs-5 d-flex align-items-center"></i>
                <i className="bi bi-person-plus fs-5 d-flex align-items-center"></i>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-success text-center">
                <tr>
                  <th>ID</th>
                  <th>Alumni ID</th>
                  <th>Full Name</th>
                  <th>College Dept.</th>
                  <th className="d-none d-md-table-cell">Year Graduated</th>
                  <th className="d-none d-md-table-cell">Batch</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.ID}</td>
                      <td>{user.alumni_id}</td>
                      <td>{user.full_name}</td>
                      <td>{user.college_department}</td>
                      <td className="d-none d-md-table-cell">{user.year_graduated}</td>
                      <td className="d-none d-md-table-cell">{user.batch || "-"}</td>
                      <td>{user.role}</td>
                      <td>
                        <i className="bi bi-card-list"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No Records Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination pagination-sm flex-wrap mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  &lt;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
};