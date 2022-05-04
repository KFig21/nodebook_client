import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import { Favorite, FavoriteBorder, MoreVert } from "@material-ui/icons";
import noAvi from "../../../assets/noAvatar.png";
import "./Comment.scss";
import SC from "../../../themes/styledComponents";
import {
  url,
  deleteComment,
  editComment,
  fetchUserById,
} from "../../../helpers/apiCalls";

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
    setIsLiked(comment.likerIds.includes(currentUser._id));
  }, [currentUser._id, comment.likes]);

  // fetch user on load
  const fetchUser = async () => {
    const res = await fetchUserById(comment.userId);
    setUser(res);
  };
  useEffect(() => {
    fetchUser();
  }, [comment.userId]);

  // toggle likes
  const likeHandler = (type) => {
    try {
      axios.put(
        `${url}/comments/${comment._id}/like`,
        { userId: currentUser._id }
      );
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    if (!isLiked) {
      // send like notification
      try {
        axios.post(
          `${url}/notifications/`,
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
          `${url}/notifications/`,
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
      await deleteComment(comment._id, currentUser._id);
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
      userId: comment.userId,
      body: editBody.current.value,
      edited: true,
      editedtimestamp: Date.now(),
    };
    try {
      await editComment(comment._id, updatedComment);
      window.location.reload();
    } catch (err) {}
  };

  // open options functionality
  const handleOptions = () => {
    setShowOptions(!showOptions);
    if (showEdit) {
      setShowEdit(!showEdit);
    }
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
        {user.username ? (
          <Link to={`/profile/${user.username}`}>
            <img
              className="comment-avatar"
              src={
                user.avatar
                  ? "https://nodebook-images.s3.amazonaws.com/" + user.avatar
                  : noAvi
              }
              alt=""
            />
          </Link>
        ) : (
          // does not allow a link to an undefined user if timeline hasnt fully loaded yet
          <div className="not-a-link">
            <img
              className="comment-avatar"
              src={
                user.avatar
                  ? "https://nodebook-images.s3.amazonaws.com/" + user.avatar
                  : noAvi
              }
              alt=""
            />
          </div>
        )}
      </div>
      <div className="comment-right">
        <SC.CommentBody className="comment-body-container">
          <div className="commenter-info-container">
            <div className="comment-info-left">
              {user.username ? (
                <Link to={`/profile/${user.username}`}>
                  <span className="comment-username">{user.username}</span>
                </Link>
              ) : (
                // does not allow a link to an undefined user if timeline hasnt fully loaded yet
                <div className="not-a-link">
                  <span className="comment-username">Loading</span>
                </div>
              )}
              <span className="comment-date">{format(comment.createdAt)}</span>
            </div>

            {/* comment options */}
            {(user.username === currentUser.username ||
              currentUser.isAdmin) && (
              <div className="comment-info-right">
                <SC.MoreVert>
                  <MoreVert
                    className="comment-options-icon"
                    onClick={() => handleOptions()}
                  />
                </SC.MoreVert>
                {showOptions && !showDeleteComment && !showEdit && (
                  <div className="comment-options-div">
                    <SC.OptionsButtonDeleteColors
                      className="comment-options-delete"
                      onClick={() => setShowDeleteComment(!showDeleteComment)}
                    >
                      delete
                    </SC.OptionsButtonDeleteColors>
                    <SC.OptionsButtonEditColors
                      className="comment-options-edit"
                      onClick={() => setShowEdit(!showEdit)}
                    >
                      edit
                    </SC.OptionsButtonEditColors>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* comment body */}
          <div className="comment-body">{comment.body}</div>
          {comment.edited && (
            <SC.PostEdit className="comment-edit">
              edit: {format(comment.editedtimestamp)}
            </SC.PostEdit>
          )}
          {/* edit input container */}
          {showEdit && (
            <div>
              <form onSubmit={handleEditComment}>
                <SC.EditCommentTextarea
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
                  Delete
                </button>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelAllOptions()}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </SC.CommentBody>
        <div className="comment-like-container">
          {isLiked ? (
            <SC.LikeIconContainer>
              <Favorite className="like-icon liked" onClick={likeHandler} />
            </SC.LikeIconContainer>
          ) : (
            <SC.LikeIconContainer>
              <FavoriteBorder className="like-icon" onClick={likeHandler} />
            </SC.LikeIconContainer>
          )}
          <Link to={`/comment/${comment._id}/likes`}>
            {like === 1 ? (
              isLiked ? (
                <span className="comment-like-counter">You like this</span>
              ) : (
                <span className="comment-like-counter">
                  1 person likes this
                </span>
              )
            ) : like > 1 ? (
              isLiked ? (
                like === 2 ? (
                  <span className="comment-like-counter">
                    You and {like - 1} other person like this
                  </span>
                ) : (
                  <span className="comment-like-counter">
                    You and {like - 1} other people like this
                  </span>
                )
              ) : (
                <span className="comment-like-counter">
                  {like} people like this
                </span>
              )
            ) : (
              <span className="comment-like-counter">
                Be the first to like this
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
