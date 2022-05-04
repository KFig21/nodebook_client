import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { logoutCall } from "../../../helpers/apiCalls";
import SC from "../../../themes/styledComponents";
import "../SidebarModals/SidebarModal.scss";

export default function LogoutModal({
  setSidebarOpen,
  setShowDeleteModal,
  handleDeleteBatch,
  deleteType,
}) {
  return (
    <div className="sidebar-modal-wrapper">
      <SC.ProfileModalContainer className="sidebar-modal-container">
        <SC.ProfileModalMessageContainer className="sidebar-modal-message">
          {` Are you sure you want to Delete `} <strong>ALL</strong>{" "}
          {` ${deleteType}
          notifications?`}
        </SC.ProfileModalMessageContainer>
        <div className="logout-modal-selection-container">
          <SC.NotificationModalButtonDelete
            className="logout-modal-option"
            onClick={() => handleDeleteBatch(deleteType)}
          >
            Delete
          </SC.NotificationModalButtonDelete>
          <SC.NotificationModalButtonCancel
            className="logout-modal-option"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </SC.NotificationModalButtonCancel>
        </div>
      </SC.ProfileModalContainer>
      <SC.ModalWrapper
        className="modal-background"
        onClick={() => setShowDeleteModal(false)}
      ></SC.ModalWrapper>
    </div>
  );
}
