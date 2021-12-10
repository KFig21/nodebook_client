import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { PermMedia, Cancel } from "@material-ui/icons";
import noAvi from "../../assets/noAvatar.png";
import "./Share.scss";

export default function Share() {
  const { user } = useContext(AuthContext);
  const body = useRef();
  const [file, setFile] = useState(null);
  const [disableButton, setDisableButton] = useState("");
  const isInvalid = disableButton === "";

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      body: body.current.value,
    };
    if (file) {
      const postWithImg = new FormData();

      postWithImg.append("file", file);
      postWithImg.append("userId", user._id);
      postWithImg.append("body", body.current.value);

      try {
        await axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/posts/image",
          // `http://localhost:3000/api/posts/image`,
          postWithImg
        );
        window.location.reload();
      } catch (err) {}
    } else {
      // no file, send
      try {
        await axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/posts",
          // "http://localhost:3000/api/posts",
          newPost
        );
        window.location.reload();
      } catch (err) {}
    }
  };

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            className="share-avatar"
            src={user.profilePicture ? user.profilePicture : noAvi}
            alt=""
          />
          <textarea
            placeholder={"What's up " + user.username + "?"}
            className="share-input"
            onChange={(e) => setDisableButton(e.target.value)}
            ref={body}
            maxLength={500}
          />
        </div>
        <hr className="share-hr" />
        {file && (
          <div className="share-img-container">
            <img className="share-img" src={URL.createObjectURL(file)} alt="" />
            <Cancel
              className="share-cancel-img"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form
          className="share-bottom"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia className="share-icon" />
              <span className="share-option-text">Add an image</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button
            type="submit"
            className={
              isInvalid ? "share-button invalid-share-button" : "share-button"
            }
            disabled={isInvalid}
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
