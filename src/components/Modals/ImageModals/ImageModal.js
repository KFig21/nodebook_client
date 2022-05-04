import React from "react";
import { Link } from "react-router-dom";
import SC from "../../../themes/styledComponents";
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
          <Link to={"/post/" + post._id}>
            <SC.ViewPostButton className="view-post-button">
              view post
            </SC.ViewPostButton>
          </Link>
        )}
        <img
          className={directional ? "modal-img" : "modal-img static"}
          src={"https://nodebook-images.s3.amazonaws.com/" + post.img}
          alt=""
          onClick={() => setShowModal(!showModal)}
        />
      </div>

      <SC.ModalWrapperDark
        className="modal-background"
        onClick={() => setShowModal(!showModal)}
      ></SC.ModalWrapperDark>
    </div>
  );
}
