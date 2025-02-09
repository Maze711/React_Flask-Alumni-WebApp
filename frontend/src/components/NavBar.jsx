import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logout } from '../components/LogoutButton';
import plmunLogo from "../assets/img/Pamantasan_ng_Lungsod_ng_Muntinlupa_logo 2.png";

export const AlumniNavbar = () => {
    const [active, setActive] = useState("home");

    return (
        <Navbar expand="lg"  style={{ background: "linear-gradient(50deg, #193B02, #275004)"}} variant="dark">
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
                                    onClick={() => setActive(item)}
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
                    </Nav>

                    {/* Logout Button - Moves inside menu on mobile */}
                    <div className="d-lg-none text-center mt-3">
                        <Button style={{ backgroundColor: "transparent", border: "none" }}>
                            <Logout />
                        </Button>
                    </div>
                </Navbar.Collapse>

                {/* Logout Button (Desktop Only) */}
                <div className="d-none d-lg-block">
                    <Button style={{ backgroundColor: "transparent", border: "none"}}>
                        <Logout />
                    </Button>
                </div>
            </Container>
        </Navbar>
    );
};

export default AlumniNavbar;
