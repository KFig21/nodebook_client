import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Nav from "../../components/nav/Nav";
import noAvi from "../../assets/noAvatar.png";
import { PermMedia, Cancel } from "@material-ui/icons";
import "./Share.scss";

export default function Share({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
}) {
  const { user } = useContext(AuthContext);
  const body = useRef();
  const [file, setFile] = useState(null);
  let navigate = useNavigate();
  const [disableButton, setDisableButton] = useState("");
  const isInvalid = disableButton === "";

  // set current page to"Post on load
  useEffect(() => {
    setCurrentPage("Share");
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      body: body.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      // not working
      try {
        await axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/upload",
          data
        );
      } catch (err) {}
    }
    try {
      await axios.post(
        "https://radiant-oasis-77477.herokuapp.com/api/posts",
        newPost
      );
      fetchNotifications();
      navigate("/", { replace: true });
    } catch (err) {}
  };

  return (
    <div className="container">
      <Nav
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="share-page" onClick={() => setSidebarOpen(false)}>
        <div className="share-container">
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
                  className="share-input-desktop"
                  onChange={(e) => setDisableButton(e.target.value)}
                  ref={body}
                  maxLength={500}
                />
              </div>
              <hr className="share-hr" />
              {file && (
                <div className="share-img-container">
                  <img
                    className="share-img"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                  <Cancel
                    className="share-cancel-img"
                    onClick={() => setFile(null)}
                  />
                </div>
              )}
              <form className="share-bottom" onSubmit={submitHandler}>
                <div className="share-options">
                  <label htmlFor="file" className="share-option">
                    <PermMedia className="share-icon" />
                    <span className="share-option-text">Photo or Video</span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className={
                    isInvalid
                      ? "share-button invalid-share-button"
                      : "share-button"
                  }
                  disabled={isInvalid}
                >
                  Share
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
