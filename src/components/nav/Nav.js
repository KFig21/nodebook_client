import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Nav.scss";
import { Add, Remove } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

export default function Nav({
  profileUser,
  currentPage,
  post,
  likesUser,
  postUser,
  comment,
  notificationsCount,
  sidebarOpen,
  setSidebarOpen,
}) {
  const username = useParams().username;
  const [followed, setFollowed] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const checkFollowing = async () => {
      let check = await user.followings.includes(profileUser?._id);
      setFollowed(check);
    };
    checkFollowing();
  });

  const handleClick = async () => {
    console.log("followed", followed);
    try {
      if (followed) {
        await axios.put(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${profileUser._id}/unfollow`,
          {
            userId: user._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: profileUser._id });
        // delete follow notification
        try {
          axios.delete(
            "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
            // "http://localhost:3000/api/notifications/",
            {
              data: {
                sender: user._id,
                recipient: profileUser._id,
                postId: null,
                commentId: null,
                type: "follow",
              },
            }
          );
        } catch (err) {}
      } else {
        await axios.put(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${profileUser._id}/follow`,
          {
            userId: user._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: profileUser._id });
        // send follow notification
        try {
          axios.post(
            "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
            // "http://localhost:3000/api/notifications/",
            {
              sender: user._id,
              recipient: profileUser._id,
              postId: null,
              commentId: null,
              type: "follow",
              seen: false,
            }
          );
        } catch (err) {}
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const TimelineNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
          </div>
          <span className="nav-title">{currentPage}</span>
        </div>
      </div>
    );
  };

  const FollowsNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
          </div>
          <span className="nav-title">
            {currentPage === "Followers" && (
              <>
                {currentPage} {" ("}
                {user.followers.length}
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
      </div>
    );
  };

  const ProfileNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
          </div>
          {profileUser ? (
            <div className="nav-info-container">
              <span className="nav-title">{profileUser.username}</span>
              {username !== user.username && (
                <button className="follow-button" onClick={handleClick}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove /> : <Add />}
                </button>
              )}
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </div>
    );
  };

  const UpdateNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
          </div>
          {user ? (
            <div className="nav-info-container">
              <span className="nav-title">
                {user.username} - update profile
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </div>
    );
  };

  const NotificationsNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
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
      </div>
    );
  };

  const PostNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
          </div>
          {user && post ? (
            <div className="nav-info-container">
              <span className="nav-title">
                {post.comments.length === 1 ? (
                  <>
                    {postUser.username} -{" "}
                    {"(" + post.comments.length + " reply)"}
                  </>
                ) : (
                  <>
                    {postUser.username} -{" "}
                    {"(" + post.comments.length + " replies)"}
                  </>
                )}
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </div>
    );
  };

  const CommentLikesNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
          </div>
          {user && comment ? (
            <div className="nav-info-container">
              <span className="nav-title">
                {comment.likes.length === 1 ? (
                  <>
                    {likesUser.username} -{" "}
                    {"(" + comment.likes.length + "  like)"}
                  </>
                ) : (
                  <>
                    {likesUser.username} -{" "}
                    {"(" + comment.likes.length + " likes)"}
                  </>
                )}
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </div>
    );
  };

  const PostLikesNav = () => {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="mobile-menu-button-container">
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon
                className={
                  sidebarOpen ? "hamburger-icon active" : "hamburger-icon"
                }
              />
            </div>
          </div>
          {user && post ? (
            <div className="nav-info-container">
              <span className="nav-title">
                {post.likes.length === 1 ? (
                  <>
                    {likesUser.username} - {"(" + post.likes.length + " like)"}
                  </>
                ) : (
                  <>
                    {likesUser.username} - {"(" + post.likes.length + " likes)"}
                  </>
                )}
              </span>
            </div>
          ) : (
            <span className="nav-title">Loading...</span>
          )}
        </div>
      </div>
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
