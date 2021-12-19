import React from "react";
import "./ImageModal.scss";
import SC from "../../../themes/styledComponents";

export default function CoverImageModal({ cover, setShowModal, showModal }) {
  return (
    <div className="image-modal-wrapper">
      <div className="modal-container static">
        <img
          className="modal-img static"
          src={"https://nodebook-images.s3.amazonaws.com/" + cover}
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
