import React, { useState } from "react";

export const CreateAnnouncementModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ borderRadius: "10px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Create Announcement</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body d-flex gap-3">
            {/* Upload Area */}
            <div className="border border-2 border-dashed flex-grow-1 d-flex justify-content-center align-items-center" style={{ height: "250px", flexBasis: "40%" }}>
              <label htmlFor="fileUpload" style={{ cursor: "pointer", textAlign: "center", color: "#666" }}>
                {file ? (
                  <div>{file.name}</div>
                ) : (
                  <>
                    <img src="/upload-icon.png" alt="Upload" style={{ width: "50px", marginBottom: "10px" }} />
                    <div>Upload or drop a file</div>
                  </>
                )}
                <input type="file" id="fileUpload" hidden onChange={handleFileChange} />
              </label>
            </div>

            {/* Text Area */}
            <div className="flex-grow-1" style={{ flexBasis: "60%" }}>
              <textarea
                className="form-control mb-3"
                placeholder="Write something..."
                rows="8"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <div className="d-flex justify-content-between">
                <select className="form-select" style={{ width: "150px" }}>
                  <option>Restrictions</option>
                  <option>Public</option>
                  <option>Private</option>
                </select>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary">Save as Draft</button>
                  <button className="btn btn-success">Publish</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
