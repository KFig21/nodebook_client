import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Nav.scss";
import { Add, Remove } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import SC from "../../themes/styledComponents";
import {
  updateFollowStatus,
  deleteFollowNotification,
  sendFollowNotification,
} from "../../helpers/apiCalls";

export default function Nav({
  profileUser,
  currentPage,
  post,
  likesUser,
  postUser,
  comment,
  notificationsCount,
  sidebarOpen,
  handleSidebar,
  themeModal,
  logoutModal,
  followersCount,
}) {
  const username = useParams().username;
  const [followed, setFollowed] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const checkFollowing = async () => {
      if(user.followings){
        let check = await user.followings.includes(profileUser?._id);
        setFollowed(check);
      }      
    };
    checkFollowing();
  });

  const handleFollowingStatus = async () => {
    try {
      if (followed) {
        await updateFollowStatus(user._id, profileUser._id, "unfollow");
        dispatch({ type: "UNFOLLOW", payload: profileUser._id });
        // delete follow notification
        try {
          await deleteFollowNotification(user._id, profileUser._id);
        } catch (err) {}
      } else {
        await updateFollowStatus(user._id, profileUser._id, "follow");
        dispatch({ type: "FOLLOW", payload: profileUser._id });
        // send follow notification
        try {
          await sendFollowNotification(user._id, profileUser._id);
        } catch (err) {}
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const TimelineNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          <span className="nav-title">{currentPage}</span>
        </div>
      </SC.Navbar>
    );
  };

  const FollowsNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          <span className="nav-title">
            {currentPage === "Followers" && (
              <>
                {currentPage} {" ("}
                {followersCount}
                {") "}
              </>
            )}
            {currentPage === "Following" && (
              <>
                {currentPage} {" ("}
                {user.followings.length}
                {") "}
              </>
            )}
          </span>
        </div>
      </SC.Navbar>
    );
  };

  const ProfileNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          {profileUser ? (
            <div className="nav-info-container">
              <span className="nav-title">{profileUser.username}</span>
              {username !== user.username &&
                !sidebarOpen &&
                !themeModal &&
                !logoutModal && (
                  <SC.FollowButton
                    className={
                      followed
                        ? "follow-button Unfollow"
                        : "follow-button Follow"
                    }
                    onClick={handleFollowingStatus}
                  >
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                  </SC.FollowButton>
                )}
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </SC.Navbar>
    );
  };

  const UpdateNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          {user ? (
            <div className="nav-info-container">
              <span className="nav-title">update profile</span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </SC.Navbar>
    );
  };

  const NotificationsNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          {user ? (
            <div className="nav-info-container">
              <span className="nav-title">
                Notifications {"(" + notificationsCount + ")"}
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </SC.Navbar>
    );
  };

  const PostNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          {user && post ? (
            <div className="nav-info-container">
              <span className="nav-title">
                {post.comments.length === 1 ? (
                  <>
                    {postUser.username ? postUser.username : "Loading"} -{" "}
                    {"(" + post.comments.length + " reply)"}
                  </>
                ) : (
                  <>
                    {postUser.username ? postUser.username : "Loading"} -{" "}
                    {"(" + post.comments.length + " replies)"}
                  </>
                )}
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </SC.Navbar>
    );
  };

  const CommentLikesNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          {user && comment ? (
            <div className="nav-info-container">
              <span className="nav-title">
                {comment.likerIds.length === 1 ? (
                  <>
                    {likesUser.username ? likesUser.username : "Loading"} -{" "}
                    {"(" + comment.likerIds.length + "  like)"}
                  </>
                ) : (
                  <>
                    {likesUser.username ? likesUser.username : "Loading"} -{" "}
                    {"(" + comment.likerIds.length + " likes)"}
                  </>
                )}
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </SC.Navbar>
    );
  };

  const PostLikesNav = () => {
    return (
      <SC.Navbar className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <SC.Hamburger
              className={sidebarOpen ? "hamburger active" : "hamburger"}
              onClick={handleSidebar}
            >
              <MenuIcon className="hamburger-icon" />
            </SC.Hamburger>
          </div>
          {user && post ? (
            <div className="nav-info-container">
              <span className="nav-title">
                {post.likerIds.length === 1 ? (
                  <>
                    {likesUser.username ? likesUser.username : "Loading"} -{" "}
                    {"(" + post.likerIds.length + " like)"}
                  </>
                ) : (
                  <>
                    {likesUser.username ? likesUser.username : "Loading"} -{" "}
                    {"(" + post.likerIds.length + " likes)"}
                  </>
                )}
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </SC.Navbar>
    );
  };

  return (
    <>
      {currentPage === "Timeline" && <TimelineNav />}
      {currentPage === "Profile" && <ProfileNav />}
      {currentPage === "NotUsersProfile" && <ProfileNav />}
      {currentPage === "Update" && <UpdateNav />}
      {currentPage === "Followers" && <FollowsNav />}
      {currentPage === "Following" && <FollowsNav />}
      {currentPage === "Notifications" && <NotificationsNav />}
      {currentPage === "Post" && <PostNav />}
      {currentPage === "CommentLikes" && <CommentLikesNav />}
      {currentPage === "Explore" && <TimelineNav />}
      {currentPage === "Share" && <TimelineNav />}
      {currentPage === "PostLikes" && <PostLikesNav />}
    </>
  );
}
