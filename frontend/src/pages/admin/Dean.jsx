import axios from "axios";
import { useEffect, useState } from "react";
import { AlumniNavbar } from "../../components/NavBar";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export const Dean = () => {
  const [allUsers, setAllUsers] = useState([]);
  const column_names = [
    "ID",
    "Alumni ID",
    "Last Name",
    "First Name",
    "Middle Name",
    "Suffix",
    "Gender",
    "Email",
    "Birthdate",
    "Civil Status",
    "College Department",
    "Address",
    "Number",
    "Year Graduated",
    "Work Status",
    "Job Title",
    "Password",
    "Role",
  ];

  const getAllUserData = async () => {
    // GET the all user data from the server/backend
    try {
      const { data } = await axios.get("/fetch_all_users", {
        withCredentials: true,
      });

      console.log("Fetched Data: ", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Fetch all the user data once the admin page is rendered
  useEffect(() => {
    getAllUserData()
      .then((data) => {
        setAllUsers(data);
        console.log("All users:", data);
      })
      .catch((error) => {
        setAllUsers([]);
        console.log(error);
      });
  }, []);

  return (
    <MDBContainer fluid className="p-0 d-flex flex-column vh-100">
      <AlumniNavbar />

      <main className="flex-grow-1" style={{padding: '80px'}}>
        <h1 className="text-center p-3 mb-3 fw-bold">Admin Dashboard</h1>
        <div className="w-100 px-5">
          {/* Scrollable Table Wrapper */}
          <div className="table-container">
            <MDBTable striped hover>
              <MDBTableHead dark>
                <tr>
                  {column_names.map((col_name, index) => (
                    <th scope="col" key={index} className="text-truncate">
                      {col_name}
                    </th>
                  ))}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {/* Iterates and display all the users per row */}
                {allUsers.length > 0 ? (
                  allUsers.map((user, key) => (
                    <tr key={key}>
                      <td>{user.ID}</td>
                      <td>{user.alumni_id}</td>
                      <td>{user.last_name}</td>
                      <td>{user.first_name}</td>
                      <td>{user.middle_name}</td>
                      <td>{user.suffix}</td>
                      <td>{user.gender}</td>
                      <td>{user.email}</td>
                      <td>{user.birthdate}</td>
                      <td>{user.civil_status}</td>
                      <td>{user.college_department}</td>
                      <td>{user.address}</td>
                      <td>{user.number}</td>
                      <td>{user.year_graduated}</td>
                      <td>{user.work_status}</td>
                      <td>{user.job_title}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {/* Display this only if there are no user found */}
                    <td colSpan={column_names.length} className="text-center">
                      No Records Found
                    </td>
                  </tr>
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </main>
    </MDBContainer>
  );
};
