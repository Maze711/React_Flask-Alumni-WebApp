import React from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { Logout } from "../../components/LogoutButton";
import { AlumniNavbar } from "../../components/NavBar";
import homeBgImage from "../../assets/img/home-background.png";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

return (
    <>
        <AlumniNavbar />
        <MDBCol sm="12" className="px-0 position-relative">
            <div className="overlay position-absolute top-0 start-0 h-100 d-flex flex-column align-items-left justify-content-center text-white" style={{ marginLeft: "130px" }}>
                <h3 className="mb-2" id="annoucement_title">
                    Alumni Reunion Event - 2022
                </h3>
                <p className="" id="annoucement_subtitle">
                    Class of 2022, It’s Time to Reunite! 🎉 Register Now for Our Upcoming Alumni Reunion!
                </p>
                <button style={{ width: "281px", height: "74px" }}>
                    Register Now
                </button>
            </div>

            <img
                src={homeBgImage}
                alt="Login image"
                className="w-100"
                style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    height: "calc(106vh - 55px)", // Adjust height to fill the page minus the navbar height
                }}
            />
        </MDBCol>

        <h1>Welcome, {user.full_name}</h1>
        <p>This is the home page for alumni.</p>

        <Logout />
    </>
);
};
