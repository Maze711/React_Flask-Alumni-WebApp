import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from '../components/LogoutButton';
import plmunLogo from "../assets/img/Pamantasan_ng_Lungsod_ng_Muntinlupa_logo 2.png";

export const AlumniNavbar = () => {
    const [active, setActive] = useState("home");
    const currentLocation = useLocation().pathname.split("/")[1]; // gets the current location
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();

    useEffect(() => {
        // Set the active state if the current location changes
        setActive(currentLocation);
    }, [currentLocation]);

    // Handles navigation item clicks and updates the active state
    const handleNavClick = (item) => {
        const target = item === "home" && user.role === "DEAN" ? "/admin" : `/${item}`;
        navigate(target);
        setActive(item);
    };

    return (
        <Navbar expand="lg" fixed="top" style={{ background: "linear-gradient(100deg, #193B02, #275004)"}} variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img
                        src={plmunLogo}
                        alt="Logo"
                        className="me-2"
                        style={{ height: "55px" }}
                    />
                    <div className="text-start">
                        <h1 className="mb-0" id="alumni" style={{ fontSize: "24px" }}>Alumni</h1>
                        <p className="mb-0 small">PLMUN</p>
                    </div>
                </Navbar.Brand>

                {/* Toggle Button for Mobile View */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar Links & Logout Button */}
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="d-flex flex-column flex-lg-row align-items-lg-center gap-4 mx-auto">
                        {["home", "profile", "about"].map((item) => (
                            <div key={item} className="text-center">
                                <Nav.Link
                                    as={Link}
                                    to={`/${item}`}
                                    className="text-uppercase"
                                    style={{
                                        fontWeight: active === item ? "bold" : "normal",
                                        position: "relative",
                                        paddingBottom: "5px",
                                        transition: "none",
                                        color: "white"
                                    }}
                                    onClick={() => handleNavClick(item)}
                                >
                                    {item}
                                </Nav.Link>
                                {active === item && (
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "5px",
                                            backgroundColor: "white",
                                            borderRadius: "50%",
                                            margin: "auto",
                                        }}
                                    ></div>
                                )}
                            </div>
                        ))}
                        {(user.role === "DEAN" || user.role === "ADMIN") && (
                            <div className="text-center">
                                <Nav.Link
                                    as={Link}
                                    to="/admin"
                                    className="text-uppercase"
                                    style={{
                                        fontWeight: active === "admin" ? "bold" : "normal",
                                        position: "relative",
                                        paddingBottom: "5px",
                                        transition: "none",
                                        color: "white"
                                    }}
                                    onClick={() => setActive("admin")}
                                >
                                    Dashboard
                                </Nav.Link>
                                {active === "admin" && (
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "5px",
                                            backgroundColor: "white",
                                            borderRadius: "50%",
                                            margin: "auto",
                                        }}
                                    ></div>
                                )}
                            </div>
                        )}
                    </Nav>

                    {/* Logout Button - Moves inside menu on mobile */}
                    <div className="d-lg-none text-center mt-3">
                        <Logout />
                    </div>
                </Navbar.Collapse>

                {/* Logout Button (Desktop Only) */}
                <div className="d-none d-lg-block">
                    <Logout />
                </div>
            </Container>
        </Navbar>
    );
};

export default AlumniNavbar;