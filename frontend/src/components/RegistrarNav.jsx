import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import plmunLogo from "../assets/img/Pamantasan_ng_Lungsod_ng_Muntinlupa_logo 2.png";

export const SideBar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();

  // Get current path to highlight active nav item
  const currentPath = location.pathname;

  // Handle responsive view and click outside
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event) => {
      const isToggleButton = event.target.closest(".navbar-toggler");
      const isInsideMenu = event.target.closest(".mobile-menu");
      
      if (!isToggleButton && !isInsideMenu && isDropdownVisible) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!isDropdownVisible);
  };
  
  // Check if a path is active
  const isActive = (path) => {
    return currentPath === path;
  };

  // Mobile Header
  if (isMobileView) {
    return (
      <header className="navbar navbar-dark fixed-top" style={{
        background: "linear-gradient(100deg, #193B02, #275004)",
        zIndex: 1030
      }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={plmunLogo} alt="Logo" className="me-2" style={{ height: "40px" }} />
            <div>
            <h1 className="mb-0" id="alumni" style={{ fontSize: "24px" }}>Alumni</h1>
            <p className="mb-0 small">PLMUN</p>
            </div>
          </Link>

          <button
            className="navbar-toggler border-0"
            onClick={toggleDropdown}
            aria-expanded={isDropdownVisible}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className={`mobile-menu w-100 bg-success ${isDropdownVisible ? "show" : ""}`}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            maxHeight: isDropdownVisible ? "500px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease-out",
            zIndex: 1020
          }}
        >
          <div className="d-flex flex-column">
            {[
              { path: "/registrar", label: "INTERNAL USERS", bold: true },
              { path: "/profile", label: "PROFILE" },
              { path: "/registrar/department", label: "DEPARTMENT" }, // Updated path
              { path: "/about", label: "ABOUT" },
              { path: "/logout", label: "LOG OUT" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white text-decoration-none p-3 ${item.bold ? "fw-bold" : ""} ${isActive(item.path) ? "bg-success-dark" : ""}`}
                onClick={() => setDropdownVisible(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="text-white d-flex flex-column" style={{
      width: "260px",
      background: "linear-gradient(to bottom, #193B02 10%, #275004 100%)",
      minHeight: "100vh",
      position: "sticky",
      top: 0,
      zIndex: 900
    }}>
      <div className="mb-4 text-center p-3">
        <div className="mx-auto mb-2 d-flex align-items-center justify-content-center">
          <img src={plmunLogo} alt="Logo" style={{ height: "60px" }} />
        </div>
        <h1 className="mb-0" id="alumni" style={{ fontSize: "24px" }}>Alumni</h1>
        <p className="mb-0 small">PLMUN</p>
      </div>

      <nav className="nav flex-column px-3 mb-auto">
        {[
          { 
            path: "/registrar", 
            label: "INTERNAL USERS", 
            style: isActive("/registrar") ? "btn-success fw-bold" : "btn-outline-light" 
          },
          { 
            path: "/profile", 
            label: "PROFILE", 
            style: isActive("/profile") ? "btn-success fw-bold" : "btn-outline-light" 
          },
          { 
            path: "/registrar/department", // Updated path
            label: "DEPARTMENT", 
            style: isActive("/registrar/department") ? "btn-success fw-bold" : "btn-outline-light" 
          },
          { 
            path: "/about", 
            label: "ABOUT", 
            style: isActive("/about") ? "btn-success fw-bold" : "btn-outline-light" 
          }
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`btn mb-3 text-start rounded-pill py-2 border-0 ${item.style}`}
            style={item.style.includes("success") ? { boxShadow: "0 4px 8px rgba(0,0,0,0.2)" } : {}}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 text-center">
        <Link to="/logout" className="btn btn-outline-light rounded-pill px-4 border-0">
          LOG OUT
        </Link>
      </div>
    </aside>
  );
};