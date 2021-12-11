import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import { Favorite, FavoriteBorder, MoreVert } from "@material-ui/icons";
import noAvi from "../../../assets/noAvatar.png";
import "./Comment.scss";

export default function Comment({
  comment,
  fetchNotifications,
  showDeletePost,
}) {
  const [like, setLike] = useState(comment.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const editBody = useRef();
  const [disableButton, setDisableButton] = useState("");
  const isInvalid = disableButton === "" || disableButton === comment.body;

  // set user like status on comment
  useEffect(() => {
    setIsLiked(comment.likes.includes(currentUser._id));
  }, [currentUser._id, comment.likes]);

  // fetch user on load
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/users?userId=${comment.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [comment.userId]);

  // toggle likes
  const likeHandler = (type) => {
    try {
      axios.put(
        "https://radiant-oasis-77477.herokuapp.com/api/comments/" +
          comment._id +
          "/like",
        { userId: currentUser._id }
      );
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    if (!isLiked) {
      // send like notification
      try {
        axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
          // "http://localhost:3000/api/notifications/",
          {
            sender: currentUser._id,
            recipient: user._id,
            commentId: comment._id,
            postId: comment.postId,
            type: "commentLike",
            seen: false,
          }
        );
      } catch (err) {}
    } else if (isLiked) {
      // delete like notification
      try {
        axios.delete(
          "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
          // "http://localhost:3000/api/notifications/",
          {
            data: {
              sender: currentUser._id,
              recipient: user._id,
              commentId: comment._id,
              postId: comment.postId,
              type: "commentLike",
            },
          }
        );
      } catch (err) {}
    }
    fetchNotifications();
  };

  // delete comment
  const handleDeleteComment = async () => {
    try {
      await axios.delete(
        `https://radiant-oasis-77477.herokuapp.com/api/comments/${comment._id}/`,
        // `http://localhost:3000/api/comments/${comment._id}/`,
        {
          data: {
            userId: currentUser._id,
          },
        }
      );
    } catch (err) {
      alert(err);
    }
    setShowOptions(!showOptions);
    setShowDeleteComment(!showDeleteComment);
    fetchNotifications();
    window.location.reload();
  };

  // edit comment
  const handleEditComment = async (e) => {
    e.preventDefault();
    const updatedComment = {
      userId: currentUser._id,
      body: editBody.current.value,
      edited: true,
      editedtimestamp: Date.now(),
    };
    try {
      await axios.put(
        `https://radiant-oasis-77477.herokuapp.com/api/comments/${comment._id}/`,
        // `http://localhost:3000/api/comments/${comment._id}/`,
        updatedComment
      );
      window.location.reload();
    } catch (err) {}
  };

  // open options functionality
  const handleOptions = () => {
    setShowOptions(!showOptions);
    if (showDeleteComment) {
      setShowDeleteComment(!showDeleteComment);
    }
  };

  // close all options functionality
  const handleCancelAllOptions = () => {
    setShowEdit(false);
    setShowOptions(false);
    setShowDeleteComment(false);
  };

  // if post delete options are open, close comment options{
  useEffect(() => {
    if (showDeletePost) {
      handleCancelAllOptions();
    }
  }, [showDeletePost]);

  return (
    <div className="comment-container">
      <div className="comment-avatar-container">
        <Link to={`/profile/${user.username}`}>
          <img
            className="comment-avatar"
            src={
              user.profilePicture
                ? "data:image/jpg;base64," + user.profilePicture
                : noAvi
            }
            alt=""
          />
        </Link>
      </div>
      <div className="comment-right">
        <div className="comment-body-container">
          <div className="commenter-info-container">
            <div className="comment-info-left">
              <Link to={`/profile/${user.username}`}>
                <span className="comment-username">{user.username}</span>
              </Link>
              <span className="comment-date">{format(comment.createdAt)}</span>
            </div>

            {/* comment options */}
            {(user.username === currentUser.username ||
              currentUser.isAdmin) && (
              <div className="comment-info-right">
                <MoreVert
                  className="comment-options-icon"
                  onClick={() => handleOptions()}
                />
                {showOptions && (
                  <div className="comment-options-div">
                    <button
                      className="comment-options-delete"
                      onClick={() => setShowDeleteComment(!showDeleteComment)}
                    >
                      delete
                    </button>
                    <button
                      className="comment-options-edit"
                      onClick={() => setShowEdit(!showEdit)}
                    >
                      edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* comment body */}
          <div className="comment-body">{comment.body}</div>
          {comment.edited && (
            <span className="comment-edit">
              edit: {format(comment.editedtimestamp)}
            </span>
          )}
          {/* edit input container */}
          {showEdit && (
            <div>
              <form onSubmit={handleEditComment}>
                <textarea
                  className="edit-input"
                  type="text"
                  maxLength={500}
                  ref={editBody}
                  onChange={(e) => setDisableButton(e.target.value)}
                  defaultValue={comment.body ? comment.body : null}
                />
                <div className="edit-option-buttons-div">
                  <button
                    disabled={isInvalid}
                    type="submit"
                    className={
                      "edit-options-button " +
                      (isInvalid ? "invalid" : "edit-options-submit ")
                    }
                  >
                    edit
                  </button>
                  <button
                    className="edit-options-cancel edit-options-button"
                    onClick={() => handleCancelAllOptions()}
                  >
                    cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* delete comment options container */}
          {showDeleteComment && (
            <div className="delete-comment-container">
              <span>Are you sure you want to delete this comment?</span>
              <div className="delete-comment-button-container">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteComment()}
                >
                  DELETE
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setShowDeleteComment(!showDeleteComment)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="comment-like-container">
          {isLiked ? (
            <Favorite className="like-icon liked" onClick={likeHandler} />
          ) : (
            <FavoriteBorder className="like-icon" onClick={likeHandler} />
          )}
          {like === 1 ? (
            isLiked ? (
              <span className="post-like-counter">You like this</span>
            ) : (
              <span className="post-like-counter">1 person likes this</span>
            )
          ) : like > 1 ? (
            isLiked ? (
              like === 2 ? (
                <span className="post-like-counter">
                  You and {like - 1} other person like this
                </span>
              ) : (
                <span className="post-like-counter">
                  You and {like - 1} other people like this
                </span>
              )
            ) : (
              <span className="post-like-counter">{like} people like this</span>
            )
          ) : (
            <span className="post-like-counter">Be the first to like this</span>
          )}
        </div>
      </div>
    </div>
  );
}
