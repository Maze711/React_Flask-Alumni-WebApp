import React, { useState } from "react";
import { SideBar } from "../../components/RegistrarNav";
import { CreateAnnouncementModal } from "../../components/CreateAnn";

export const RegistrarDepartment = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("Published");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dummy announcement data
  const announcements = [
    {
      id: 1,
      title: "Alumni Reunion Event 2025",
      description:
        "Class of 2022, It’s Time to Reunite! 🎉 Register Now for Our Upcoming Alumni...",
      visibility: "CITCS",
      date: "March 6, 2025",
      reactions: 1365,
      comments: "March 6, 2025",
      status: "Published",
      image: "/announcement1.png", // Just example images
    },
    {
      id: 2,
      title: "Releasing of Diploma",
      description: "The Diplomas of 2023-2024 graduates are now available...",
      visibility: "CITCS",
      date: "March 6, 2025",
      reactions: 5156,
      comments: "March 10, 2025",
      status: "Draft",
      image: "/announcement2.png",
    },
  ];

  // Filter announcements based on Published/Drafts
  const filteredAnnouncements = announcements.filter(
    (a) => a.status === filter
  );

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <SideBar />

      <div
        className="flex-grow-1"
        style={{ backgroundColor: "#faf9f8", padding: "30px 40px" }}
      >
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="#666"
            />
          </svg>
          <span style={{ marginLeft: "10px", color: "#333", fontSize: "20px" }}>
            Registrars Username
          </span>
        </div>

        {/* Tabs */}
        <div className="d-flex mb-4" style={{ borderBottom: "2px solid #ccc" }}>
          <div
            className="me-4 pb-2"
            style={{
              borderBottom: "3px solid #275004",
              fontWeight: "bold",
              color: "#275004",
            }}
          >
            Announcements
          </div>
          <div className="me-4 pb-2" style={{ color: "#666" }}>
            Events
          </div>
          <div className="pb-2" style={{ color: "#666" }}>
            Polls
          </div>
        </div>

        {/* Actions Box */}
        <div
          className="p-4 mb-4"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ccc",
            textAlign: "center",
            color: "#555",
          }}
        >
          We’ll let you know if you have active announcements to respond to.
        </div>

        {/* Announcements Section */}
        <div
          className="p-4"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          {/* Top Controls */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* Search Bar */}
            <div style={{ position: "relative", width: "250px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                style={{
                  paddingLeft: "35px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <svg
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                }}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14Z"
                  fill="#666"
                />
              </svg>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2 align-items-center position-relative">
              {/* Published Button with Dropdown */}
              <div className="position-relative">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#275004",
                    color: "white",
                    padding: "8px 16px",
                  }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {filter} ▼
                </button>

                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                      marginTop: "5px",
                      width: "100%",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      onClick={() => {
                        setFilter("Published");
                        setDropdownOpen(false);
                      }}
                      className="dropdown-item"
                      style={{ padding: "10px 20px", cursor: "pointer" }}
                    >
                      Published
                    </div>
                    <div
                      onClick={() => {
                        setFilter("Draft");
                        setDropdownOpen(false);
                      }}
                      className="dropdown-item"
                      style={{ padding: "10px 20px", cursor: "pointer" }}
                    >
                      Drafts
                    </div>
                  </div>
                )}
              </div>

              {/* Create Announcement Button */}
              <button
                className="btn"
                style={{
                  backgroundColor: "#275004",
                  color: "white",
                  padding: "8px 16px",
                }}
                onClick={() => setShowModal(true)}
              >
                Create Announcement
              </button>
            </div>
          </div>

          {/* Table Headers */}
          <div
            className="d-flex py-2"
            style={{ fontWeight: "bold", color: "#555" }}
          >
            <div style={{ width: "40px" }}></div>
            <div style={{ flex: 2 }}>Announcements</div>
            <div style={{ width: "120px" }}>Visibility</div>
            <div style={{ width: "120px" }}>Date</div>
            <div style={{ width: "100px" }}>Reactions</div>
            <div style={{ width: "100px" }}>Comments</div>
          </div>

          {/* Announcement List */}
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="d-flex align-items-center py-3"
                style={{ borderBottom: "1px solid #eee" }}
              >
                <div style={{ width: "40px" }}>
                  <input type="checkbox" className="form-check-input" />
                </div>
                <div style={{ flex: 2 }} className="d-flex align-items-center">
                  <img
                    src={announcement.image}
                    alt="Announcement"
                    style={{
                      width: "60px",
                      height: "40px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold" }}>
                      {announcement.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "#777" }}>
                      {announcement.description}
                    </div>
                  </div>
                </div>
                <div style={{ width: "120px" }}>{announcement.visibility}</div>
                <div style={{ width: "120px" }}>{announcement.date}</div>
                <div style={{ width: "100px" }}>{announcement.reactions}</div>
                <div style={{ width: "100px" }}>{announcement.comments}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-5" style={{ color: "#999" }}>
              No announcements to show.
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CreateAnnouncementModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
