import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBTextArea,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import PhotosIcon from "../../assets/icon/photos_ico.svg";
import AddFileIcon from "../../assets/icon/add_file_ico.svg";
import VideosIcon from "../../assets/icon/videos_ico.svg";
import PollIcon from "../../assets/icon/poll_ico.svg";
import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const CreatePostModal = ({ isOpen, onClose }) => {

  const [postInput, setPostInput] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  const [selectedOption, setSelectedOption] = useState([]);

  // Submit Post and saves it to database
  const handleSubmitPost = (e) => {
    // TODO: Soon to save the post contents to database through POST API
    e.preventDefault();
  };

  // Adds a stack of upload file container
  const addSelectedOption = (type) => {
    setSelectedOption([...selectedOption, type]);
  };

  // Handles changes of file within the upload file container
  const handleFileChange = (e) => {
    // TODO: Add Preview of File Feature
    setFile(e.target.files[0]);
  };

  // Discards/Removes an upload file container
  const handleDiscardFile = (indexToRemove) => {
    setFile(null);
    setSelectedOption(
      selectedOption.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <MDBModal open={isOpen} onClose={onClose} tabIndex="-1">
      <MDBModalDialog centered scrollable>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Create Post</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={onClose}
            ></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleSubmitPost}>
            <MDBModalBody style={{ maxHeight: "400px", overflowY: "auto" }}>
              <MDBInput
                wrapperClass="mb-3"
                placeholder="Title"
                value={postInput.title}
                onChange={(e) =>
                  setPostInput({ ...postInput, title: e.target.value })
                }
              />

              <MDBTextArea
                wrapperClass="mb-3"
                rows={5}
                placeholder="Write something ..."
                style={{ resize: "none" }}
                value={postInput.description}
                onChange={(e) =>
                  setPostInput({ ...postInput, description: e.target.value })
                }
              />

              {/* Show All Upload Containers when user selected an file option */}
              {selectedOption.map((type, index) => (
                <>
                  <div
                    key={index}
                    className="border rounded p-2 mb-3 d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "#BFBFBF" }}
                  >
                    {type == "Poll" ? (
                      /* Poll Container */
                      // TODO: Create a dynamic addition and removal of polls
                      // TODO: Add Poll functionality
                      <div className="btn position-relative rounded d-flex flex-column align-items-center justify-content-center border w-100 bg-light pt-5 pb-3">
                        <button
                          className="btn-close position-absolute bg-secondary rounded-circle p-2"
                          style={{ right: "5px", top: "5px" }}
                          onClick={() => handleDiscardFile(index)}
                        ></button>
                        <input
                          type="text"
                          className="mb-2 w-100 p-1"
                          placeholder="Poll Option 1"
                        />
                        <input
                          type="text"
                          className="mb-2 w-100 p-1"
                          placeholder="Poll Option 2"
                        />
                        <button className="btn btn-sm btn-success w-100">
                          + Add Poll Option
                        </button>
                      </div>
                    ) : (
                      /* Photo or Video Container */
                      <label
                        htmlFor="fileUpload"
                        className="btn position-relative rounded d-flex flex-column align-items-center justify-content-center border w-100 bg-light p-5"
                      >
                        <button
                          className="btn-close position-absolute bg-secondary rounded-circle p-2"
                          style={{ right: "5px", top: "5px" }}
                          onClick={() => handleDiscardFile(index)}
                        ></button>
                        <img
                          src={AddFileIcon}
                          alt="Add File"
                          style={{
                            marginBottom: "5px",
                            height: "30px",
                            width: "30px",
                          }}
                        />
                        <p className="m-0">
                          <b>Add {type}</b>
                        </p>
                        <p className="text-muted">Click to upload a file</p>
                        <input
                          type="file"
                          id="fileUpload"
                          hidden
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </>
              ))}
            </MDBModalBody>

            <MDBModalFooter
              style={{
                borderTop: "none",
                position: "sticky",
                bottom: "0",
                backgroundColor: "white",
                zIndex: "1",
              }}
            >
              {/* Add option for photos, videos, or poll */}
              <div className="border rounded py-2 px-3 d-flex justify-content-between align-items-center w-100">
                <p className="m-0 fw-bold">Add to your Post</p>

                <div className="d-flex gap-3">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Photos</Tooltip>}
                  >
                    <div
                      className="create-post-icons rounded-circle m-auto"
                      onClick={() => addSelectedOption("Photo")}
                    >
                      <img src={PhotosIcon} alt="Photo" />
                    </div>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Videos</Tooltip>}
                  >
                    <div
                      className="create-post-icons rounded-circle m-auto"
                      onClick={() => addSelectedOption("Video")}
                    >
                      <img src={VideosIcon} alt="Video" />
                    </div>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Poll</Tooltip>}
                  >
                    <div
                      className="create-post-icons rounded-circle m-auto"
                      onClick={() => addSelectedOption("Poll")}
                    >
                      <img src={PollIcon} alt="Poll" />
                    </div>
                  </OverlayTrigger>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Post
              </button>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
