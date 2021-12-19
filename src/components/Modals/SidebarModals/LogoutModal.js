import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { logoutCall } from "../../../helpers/apiCalls";
import SC from "../../../themes/styledComponents";
import "./SidebarModal.scss";

export default function LogoutModal({
  setLogoutModal,
  setSidebarOpen,
  handleLogoutModal,
}) {
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    logoutCall(dispatch);
    setSidebarOpen(false);
    setLogoutModal(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar-modal-wrapper">
      <SC.ProfileModalMessageContainer className="sidebar-modal-container">
        <SC.ProfileModalMessageContainer className="sidebar-modal-message">
          Are you sure you want to logout?
        </SC.ProfileModalMessageContainer>
        <div className="logout-modal-selection-container">
          <SC.ProfileModalButton
            className="logout-modal-option"
            onClick={logout}
          >
            logout
          </SC.ProfileModalButton>
          <SC.ProfileModalButton
            className="logout-modal-option"
            onClick={() => setLogoutModal(false)}
          >
            cancel
          </SC.ProfileModalButton>
        </div>
      </SC.ProfileModalMessageContainer>
      <SC.ModalWrapper
        className="modal-background"
        onClick={handleLogoutModal}
      ></SC.ModalWrapper>
    </div>
  );
}
