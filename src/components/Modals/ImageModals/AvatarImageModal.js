import React from "react";
import "./ImageModal.scss";
import SC from "../../../themes/styledComponents";

export default function AvatarImageModal({ avatar, setShowModal, showModal }) {
  return (
    <div className="image-modal-wrapper">
      <SC.AvatarImageModal className="modal-container static avatar">
        <img
          className="modal-img static"
          src={"https://nodebook-images.s3.amazonaws.com/" + avatar}
          alt=""
          onClick={() => setShowModal(!showModal)}
        />
      </SC.AvatarImageModal>

      <SC.ModalWrapperDark
        className="modal-background"
        onClick={() => setShowModal(!showModal)}
      ></SC.ModalWrapperDark>
    </div>
  );
}
