import React, { useEffect, useState } from "react";
import axios from "axios";
import { SideBar } from "../../components/RegistrarNav";
import { FilterContent } from "../../components/Filter";
import { AddAlumniModal } from "../../components/AddUser";
import { ViewUserModal } from "../../components/ViewUser";
// Import SVG files
import FilterIcon from "../../assets/icon/filter_ico.svg";
import SearchIcon from "../../assets/icon/search_ico.svg";
import UserAddIcon from "../../assets/icon/user_add_ico.svg";
import UserViewIcon from "../../assets/icon/user_view.svg";
import UserIcon from "../../assets/icon/user_ico.svg";

export const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showAddAlumniModal, setShowAddAlumniModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;

  const getAllUserData = async () => {
    try {
      const { data } = await axios.get("/fetch_all_users", {
        withCredentials: true,
      });

      const transformed = data.map((user) => ({
        ...user,
        full_name: `${user.last_name || ""}, ${user.first_name || ""} ${
          user.middle_name || ""
        } ${user.suffix || ""}`.trim(),
      }));

      setAllUsers(transformed);
      setFilteredUsers(transformed);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setAllUsers([]);
      setFilteredUsers([]);
    }
  };

  const handleUpdateUser = async (alumniId, userData) => {
    try {
      // You'll need to implement this endpoint on your backend
      await axios.put(`/update_user`, {
        alumni_id: alumniId,
        ...userData
      }, {
        withCredentials: true,
      });
      getAllUserData(); // Refresh the user list
      setShowViewModal(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(user => 
        (user.full_name && user.full_name.toLowerCase().includes(term)) || 
        (user.alumni_id && user.alumni_id.toString().toLowerCase().includes(term)) ||
        (user.college_department && user.college_department.toLowerCase().includes(term))
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page on search
  };

  useEffect(() => {
    getAllUserData();

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
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
      <SideBar />

      <main
        className="flex-grow-1 bg-light"
        style={{
          marginTop: isMobileView ? "56px" : 0,
          width: isMobileView ? "100%" : "calc(100% - 260px)",
          minHeight: isMobileView ? "calc(100vh - 56px)" : "100vh",
          overflowY: "auto",
        }}
      >
        <div className="p-4">
          {/* Header with Alumni Icon */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src={UserIcon}
                alt="Alumni"
                style={{ width: "24px", height: "24px" }}
              />
              <h4 className="mb-0 fw-bold">Alumni Users</h4>
            </div>

            {/* Search and Action Buttons */}
            <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3">
              <div className="input-group" style={{ width: "250px" }}>
                <span className="input-group-text bg-white border-end-0">
                  <img
                    src={SearchIcon}
                    alt="Search"
                    style={{ width: "18px", height: "18px" }}
                  />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search Alumni"
                  style={{ paddingLeft: "5px" }}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-light border d-flex align-items-center gap-1 px-3 py-2"
                  onClick={() => setShowFilter(true)}
                >
                  <img
                    src={FilterIcon}
                    alt="Filter"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span>Filter</span>
                </button>
                <button
                  className="btn btn-success d-flex align-items-center gap-1 px-3 py-2"
                  onClick={() => setShowAddAlumniModal(true)}
                >
                  <img
                    src={UserAddIcon}
                    alt="Add User"
                    style={{
                      width: "16px",
                      height: "16px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                  <span>Add Alumni</span>
                </button>
              </div>
            </div>
          </div>

          {/* Add Alumni Modal */}
          {showAddAlumniModal && (
            <AddAlumniModal
              onClose={() => setShowAddAlumniModal(false)}
              onAddSuccess={() => {
                getAllUserData(); // Refresh all data to ensure consistency
                setShowAddAlumniModal(false);
              }}
            />
          )}

          {/* Filter Modal */}
          {showFilter && (
            <div
              className="modal"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Filter Alumni</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowFilter(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <FilterContent
                      onFilterApply={(filteredData) => {
                        setFilteredUsers(filteredData);
                        setShowFilter(false);
                        setCurrentPage(1); // Reset to first page when filtering
                      }}
                      initialData={allUsers}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {showViewModal && (
            <ViewUserModal
              isOpen={showViewModal}
              onClose={() => setShowViewModal(false)}
              onSave={handleUpdateUser}
              userId={selectedUserId}
            />
          )}

          {/* Table */}
          <div className="table-responsive rounded-3 overflow-hidden border">
            <table className="table table-hover mb-0">
              <thead className="bg-success text-white">
                <tr>
                  <th className="ps-4">#</th>
                  <th>Alumni ID</th>
                  <th>Full Name</th>
                  <th>College Dept.</th>
                  <th className="d-none d-md-table-cell">Year Graduated</th>
                  <th className="d-none d-md-table-cell">Batch</th>
                  <th>Role</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="ps-4">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td>{user.alumni_id}</td>
                      <td>{user.full_name}</td>
                      <td>{user.college_department || "-"}</td>
                      <td className="d-none d-md-table-cell">
                        {user.year_graduated || "-"}
                      </td>
                      <td className="d-none d-md-table-cell">
                        {user.batch || "-"}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "DEAN" ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          {user.role || "-"}
                        </span>
                      </td>
                      <td className="pe-4">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            setSelectedUserId(user.alumni_id);
                            setShowViewModal(true);
                          }}
                        >
                          <img
                            src={UserViewIcon}
                            alt="View"
                            style={{ width: "16px", height: "16px" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
              Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to{" "}
              {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} entries
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage === totalPages || totalPages === 0 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};