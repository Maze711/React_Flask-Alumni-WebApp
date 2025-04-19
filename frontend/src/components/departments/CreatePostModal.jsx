import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

export const CreatePostModal = ({ isOpen, onClose }) => {
  // TODO: Add state and handlers for managing the post content (e.g., title, description)
  // TODO: and implement form elements inside the modal body for user input.
  
  return (
    <MDBModal
      open={isOpen}
      onClose={onClose}
      tabIndex="-1"
    >
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
          <MDBModalBody></MDBModalBody>
          <MDBModalFooter>
            <button className="btn btn-primary w-100">Post</button>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
