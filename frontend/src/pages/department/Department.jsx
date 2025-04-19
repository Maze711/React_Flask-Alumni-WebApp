import AlumniNavbar from "../../components/NavBar";
import PhotosIcon from "../../assets/icon/photos_ico.svg";
import VideosIcon from "../../assets/icon/videos_ico.svg";
import PollIcon from "../../assets/icon/poll_ico.svg";
import SampleDp from "../../assets/img/sample_profile.png";
import { useState } from "react";
import { CreatePostModal } from "../../components/departments/CreatePostModal";
import { Post } from "../../components/departments/Post";
import { Announcement } from "../../components/departments/Announcement";

export const Department = () => {
  // TODO: Make the Post and Announcement Iterable based on the fetched data from the backend
  
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AlumniNavbar />
      <main
        className="container-fluid d-flex flex-grow-1 gap-5 justify-content-center px-5 px-lg-0"
        style={{ marginTop: "80px" }}
      >
        {/* Timeline Section */}
        <section className="bg-light d-flex flex-column gap-3 align-items-center pt-3 px-4 col-12 col-lg-6 overflow-y-auto overflow-hidden">
          {/* Create Post Container */}
          <div
            className="rounded-4 px-4 py-3 w-100"
            style={{ backgroundColor: "#BFBFBF" }}
          >
            <div className="d-flex gap-2" style={{ height: "80px" }}>
              <img
                src={SampleDp}
                className="rounded-circle"
                width="80"
              />
              <div
                className="create-post btn rounded-3 d-flex px-3 py-3 bg-light w-100 overflow-hidden"
                onClick={() => setShowCreatePostModal(!showCreatePostModal)}
              >
                Write something ...
              </div>
            </div>

            <hr className="mb-3" />

            <div className="d-flex justify-content-center gap-2 gap-sm-3">
              <button className="create-post-icon btn d-flex align-items-center gap-2 py-2 px-3"
              onClick={() => setShowCreatePostModal(!showCreatePostModal)}
              >
                <img
                  src={PhotosIcon}
                  style={{ width: "30px", height: "30px" }}
                />
                <span className="fw-bold d-none d-sm-block">Photos</span>
              </button>
              <button className="create-post-icon btn d-flex align-items-center gap-2 py-2 px-3"
                onClick={() => setShowCreatePostModal(!showCreatePostModal)}
                >
                <img
                  src={VideosIcon}
                  style={{ width: "30px", height: "30px" }}
                />
                <span className="fw-bold d-none d-sm-block">Video</span>
              </button>
              <button className="create-post-icon btn d-flex align-items-center gap-2 py-2 px-3"
              onClick={() => setShowCreatePostModal(!showCreatePostModal)}
              >
                <img src={PollIcon} style={{ width: "30px", height: "30px" }} />
                <span className="fw-bold d-none d-sm-block">Poll</span>
              </button>
            </div>
          </div>

          {/* Create Post Modal */}
          <CreatePostModal
            isOpen={showCreatePostModal}
            onClose={() => setShowCreatePostModal(false)}
          />

          {/* List of Post */}
          <Post/>
          <Post/>
          <Post/>

        </section>

        {/* Announcement Section */}
        <section
          className="bg-light pt-3 px-4 col-3 d-none d-lg-flex flex-column position-sticky overflow-x-hidden"
          style={{
            height: "calc(100vh - 80px)",
            top: "80px",
            overflowY: "auto",
          }}
        >
          <h6 className="fw-bold">ANNOUNCEMENT</h6>
          
          <div className="rounded-4 d-flex flex-column gap-1 py-3 px-2 align-items-center overflow-y-auto overflow-hidden"
            style={{ backgroundColor: "#BFBFBF" }}
          >
            {/* List of Post */}
            <Announcement/>
            <Announcement/>
            <Announcement/>
          </div>

        </section>
      </main>
    </div>
  );
};
