import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Chat, Group, Edit } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import "./ProfileInfo.scss";

export default function ProfileInfo({ profileUser, handleChangeFeed, feed }) {
  const { user } = useContext(AuthContext);

  const formatBday = (date) => {
    let arr = date.split("-");
    let formattedDate = arr[1] + "/" + arr[2] + "/" + arr[0];
    return formattedDate;
  };

  return (
    <div className="profileInfo-container">
      {user._id === profileUser._id && (
        <Link to={`/${user._id}/update`}>
          <div title="update user info">
            <Edit className="edit-icon" />
          </div>
        </Link>
      )}
      <div className="profile-info-div">
        <div className="profile-info-strong">Name:</div> {profileUser.firstname}{" "}
        {profileUser.lastname}
      </div>
      <div className="profile-info-div">
        {" "}
        <div className="profile-info-strong">Bio:</div> {profileUser.about}
      </div>
      <div className="profile-info-div">
        <div className="profile-info-strong">Birthday:</div>{" "}
        {profileUser.birthday ? formatBday(profileUser.birthday) : "private"}
      </div>
      <div className="profile-info-div">
        <div className="profile-info-strong">Location:</div>{" "}
        {profileUser.location ? profileUser.location : "private"}
      </div>
      <div className="profile-info-div">
        <div className="profile-info-strong">Website:</div>{" "}
        {profileUser.website ? (
          <a
            href={profileUser.website}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-website-a"
          >
            {profileUser.website}
          </a>
        ) : (
          "private"
        )}
      </div>
      <hr className="profile-info-hr" />
      {/* POSTS */}
      <div
        className={
          "profile-info-clickable " + (feed === "posts" ? "pic-active" : "")
        }
        onClick={() => handleChangeFeed("posts")}
      >
        <Chat className="profile-info-icon" />
        Posts: {profileUser.posts ? profileUser.posts.length : "0"}
      </div>
      {/* FOLLOWERS */}
      <div
        className={
          "profile-info-clickable " + (feed === "followers" ? "pic-active" : "")
        }
        onClick={() => handleChangeFeed("followers")}
      >
        <Group className="profile-info-icon" />
        Followers: {profileUser.followers ? profileUser.followers.length : "0"}
      </div>
      {/* FOLLOWING */}
      <div
        className={
          "profile-info-clickable " + (feed === "following" ? "pic-active" : "")
        }
        onClick={() => handleChangeFeed("following")}
      >
        <Group className="profile-info-icon" />
        Following:{" "}
        {profileUser.followings ? profileUser.followings.length : "0"}
      </div>
    </div>
  );
}
