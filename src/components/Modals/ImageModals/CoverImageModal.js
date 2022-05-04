import React from "react";
import "./ImageModal.scss";
import SC from "../../../themes/styledComponents";
import defaultCover from "../../../assets/cover.png";

export default function CoverImageModal({ cover, setShowModal, showModal }) {
  return (
    <div className="image-modal-wrapper">
      <div className="modal-container static">
        <img
          className="modal-img static"
          src={
            cover
              ? "https://nodebook-images.s3.amazonaws.com/" + cover
              : defaultCover
          }
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
