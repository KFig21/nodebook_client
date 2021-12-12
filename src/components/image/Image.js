import React from "react";
import "./Image.scss";
import noAvi from "../../assets/noAvatar.png";

export default function Image({ image, fetchNotifications }) {
  return (
    <div className="image-wrapper">
      <img
        src={
          image.img
            ? "https://nodebook-images.s3.amazonaws.com/" + image.img
            : noAvi
        }
        className="profile-images-img"
        alt=""
      />
    </div>
  );
}
