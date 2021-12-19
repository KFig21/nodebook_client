import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import SC from "../../../themes/styledComponents";
import { findTheme } from "../../../helpers/helperFunctions";
import "./SidebarModal.scss";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import defaultThemeGreen from "../../../themes/defaultTheme_Green";
import defaultThemeAqua from "../../../themes/defaultTheme_Aqua";
import defaultThemeYellow from "../../../themes/defaultTheme_Yellow";
import defaultThemeRed from "../../../themes/defaultTheme_Red";
import outrunTheme from "../../../themes/outrunTheme";
import { updateUserTheme } from "../../../helpers/apiCalls";

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
      await updateUserTheme(data, user._id);
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
            <span className="theme-name">Default green</span>
            <div className="sidebar-modal-option-background"></div>
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
            <span className="theme-name">Default yellow</span>
            <div className="sidebar-modal-option-background"></div>
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
            <span className="theme-name">Default aqua</span>
            <div className="sidebar-modal-option-background"></div>
          </div>
          <div
            className="sidebar-modal-option"
            onClick={() => handleThemeOptionClick("default red")}
            style={{ backgroundColor: defaultThemeRed.colors.backgroundColor }}
          >
            {" "}
            {selectedTheme === "default red" ? (
              <RadioButtonChecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeRed.colors.primaryColor }}
              />
            ) : (
              <RadioButtonUnchecked
                className="theme-radio-icon"
                style={{ fill: defaultThemeRed.colors.primaryColor }}
              />
            )}
            <span className="theme-name">Default red</span>
            <div className="sidebar-modal-option-background"></div>
          </div>
          <div
            className="sidebar-modal-option"
            onClick={() => handleThemeOptionClick("outrun")}
            style={{ backgroundColor: outrunTheme.colors.backgroundColor }}
          >
            {" "}
            {selectedTheme === "outrun" ? (
              <RadioButtonChecked
                className="theme-radio-icon"
                style={{ fill: outrunTheme.colors.primaryColor }}
              />
            ) : (
              <RadioButtonUnchecked
                className="theme-radio-icon"
                style={{ fill: outrunTheme.colors.primaryColor }}
              />
            )}
            <span className="theme-name">Outrun</span>
            <div className="sidebar-modal-option-background"></div>
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
      <SC.ModalWrapper
        className="modal-background"
        onClick={handleThemeModal}
      ></SC.ModalWrapper>
    </div>
  );
}
