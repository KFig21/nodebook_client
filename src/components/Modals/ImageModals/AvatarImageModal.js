import React from "react";
import "./ImageModal.scss";
import SC from "../../../themes/styledComponents";
import noAvi from "../../../assets/noAvatar.png";

export default function AvatarImageModal({ avatar, setShowModal, showModal }) {
  return (
    <div className="image-modal-wrapper">
      <SC.AvatarImageModal className="modal-container static avatar">
        <img
          className="modal-img static"
          src={
            avatar
              ? "https://nodebook-images.s3.amazonaws.com/" + avatar
              : noAvi
          }
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
