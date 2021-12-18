import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link, useNavigate } from "react-router-dom";
import { MoreVert, Favorite, FavoriteBorder } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import Comment from "./comment/Comment";
import noAvi from "../../assets/noAvatar.png";
import "./Post.scss";
import SC from "../../themes/styledComponents";
import {
  deletePost,
  fetchPostComments,
  fetchUserById,
  submitComment,
  editPost,
} from "../../helpers/apiCalls";

export default function Post({
  post,
  page,
  fetchNotifications,
  sidebarOpen,
  handleSetModal,
}) {
  const [like, setLike] = useState(post.likerIds.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const commentRef = useRef();
  const editBody = useRef();
  let navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [disableButton, setDisableButton] = useState("");
  const isInvalid = disableButton === "" || disableButton === post.body;
  const [disableComment, setDisableComment] = useState("");
  const commentButtonIsInvalid = disableComment === "";

  // get likes
  useEffect(() => {
    setIsLiked(post.likerIds.includes(currentUser._id));
  }, [currentUser._id, post.likerIds]);

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetchUserById(post.userId);
      setUser(res);
    };
    fetchUser();
  }, [post.userId]);

  // get initial comments
  const getInitialComments = async () => {
    const res = await fetchPostComments(post._id, 0);
    setComments(
      res.sort((p1, p2) => {
        return new Date(p1.createdAt) - new Date(p2.createdAt);
      })
    );
  };

  useEffect(() => {
    if (post.comments) {
      getInitialComments();
    }
  }, [post, user]);

  // toggle likes
  const likeHandler = () => {
    try {
      axios.put(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/like`,
        // `http://localhost:3000/api/posts/${post._id}/like`,
        { userId: currentUser._id, postId: post._id }
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
            postId: post._id,
            commentId: null,
            type: "postLike",
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
              postId: post._id,
              commentId: null,
              type: "postLike",
            },
          }
        );
      } catch (err) {}
    }
    fetchNotifications();
  };

  // submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const newComment = {
      userId: currentUser._id,
      body: commentRef.current.value,
      postId: post._id,
      sender: currentUser._id,
      recipient: user._id,
      type: "comment",
      seen: false,
    };
    // send comment post request
    try {
      await submitComment(post._id, newComment);
    } catch (err) {}
    window.location.reload();
    fetchNotifications();
  };

  // edit post
  const handleEditPost = async (e) => {
    e.preventDefault();
    const updatedPost = {
      userId: currentUser._id,
      body: editBody.current.value,
      edited: true,
      editedtimestamp: Date.now(),
    };
    try {
      await editPost(post._id, updatedPost);
      window.location.reload();
    } catch (err) {}
  };

  // delete post
  const handleDeletePost = async () => {
    try {
      await deletePost(post._id, currentUser._id);
    } catch (err) {
      alert(err);
    }
    setShowOptions(!showOptions);
    setShowDeletePost(!showDeletePost);
    fetchNotifications();
    navigate("/", { replace: true });
    window.location.reload();
  };

  // options button functionality
  const handleShowOptions = () => {
    setShowOptions(!showOptions);
    if (showEdit) {
      setShowEdit(!showEdit);
    }
    if (showDeletePost) {
      setShowEdit(!showDeletePost);
    }
  };

  // close all options
  const handleCancelAllOptions = () => {
    setShowEdit(false);
    setShowOptions(false);
    setShowDeletePost(false);
  };

  return (
    <div className="post">
      {showDeletePost && (
        <div className="delete-post-container">
          <SC.DeletePostMessage className="delete-post-message">
            Are you sure you want to delete this post?
          </SC.DeletePostMessage>
          <div className="delete-post-button-container">
            <button
              className="delete-button"
              onClick={() => handleDeletePost()}
            >
              DELETE
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
      <div
        className="post-wrapper"
        style={sidebarOpen ? { pointerEvents: "none" } : {}}
      >
        <SC.PostUpper className="post-upper">
          <div className="post-top">
            {user.username ? (
              <Link to={`/profile/${user.username}`}>
                <img
                  className="post-avatar"
                  src={
                    user.avatar
                      ? "https://nodebook-images.s3.amazonaws.com/" +
                        user.avatar
                      : noAvi
                  }
                  alt=""
                />
              </Link>
            ) : (
              // does not allow a link to an undefined user if timeline hasnt fully loaded yet
              <div className="not-a-link">
                <img
                  className="post-avatar"
                  src={
                    user.avatar
                      ? "https://nodebook-images.s3.amazonaws.com/" +
                        user.avatar
                      : noAvi
                  }
                  alt=""
                />
              </div>
            )}

            <div className="post-top-center">
              <div className="post-info">
                {user.username ? (
                  <Link to={`/profile/${user.username}`}>
                    <span className="post-username">{user.username}</span>
                  </Link>
                ) : (
                  // does not allow a link to an undefined user if timeline hasnt fully loaded yet
                  <div className="not-a-link">
                    <span className="post-username">Loading</span>
                  </div>
                )}
                <span className="post-date">{format(post.createdAt)}</span>
              </div>
              <span className="post-body">{post?.body}</span>
              {/* edit input container */}
              {showEdit && (
                <div className="post-edit-wrapper">
                  <div className="post-edit-form-container">
                    <form onSubmit={handleEditPost}>
                      <textarea
                        className="edit-input"
                        type="text"
                        maxLength={500}
                        ref={editBody}
                        onChange={(e) => setDisableButton(e.target.value)}
                        defaultValue={post?.body ? post?.body : null}
                      />
                      <div className="edit-form-buttons-container">
                        <button
                          disabled={isInvalid}
                          type="submit"
                          className={
                            isInvalid ? "invalid" : "edit-options-submit"
                          }
                        >
                          edit
                        </button>
                        <button
                          className="edit-options-cancel"
                          onClick={() => handleCancelAllOptions()}
                        >
                          cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {post.img && (
                <div
                  className="post-img-wrapper"
                  onClick={() => handleSetModal(post)}
                >
                  <div className="post-img-container">
                    <img
                      className="post-img"
                      src={
                        "https://nodebook-images.s3.amazonaws.com/" + post.img
                      }
                      alt=""
                    />
                  </div>
                </div>
              )}
              {post.edited && (
                <SC.PostEdit className="post-edit">
                  edit: {format(post.editedtimestamp)}
                </SC.PostEdit>
              )}
            </div>
            {/* options button - delete/edit */}
            {(user.username === currentUser.username ||
              currentUser.isAdmin) && (
              <div className="post-top-right">
                <SC.MoreVert>
                  <MoreVert
                    className="post-options-icon"
                    onClick={() => handleShowOptions()}
                  />
                </SC.MoreVert>
                {showOptions && !showDeletePost && !showEdit && (
                  <div className="post-options-div">
                    <button
                      className="post-options-delete"
                      onClick={() => setShowDeletePost(!showDeletePost)}
                    >
                      delete post
                    </button>
                    <button
                      className="post-options-edit"
                      onClick={() => setShowEdit(!showEdit)}
                    >
                      edit post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="post-bottom">
            <div className="post-bottom-left">
              {isLiked ? (
                <SC.LikeIconContainer>
                  <Favorite className="like-icon liked" onClick={likeHandler} />
                </SC.LikeIconContainer>
              ) : (
                <SC.LikeIconContainer>
                  <FavoriteBorder className="like-icon" onClick={likeHandler} />
                </SC.LikeIconContainer>
              )}
              <Link to={`/post/${post._id}/likes`}>
                {like === 1 ? (
                  isLiked ? (
                    <span className="post-like-counter">You like this</span>
                  ) : (
                    <span className="post-like-counter">
                      1 person likes this
                    </span>
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
                    <span className="post-like-counter">
                      {like} people like this
                    </span>
                  )
                ) : (
                  <span className="post-like-counter">
                    Be the first to like this
                  </span>
                )}
              </Link>
            </div>
          </div>
        </SC.PostUpper>
        <div className="post-comments-container">
          <div className="post-comment-input-container">
            <SC.CommentTextarea
              className="comment-input"
              type="text"
              ref={commentRef}
              onChange={(e) => setDisableComment(e.target.value)}
              placeholder="add a comment!"
              maxLength={500}
            />
            <form
              onSubmit={handleSubmitComment}
              className="post-comment-button-container"
            >
              <SC.CommentButton
                type="submit"
                disabled={commentButtonIsInvalid}
                className={
                  commentButtonIsInvalid
                    ? "invalid-comment-button comment-button"
                    : "comment-button"
                }
              >
                comment
              </SC.CommentButton>
            </form>
          </div>
          {/* postPage - show all comments */}
          {comments && comments.length > 0 && page === "postPage" && (
            <div className="post-comments">
              {comments.map((comment) => (
                <Comment
                  comment={comment}
                  fetchNotifications={fetchNotifications}
                  showDeletePost={showDeletePost}
                />
              ))}
            </div>
          )}
          {/* timeline - show comments if 1 or 2 */}
          {comments &&
            comments.length > 0 &&
            comments.length < 3 &&
            page === "timeline" && (
              <div className="post-comments">
                {comments.map((comment) => (
                  <Comment
                    comment={comment}
                    fetchNotifications={fetchNotifications}
                    showDeletePost={showDeletePost}
                  />
                ))}
              </div>
            )}
          {/* timeline - show 'view more comments' button */}
          {comments && comments.length > 2 && page === "timeline" && (
            <div className="post-comments">
              <Comment
                comment={comments[0]}
                fetchNotifications={fetchNotifications}
                showDeletePost={showDeletePost}
              />
              <SC.ViewMoreCommentsButton
                className="view-more-comments-button"
                style={sidebarOpen ? { pointerEvents: "none" } : {}}
              >
                <Link to={"/post/" + post._id}>
                  View more comments {"(" + post.comments.length + ")"}
                </Link>
              </SC.ViewMoreCommentsButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
