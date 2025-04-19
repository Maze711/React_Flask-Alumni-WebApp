import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import bgImage from "../../assets/img/about-img.png";
import AlumniNavbar from "../../components/NavBar";

export const About = () => {
  return (
    <>
      <AlumniNavbar />
      <MDBContainer fluid>
        <MDBRow>
          {/* Left side container with background image */}
          <MDBCol sm="5" className="d-none d-md-block px-0 position-relative">
            <img
              src={bgImage}
              alt="Login image"
              className="w-100"
              style={{
                objectFit: "cover",
                height: "100vh",
              }}
            />
          </MDBCol>

          {/* right side container with about description*/}
          <MDBCol
            sm="7"
            className="d-flex flex-column align-items-center justify-content-center min-vh-100 flex-grow-1 px-5"
            style={{ paddingTop: "80px" }}
          >
            <div>
              <h2 className="about-header mb-2">About PLMun Alumni</h2>
              <p className="mb-3">
                The Pamantasan ng Lungsod ng Muntinlupa (PLMun) Alumni
                Association is a dynamic network of graduates committed to
                fostering lifelong connections, professional growth, and
                meaningful contributions to our alma mater and society.
              </p>
              <h5 className="about-header mb-0">Our Mission</h5>
              <p className="mb-3">
                We aim to unite PLMun alumni by providing opportunities for
                networking, career advancement, mentorship, and community
                engagement. Through various programs and initiatives, we strive
                to uphold the values of excellence, integrity, and service that
                define PLMun graduates.
              </p>
              <h5 className="about-header mb-0">Our Vision</h5>
              <p className="mb-3">
                To build a strong and supportive alumni community that empowers
                graduates, enhances university traditions, and contributes to
                the development of future leaders.
              </p>
              <p>
                We foster a vibrant alumni community by connecting graduates,
                faculty, and students through networking events, reunions, and
                online platforms. Our association provides career support
                through job opportunities, development programs, and industry
                partnerships while promoting mentorship, allowing alumni to
                share their experiences and guide future PLMun students.
                Additionally, we encourage community involvement through
                outreach programs, fundraising efforts, and initiatives that
                give back to the university and society.
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
