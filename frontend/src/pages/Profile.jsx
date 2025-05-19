import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { SideBar as RegistrarNav } from "../components/RegistrarNav";
import { AlumniNavbar } from "../components/NavBar";

export const Profile = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const alumni_id = userData?.alumni_id;
  const [user, setUser] = useState({});

  // Auth check for logged in users
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const getUserProfile = async () => {
    // Replace with your actual API call
    // Example:
    // const { data } = await axios.post("/fetch_user_profile", { alumni_id });
    // return data;
    return {
      last_name: "Doe",
      first_name: "John",
      middle_name: "A.",
      suffix: "",
      job_title: "Registrar",
      role: userData?.role,
      alumni_id: alumni_id,
      email: "john.doe@example.com",
      gender: "Male",
      number: "1234567890",
      address: "123 Main St",
      college_department: "Registrar Office",
      year_graduated: "N/A",
      civil_status: "Single",
      work_status: "Active",
    };
  };

  // Fetch all the user data based on the alumni_id
  useEffect(() => {
    getUserProfile()
      .then((data) => setUser(data))
      .catch(() => setUser({}));
  }, []);

  // Determine which navbar to use
  const role = userData?.role?.toLowerCase();
  const showRegistrarNav =
    role === "registrar" || role === "dean" || role === "admin";

  return (
    <MDBContainer fluid className="p-0 d-flex flex-column vh-100">
      {showRegistrarNav ? <RegistrarNav /> : <AlumniNavbar />}
      <section style={{ backgroundColor: "#eee" }} className="flex-grow-1">
        <MDBContainer className="profile-container">
          <MDBRow>
            {/* Profile */}
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle mb-3"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <h4
                    className=" mb-1"
                    style={{
                      color: "rgb(25, 59, 2)",
                    }}
                  >
                    {user.last_name +
                      ", " +
                      user.first_name +
                      " " +
                      user.middle_name +
                      " " +
                      (user.suffix || "")}
                  </h4>
                  <p className="text-muted mb-4">{user.job_title || "N/A"}</p>
                  <p className="text-muted mb-4">
                    {user.role} ID: {user.alumni_id}
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardHeader
                  style={{
                    backgroundColor: "rgba(13, 41, 1, 0.70)",
                  }}
                  className="text-white fw-bold"
                >
                  Personal Information
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.last_name +
                          ", " +
                          user.first_name +
                          " " +
                          user.middle_name +
                          " " +
                          (user.suffix || "")}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Gender</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.gender}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.number}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              {/* Secondary Information */}

              <MDBCard className="mb-4">
                <MDBCardHeader
                  style={{
                    backgroundColor: "rgba(13, 41, 1, 0.70)",
                  }}
                  className="text-white fw-bold"
                >
                  Secondary Information
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>College Department</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.college_department}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Year Graduated</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.year_graduated}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Civil Status</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.civil_status}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Work Status</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.work_status}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Job Title</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.job_title}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBContainer>
  );
};
