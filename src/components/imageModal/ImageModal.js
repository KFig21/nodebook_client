import React from "react";
import { Link } from "react-router-dom";
import "./ImageModal.scss";

export default function ImageModal({
  post,
  setShowModal,
  showModal,
  directional,
}) {
  return (
    <div className="image-modal-wrapper">
      <div
        className={directional ? "modal-container" : "modal-container static"}
      >
        {directional && (
          <div className="view-post-button">
            <Link to={"/post/" + post._id}>view post</Link>
          </div>
        )}
        <img
          className={directional ? "modal-img" : "modal-img static"}
          src={"https://nodebook-images.s3.amazonaws.com/" + post.img}
          alt=""
          onClick={() => setShowModal(!showModal)}
        />
      </div>

      <div
        className="modal-background"
        onClick={() => setShowModal(!showModal)}
      ></div>
    </div>
  );
}
