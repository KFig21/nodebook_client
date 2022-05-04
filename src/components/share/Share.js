import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import SC from "../../themes/styledComponents";
import {
  fetchUserByUsername,
  sharePost,
  sharePostWithImage,
} from "../../helpers/apiCalls";
import { PermMedia, Cancel } from "@material-ui/icons";
import noAvi from "../../assets/noAvatar.png";
import "./Share.scss";

export default function Share() {
  const { user: currentUser } = useContext(AuthContext);
  const body = useRef();
  const [file, setFile] = useState(null);
  const [disableButton, setDisableButton] = useState("");
  const isInvalid = disableButton === "";
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetchUserByUsername(currentUser.username);
      setUser(res);
    };

    fetchUser();
  }, [currentUser]);

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
        await sharePostWithImage(postWithImg);
        window.location.reload();
      } catch (err) {
        setError(true);
      }
    } else {
      // no file, send
      try {
        await sharePost(newPost);
        window.location.reload();
      } catch (err) {
        setError(true);
      }
    }
  };

  return (
    <SC.ShareContainer className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            className="share-avatar"
            src={
              user.avatar
                ? "https://nodebook-images.s3.amazonaws.com/" + user.avatar
                : noAvi
            }
            alt=""
          />
          <SC.ShareTextArea
            placeholder={"What's up " + user.username + "?"}
            className="share-input"
            onChange={(e) => setDisableButton(e.target.value)}
            ref={body}
            maxLength={500}
          />
        </div>
        <SC.ShareHR className="share-hr" />
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
              <SC.ShareOptions>
                <PermMedia className="share-icon" />
              </SC.ShareOptions>
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
          <SC.ShareSubmitButton
            type="submit"
            className={
              isInvalid ? "share-button invalid-share-button" : "share-button"
            }
            disabled={isInvalid}
          >
            Share
          </SC.ShareSubmitButton>
        </form>
        {error && (
          <div className="error-div">
            <span className="error-message">
              <strong>Error:</strong> File too large or incorrect type
            </span>
          </div>
        )}
      </div>
    </SC.ShareContainer>
  );
}
