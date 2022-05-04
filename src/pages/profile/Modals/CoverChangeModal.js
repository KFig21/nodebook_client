import { useState, useContext } from "react";
import { ThemeContext } from "styled-components";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Cropper from "react-easy-crop";
import { Slider } from "@material-ui/core";
import SC from "../../../themes/styledComponents";
import axios from "axios";
import getCroppedImg from "../../../helpers/cropImage";
import { dataURLtoFile } from "../../../helpers/dataURLtoFile";
import { url } from "../../../helpers/apiCalls";
// icons
import { PermMedia, Cancel } from "@material-ui/icons";

export default function CoverChangeModal({
  file,
  setFile,
  isInvalid,
  setSending,
  currentUser,
}) {
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setFile(reader.result);
      });
    }
  };
  const themeContext = useContext(ThemeContext);
  const sliderTheme = createTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: `${themeContext.colors.primaryColor}`,
        },
        track: {
          color: `${themeContext.colors.primaryColorFaded}`,
        },
        rail: {
          color: `${themeContext.colors.borderColor}`,
        },
      },
    },
  });

  const handleCoverUpdate = async (e) => {
    e.preventDefault();
    setSending(true);
    if (file) {
      const canvas = await getCroppedImg(file, croppedArea);
      const convertedUrlToFile = dataURLtoFile(canvas, "cropped-image.jpeg");
      const data = new FormData();

      data.append("file", convertedUrlToFile);
      data.append("userId", currentUser._id);

      try {
        await axios.put(
          `${url}/users/cover`,
          data
        );
        window.location.reload();
      } catch (err) {}
    }
  };

  return (
    <SC.ProfileModalContainer className="profile-modal-container">
      {file && (
        <div className="cropper-container">
          <div className="cover-modal-img-container">
            <Cancel
              className="cover-modal-cancel-img"
              onClick={() => setFile("")}
            />
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              aspect={4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="slider-container">
            <ThemeProvider theme={sliderTheme}>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </ThemeProvider>
          </div>
        </div>
      )}
      <SC.ProfileModalMessageContainer className="avatar-modal-bottom-container">
        <form
          className="avatar-modal-bottom"
          onSubmit={handleCoverUpdate}
          encType="multipart/form-data"
        >
          <div className="avatar-modal-options">
            <label htmlFor="file" className="avatar-modal-option">
              <SC.ProfileModalFileIcon>
                <PermMedia className="file-icon" />
              </SC.ProfileModalFileIcon>
              <span className="avatar-modal-option-text">
                Select a new cover
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                accept=".png,.jpeg,.jpg"
                // onChange={(e) => setFile(e.target.files[0])}
                onChange={onSelectFile}
              />
            </label>
          </div>
          <SC.ProfileImageSaveButton
            type="submit"
            className={
              isInvalid ? "save-button invalid-save-button" : "save-button"
            }
            disabled={isInvalid}
          >
            save
          </SC.ProfileImageSaveButton>
        </form>
      </SC.ProfileModalMessageContainer>
    </SC.ProfileModalContainer>
  );
}
