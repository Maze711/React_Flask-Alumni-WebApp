import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import bgImage from "../assets/img/login-background.png";
import plmunLogo from "../assets/img/Pamantasan_ng_Lungsod_ng_Muntinlupa_logo 2.png";

export const Login = () => {
  const navigate = useNavigate();

  const { loginUser } = useAuthContext();

  const [input, setInput] = useState({
    alumni_id: "",
    password: "",
  });

  // Handles the onSubmit from login form
  const handleLogin = async (event) => {
    event.preventDefault();
    const { alumni_id, password } = input;

    try {
      const data = await loginUser(alumni_id, password);
      setInput({ alumni_id: "", password: "" }); // Reset input fields
      const user_role = data.role;
      // routes the user to specific page based on their role
      navigate(user_role === "DEAN" ? "/admin" : "/home");
      toast.dismiss();
      toast.success(data.message);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Something went wrong, please check your connection and login again");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        {/* Left side container with background image, logo, and system name */}
        <MDBCol sm="7" className="d-none d-sm-block px-0 position-relative">
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

        {/* right side container with the login form */}
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

          <form
            className="d-flex flex-column justify-content-center align-items-center h-custom-2 w-75 pt-3"
            onSubmit={handleLogin}
          >
            <h3 className="fw-bold mb-3 pb-3">LOGIN</h3>
            <label
              className="mb-1 fw-bold align-self-start"
              style={{ color: "rgba(33, 71, 3, 1)" }}
            >
              Alumni ID
            </label>
            <MDBInput
              wrapperClass="mb-3 mx-5 w-100"
              type="text"
              style={{
                backgroundColor: "rgba(217, 217, 217, 1)",
              }}
              value={input.alumni_id}
              onChange={(e) =>
                setInput({ ...input, alumni_id: e.target.value })
              }
            />

            {/* <label
              className="mb-1 fw-bold align-self-start"
              style={{ color: "rgba(33, 71, 3, 1)" }}
            >
              College
            </label>
            <select
              className="form-select mb-3 mx-5 w-100"
              aria-label="Default select example"
              style={{
                backgroundColor: "rgba(217, 217, 217, 1)",
              }}
            >
              <option defaultValue={'DEFAULT'}>Select a College</option>
              <option value="1">{"Bachelor of Science in Computer Science (CS)"}</option>
              <option value="2">{"Bachelor of Science in Information Technology (IT)"}</option>
              <option value="3">{"Associate in Computer Technology (ACT)"}</option>
            </select> */}

            <label
              className="mb-1 fw-bold align-self-start"
              style={{ color: "rgba(33, 71, 3, 1)" }}
            >
              Password
            </label>
            <MDBInput
              wrapperClass="mb-3 mx-5 w-100"
              type="password"
              style={{
                backgroundColor: "rgba(217, 217, 217, 1)",
              }}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />

            <input
              type="submit"
              className="rounded my-3 w-50 p-3 text-white fw-bold border-0 outline-0 fs-5"
              id="login-button"
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
              value={"Log in"}
            />
            <div
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
              }}
            >
              Don't Have Account Yet?{" "}
              <span
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Sign Up here!
              </span>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
