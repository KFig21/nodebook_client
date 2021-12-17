import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import SC from "../../../themes/styledComponents";
import { findTheme } from "../../../helpers/helperFunctions";
import axios from "axios";
import "./SidebarModal.scss";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import defaultThemeGreen from "../../../themes/defaultTheme_Green";
import defaultThemeAqua from "../../../themes/defaultTheme_Aqua";
import defaultThemeYellow from "../../../themes/defaultTheme_Yellow";
import purpleTheme from "../../../themes/purpleTheme";

export default function Theme({
  setLogoutModal,
  setSidebarOpen,
  setThemeModal,
  setSelectedTheme,
  setTheme,
  selectedTheme,
  themeModal,
  handleThemeModal,
}) {
  const { user, dispatch } = useContext(AuthContext);

  const handleThemeOptionClick = (theme) => {
    setSelectedTheme(theme);
    setTheme(findTheme(theme));
  };

  const handleCancelThemeModal = () => {
    setSelectedTheme(user.theme);
    setSidebarOpen(false);
    setLogoutModal(false);
    setThemeModal(!themeModal);
    setTheme(findTheme(user.theme));
  };

  const handleUpdateTheme = async (e) => {
    e.preventDefault();
    const data = {
      userId: user._id,
      theme: selectedTheme,
    };
    try {
      await axios.put(
        `https://radiant-oasis-77477.herokuapp.com/api/users/${user._id}/theme/`,
        // `http://localhost:3000/api/users/${user._id}/theme/`,
        data
      );
      dispatch({ type: "THEME", payload: selectedTheme });
    } catch (err) {
      console.log(err);
    }
    setThemeModal(!themeModal);
  };

  return (
    <div className="sidebar-modal-wrapper">
      <SC.ProfileModalMessageContainer className="sidebar-modal-container">
        <SC.ProfileModalMessageContainer className="sidebar-modal-message">
          Pick a theme
        </SC.ProfileModalMessageContainer>
        <div className="theme-modal-selection-container">
          <div
            className="sidebar-modal-option"
            onClick={() => handleThemeOptionClick("default green")}
            style={{
              backgroundColor: defaultThemeGreen.colors.backgroundColor,
            }}
          >
            {selectedTheme === "default green" ? (
              <RadioButtonChecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeGreen.colors.primaryColor }}
              />
            ) : (
              <RadioButtonUnchecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeGreen.colors.primaryColor }}
              />
            )}
            Default green
          </div>
          <div
            className="sidebar-modal-option"
            onClick={() => handleThemeOptionClick("default yellow")}
            style={{
              backgroundColor: defaultThemeYellow.colors.backgroundColor,
            }}
          >
            {" "}
            {selectedTheme === "default yellow" ? (
              <RadioButtonChecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeYellow.colors.primaryColor }}
              />
            ) : (
              <RadioButtonUnchecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeYellow.colors.primaryColor }}
              />
            )}
            Default yellow
          </div>
          <div
            className="sidebar-modal-option"
            onClick={() => handleThemeOptionClick("default aqua")}
            style={{ backgroundColor: defaultThemeAqua.colors.backgroundColor }}
          >
            {" "}
            {selectedTheme === "default aqua" ? (
              <RadioButtonChecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeAqua.colors.primaryColor }}
              />
            ) : (
              <RadioButtonUnchecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeAqua.colors.primaryColor }}
              />
            )}
            Default aqua
          </div>
          <div
            className="sidebar-modal-option"
            onClick={() => handleThemeOptionClick("purple")}
            style={{ backgroundColor: purpleTheme.colors.backgroundColor }}
          >
            {" "}
            {selectedTheme === "purple" ? (
              <RadioButtonChecked
                className="theme-radio-icon"
                style={{ fill: purpleTheme.colors.primaryColor }}
              />
            ) : (
              <RadioButtonUnchecked
                className="theme-radio-icon"
                style={{ fill: purpleTheme.colors.primaryColor }}
              />
            )}
            Purple
          </div>
        </div>
        <SC.ProfileModalMessageContainer className="sidebar-modal-button-container">
          <SC.ModalSaveButton onClick={handleUpdateTheme}>
            save
          </SC.ModalSaveButton>
          <SC.ModalCancelButton onClick={handleCancelThemeModal}>
            cancel
          </SC.ModalCancelButton>
        </SC.ProfileModalMessageContainer>
      </SC.ProfileModalMessageContainer>
      <div className="modal-background" onClick={handleThemeModal}></div>
    </div>
  );
}
