import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import bgImage from "../assets/img/login-background.png";
import plmunLogo from "../assets/img/Pamantasan_ng_Lungsod_ng_Muntinlupa_logo 2.png";

export const Signup = () => {
  const navigate = useNavigate();

  const { registerUser } = useAuthContext();

  const [input, setInput] = useState({
    last_name: "",
    first_name: "",
    middle_initial:"",
    suffix:"",
    college: "",
    student_ID: "",
    grad_year: "",
    password: "",
    confirm_Pass: "",
  });
  
  const handleSignup = async (event) => {
    event.preventDefault();
 
    //Check if the inputs are empty
    if(Object.values(input).some(value => value === "")) {
        toast.error("Please fill up all fields!");
        return;
    }
    
    //check if the password and confirm pass are the same
    if(input.password !== input.confirm_Pass) {
        toast.error("Passwords do not match!");
        return;
    }
  
    try {
      const data = await registerUser(input);
      console.log("Registered user data:", data)
      toast.success("Signup Successfull!");
      navigate("/Login")
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Something went wrong, please check your connection and signup again");
    }
  }
  

  return (
    <MDBContainer fluid>
        {/* left side container with the sign up form */}
        <MDBRow>
        <MDBCol
          sm="3"
          className="d-flex flex-column align-items-center justify-content-center min-vh-100 flex-grow-1"
        >
          <div className="d-flex flex-row">
            <span
              className="h1 text-center fw-bold"
              style={{ color: "rgba(33, 71, 3, 1)" }}
            >
              Welcome Almuni!
            </span>
          </div>   
          
<form className="d-flex flex-column justify-content-center align-items-center h-custom-2  pt-3"
style={{ maxHeight: "90vh" }} onSubmit = {handleSignup}>

<h3 className="fw-bold mb-3 pb-3">SIGNUP</h3>    

<div className = "overflow-auto h-100 px-3 py-2 "
style={{maxHeight: "90vh"}}>


<MDBRow className="mb-3">
  <MDBCol md="3">
    <label
     className="mb-1 fw-bold align-self-start"
     style={{ color: "rgba(33, 71, 3, 1)" }}>Last Name</label>
    <MDBInput 
      name ="last_name"
      value = {input.last_name}
      type="text" 
      style={{
      backgroundColor: "rgba(217, 217, 217, 1)",
      }}/>
  </MDBCol>

  <MDBCol md="3">
    <label
     className="mb-1 fw-bold align-self-start"
     style={{ color: "rgba(33, 71, 3, 1)" }}>First Name</label>
    <MDBInput
     name="first_name" 
     value = {input.first_name}
     type="text"
     style={{
     backgroundColor: "rgba(217, 217, 217, 1)",
     }}/>
  </MDBCol>

  <MDBCol md="3">
    <label
    className="mb-1 fw-bold align-self-start"
    style={{ color: "rgba(33, 71, 3, 1)" }}>M.I.</label>
    <MDBInput 
     name="middle_initial"
     value = {input.middle_initial}
     type="text"
     style={{
    backgroundColor: "rgba(217, 217, 217, 1)",
    }} />
  </MDBCol>

  <MDBCol md="3">
    <label
    className="mb-1 fw-bold align-self-start"
    style={{ color: "rgba(33, 71, 3, 1)" }}>
    Suffix</label>
    <MDBInput 
     name="suffix"
     value = {input.suffix}
     type="text"
     style={{
     backgroundColor: "rgba(217, 217, 217, 1)",
     }} />
  </MDBCol>
</MDBRow>

<MDBRow className="mb-3">
  <MDBCol md="4">
    <label
     className="mb-1 fw-bold align-self-start"
     style={{ color: "rgba(33, 71, 3, 1)" }}>College</label>
    <MDBInput 
     name="college"
     value = {input.college}
     type="text"
     style={{
     backgroundColor: "rgba(217, 217, 217, 1)",
     }} />
  </MDBCol>
  <MDBCol md="4">
    <label
     className="mb-1 fw-bold align-self-start"
     style={{ color: "rgba(33, 71, 3, 1)" }}>Student ID</label>
    <MDBInput
     name="student_ID"
     value = {input.student_ID}
     type="text"
     style={{
     backgroundColor: "rgba(217, 217, 217, 1)",
     }} />
  </MDBCol>
  <MDBCol md="4">
    <label
     className="mb-1 fw-bold align-self-start"
     style={{ color: "rgba(33, 71, 3, 1)" }}>Graduation Year</label>
    <MDBInput
     name="grad_year"
     value = {input.grad_year}
     type="text"
     style={{
     backgroundColor: "rgba(217, 217, 217, 1)",
     }} />
  </MDBCol>
</MDBRow>

<MDBRow className="mb-3">
  <MDBCol md="6">
    <label className="mb-1 fw-bold align-self-start"
     style={{ color: "rgba(33, 71, 3, 1)" }}>Password</label>
    <MDBInput 
     name = "password"
     value = {input.password}
     type="password"
     style={{
     backgroundColor: "rgba(217, 217, 217, 1)",
     }} />
  </MDBCol>
  <MDBCol md="6">
    <label className="mb-1 fw-bold align-self-start"
     style={{ color: "rgba(33, 71, 3, 1)" }}>Confirm Password</label>
    <MDBInput
     name= "confirm_Pass"
     value = {input.confirm_Pass}
     type="password"
     style={{
     backgroundColor: "rgba(217, 217, 217, 1)",
     }} />
  </MDBCol>
</MDBRow>
</div>
   <input
              type="submit"
              className="rounded my-3 w-50 p-3 text-white fw-bold border-0 outline-0 fs-5"
              id="signup-button"
              style={{
                backgroundColor: "rgba(33, 71, 3, 1)",
              }}
              // For hovering effects
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(45, 99, 4, 1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(33, 71, 3, 1)")
              }
              value={"Sign up"}
    />
</form>

        </MDBCol>
        
        {/* Left side container with background image, logo, and system name */}
        <MDBCol sm="5" className="d-none d-sm-block px-0 position-relative">
          <div
            className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white"
            style={{
              backgroundColor: "rgba(13, 41, 1, 0.70)",
            }}
          >
            <img src={plmunLogo} alt="Logo" style={{ width: "150px" }} />
            <h3 className="mb-2" id="alumni">
              Alumni
            </h3>
            <p className="text-center fw-bold fs-3 w-200">
              PAMANTASAN NG LUNGSOD NG MUNTINLUPA
            </p>
          </div>

          <img
            src={bgImage}
            alt="Login image"
            className="w-100"
            style={{
              objectFit: "cover",
              objectPosition: "left",
              height: "100vh",
            }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

