import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
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
    middle_name: "",
    suffix: "",
    gender: "",
    birthdate: "",
    email: "",
    address: "",
    number: "",
    password: "",
    confirm_Pass: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value); // Debug: see what is being updated
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const requiredFields = [
      "last_name",
      "first_name",
      "middle_name",
      "gender",
      "birthdate",
      "email",
      "address",
      "number",
      "password",
      "confirm_Pass",
    ];

    const fieldsEmpty = requiredFields.some(
      (field) => !input[field] || input[field].trim() === ""
    );
    if (fieldsEmpty) {
      toast.error("Please fill up all required fields!");
      return;
    }

    if (input.password !== input.confirm_Pass) {
      toast.error("Passwords do not match!");
      return;
    }

    const signupData = {
      last_name: input.last_name,
      first_name: input.first_name,
      middle_name: input.middle_name,
      suffix: input.suffix,
      gender: input.gender,
      birthdate: input.birthdate,
      email: input.email,
      address: input.address,
      number: input.number,
      password: input.password,
    };

    try {
      const data = await registerUser(signupData);
      console.log("Registered user data:", data);
      toast.success("Signup Successful!");
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.error ||
          "Something went wrong, please check your connection and signup again"
      );
    }
  };

  return (
    <MDBContainer fluid>
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
              Welcome Alumni!
            </span>
          </div>

          <form
            className="d-flex flex-column justify-content-center align-items-center h-custom-2 pt-3"
            style={{ maxHeight: "90vh" }}
            onSubmit={handleSignup}
          >
            <h3 className="fw-bold mb-3 pb-3">SIGNUP</h3>

            <div
              className="overflow-auto h-100 px-3 py-2"
              style={{ maxHeight: "90vh" }}
            >
              <MDBRow className="mb-3">
                <MDBCol md="3">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    Last Name
                  </label>
                  {/* Use native input for reliability */}
                  <input
                    name="last_name"
                    value={input.last_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>

                <MDBCol md="3">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    First Name
                  </label>
                  <input
                    name="first_name"
                    value={input.first_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>

                <MDBCol md="3">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    M.I.
                  </label>
                  <input
                    name="middle_name"
                    value={input.middle_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>

                <MDBCol md="3">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    Suffix (Optional)
                  </label>
                  <select
                    name="suffix"
                    value={input.suffix}
                    onChange={handleChange}
                    className="form-select"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                      height: "38px",
                    }}
                  >
                    <option value="">None</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                  </select>
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="4">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={input.gender}
                    onChange={handleChange}
                    className="form-select"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                      height: "38px",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </MDBCol>
                <MDBCol md="4">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    Birthdate
                  </label>
                  <input
                    name="birthdate"
                    value={input.birthdate}
                    onChange={handleChange}
                    type="date"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>
                <MDBCol md="4">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol md="6">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    Address
                  </label>
                  <input
                    name="address"
                    value={input.address}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>
                <MDBCol md="6">
                  <label
                    className="mb-1 fw-bold align-self-start"
                    style={{ color: "rgba(33, 71, 3, 1)" }}
                  >
                    Number
                  </label>
                  <input
                    name="number"
                    value={input.number}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="6">
                  <label className="mb-1 fw-bold align-self-start" style={{ color: "rgba(33, 71, 3, 1)" }}>
                    Password
                  </label>
                  <input
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>
                <MDBCol md="6">
                  <label className="mb-1 fw-bold align-self-start" style={{ color: "rgba(33, 71, 3, 1)" }}>
                    Confirm Password
                  </label>
                  <input
                    name="confirm_Pass"
                    value={input.confirm_Pass}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 1)",
                    }}
                  />
                </MDBCol>
              </MDBRow>
            </div>
            <input
              type="submit"
              className="rounded my-3 w-50 p-3 text-white fw-bold border-0 outline-0 fs-5"
              id="signup-button"
              style={{ backgroundColor: "rgba(33, 71, 3, 1)" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(45, 99, 4, 1)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(33, 71, 3, 1)")}
              value={"Sign up"}
            />
          </form>
        </MDBCol>

        <MDBCol sm="5" className="d-none d-sm-block px-0 position-relative">
          <div
            className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white"
            style={{ backgroundColor: "rgba(13, 41, 1, 0.70)" }}
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

