import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/loader/Loader";
import {
  FavoriteBorder,
  MessageOutlined,
  Check,
  DeleteForeverOutlined,
  AddAlertOutlined,
  PersonAddOutlined,
} from "@material-ui/icons";
import "./Notification.scss";
import noAvi from "../../../assets/noAvatar.png";

export default function Notification({
  notification,
  status,
  getNotifications,
}) {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/users?userId=${notification.sender}`
      );
      setUser(res.data);
    };
    fetchUser();

    const fetchPost = async () => {
      setTimeout(async function () {
        let contentId;
        let apiRoute;
        let res;
        if (notification.type === "postLike") {
          contentId = notification.postId;
          apiRoute = "posts/";
        } else if (notification.type === "commentLike") {
          contentId = notification.commentId;
          apiRoute = "comments/";
        } else if (notification.type === "comment") {
          contentId = notification.commentId;
          apiRoute = "comments/";
        } else if (notification.type === "follow") {
          contentId = notification.sender;
          apiRoute = "users?userId=";
        }
        res = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/${apiRoute}${contentId}`
          // `http://localhost:3000/api/${apiRoute}${contentId}`
        );
        setContent(res.data);
        setLoading(false);
      }, 1000);
    };
    fetchPost();
  }, [currentUser]);

  const handleMarkAsRead = async () => {
    const getReadStatus = async () => {
      try {
        axios.put(
          `https://radiant-oasis-77477.herokuapp.com/api/notifications/${notification._id}`
          // `http://localhost:3000/api/notifications/${notification._id}`
        );
      } catch (err) {}
    };
    await getReadStatus();
    getNotifications();
  };

  const handleDelete = async () => {
    const deleteNotification = async () => {
      try {
        axios.delete(
          `https://radiant-oasis-77477.herokuapp.com/api/notifications/${notification._id}`
          // `http://localhost:3000/api/notifications/${notification._id}`
        );
      } catch (err) {}
    };
    await deleteNotification();
    getNotifications();
  };

  const CommentLikeMsg = () => {
    return (
      <>
        <span className="notification-message">
          liked your comment {format(notification.createdAt)}
        </span>

        <FavoriteBorder className="notification-icon like-icon" />
      </>
    );
  };

  const PostLikeMsg = () => {
    return (
      <>
        <span className="notification-message">
          {" "}
          liked your post {format(notification.createdAt)}
        </span>

        <FavoriteBorder className="notification-icon like-icon" />
      </>
    );
  };

  const CommentMsg = () => {
    return (
      <>
        <span className="notification-message">
          {" "}
          commented on your post {format(notification.createdAt)}
        </span>

        <MessageOutlined className="notification-icon message-icon" />
      </>
    );
  };

  const FollowMsg = () => {
    return (
      <>
        <span className="notification-message">
          {" "}
          followed you {format(notification.createdAt)}
        </span>

        <PersonAddOutlined className="notification-icon follow-icon" />
      </>
    );
  };

  return (
    <div className="notification-container">
      {loading ? (
        <Loader type={"notification"} />
      ) : (
        <>
          <Link
            to={
              notification.type === "follow"
                ? `/profile/${user.username}`
                : `/post/${notification.postId}`
            }
            className="notification-link"
          >
            <div className="notification-wrapper">
              <div className="notification-top">
                <Link to={`/profile/${user.username}`}>
                  <img
                    className="notification-avatar"
                    src={
                      user.avatar
                        ? "https://nodebook-images.s3.amazonaws.com/" +
                          user.avatar
                        : noAvi
                    }
                    alt=""
                  />
                </Link>
                <div className="notification-desc">
                  <Link
                    className="notification-username-link"
                    to={`/profile/${user.username}`}
                  >
                    <span className="notification-username">
                      {user.username !== currentUser.username
                        ? user.username
                        : "You"}
                    </span>
                  </Link>
                  {notification.type === "commentLike" && <CommentLikeMsg />}
                  {notification.type === "postLike" && <PostLikeMsg />}
                  {notification.type === "comment" && <CommentMsg />}
                  {notification.type === "follow" && <FollowMsg />}
                </div>
              </div>
              {notification.type !== "follow" && (
                <div className="content-body">
                  <span>{content.body}</span>
                  {content.img && (
                    <img
                      className="notification-img"
                      src={
                        "https://nodebook-images.s3.amazonaws.com/" +
                        content.img
                      }
                      alt=""
                    />
                  )}
                </div>
              )}
              {notification.type === "follow" && (
                <span className="content-follow">View their profile</span>
              )}
            </div>
          </Link>
          <div className="notification-buttons-container">
            <button
              className="notification-read-button"
              onClick={handleMarkAsRead}
            >
              {status === "new" ? (
                <Check className="button-icon" />
              ) : (
                <AddAlertOutlined className="button-icon" />
              )}
            </button>
            <button
              className="notification-delete-button"
              onClick={handleDelete}
            >
              <DeleteForeverOutlined className="button-icon" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
