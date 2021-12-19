import { useState, useContext } from "react";
import { ThemeContext } from "styled-components";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Cropper from "react-easy-crop";
import { Slider } from "@material-ui/core";
// icons
import { PermMedia, Cancel } from "@material-ui/icons";

export default function AvatarModal() {
  const [avatar, setAvatar] = useState(null);
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
        setAvatar(reader.result);
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
  return (
    <div className="cropper-container">
      <div className="avatar-modal-img-container">
        {/* <img
        className="avatar-modal-cropper"
        src={avatarCropper}
        alt=""
      /> */}
        <Cancel
          className="avatar-modal-cancel-img"
          onClick={() => setAvatar("")}
        />
        <Cropper
          image={avatar}
          crop={crop}
          zoom={zoom}
          aspect={1}
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
  );
}
