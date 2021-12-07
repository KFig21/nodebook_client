import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link, useNavigate } from "react-router-dom";
import { MoreVert, Favorite, FavoriteBorder } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import "./Post.scss";
import Comment from "./comment/Comment";

export default function Post({ post, page, fetchNotifications, sidebarOpen }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const commentRef = useRef();
  const editBody = useRef();
  let navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [disableButton, setDisableButton] = useState("");
  const isInvalid = disableButton === "" || disableButton === post.body;
  const [disableComment, setDisableComment] = useState("");
  const commentButtonIsInvalid = disableComment === "";
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // get likes
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  // get comments
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/comments`
      );
      setComments(
        res.data.sort((p1, p2) => {
          return new Date(p1.createdAt) - new Date(p2.createdAt);
        })
      );
    };
    if (post.comments) {
      fetchComments();
    }
  }, [user]);

  // toggle likes
  const likeHandler = () => {
    try {
      axios.put(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/like`,
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
  const submitComment = async (e) => {
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
      await axios.post(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/comment`,
        // `http://localhost:3000/api/posts/${post._id}/comment`,
        newComment
      );
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
      await axios.put(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}`,
        // `http://localhost:3000/api/posts/${post._id}/`,
        updatedPost
      );
      window.location.reload();
    } catch (err) {}
  };

  // delete post
  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/`,
        // `http://localhost:3000/api/posts/${post._id}/`,
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
    setShowDelete(!showDelete);
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
    if (showDelete) {
      setShowEdit(!showDelete);
    }
  };

  // close all options
  const handleCancelAllOptions = () => {
    setShowEdit(false);
    setShowOptions(false);
    setShowDelete(false);
  };

  return (
    <div className="post">
      {showDelete && (
        <div className="delete-post-container">
          <span className="delete-post-message">
            Are you sure you want to delete this post?
          </span>
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
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/profile/${user.username}`}>
              <img
                className="post-avatar"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "assets/noAvatar.png"
                }
                alt=""
              />
              <span className="post-username">{user.username}</span>
            </Link>
            <span className="post-date">{format(post.createdAt)}</span>
          </div>
          {/* options button - delete/edit */}
          {(user.username === currentUser.username || currentUser.isAdmin) && (
            <div className="post-top-right">
              <MoreVert
                className="post-options-icon"
                onClick={() => handleShowOptions()}
              />
              {showOptions && !showDelete && !showEdit && (
                <div className="post-options-div">
                  <button
                    className="post-options-delete"
                    onClick={() => setShowDelete(!showDelete)}
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
        {/* Post content */}
        <div className="post-center">
          <span className="post-body">{post?.body}</span>
          {/* edit input container */}
          {showEdit && (
            <div>
              <form onSubmit={handleEditPost}>
                <textarea
                  className="edit-input"
                  type="text"
                  maxlength="500"
                  ref={editBody}
                  onChange={(e) => setDisableButton(e.target.value)}
                  defaultValue={post?.body ? post?.body : null}
                />
                <button
                  disabled={isInvalid}
                  type="submit"
                  className={isInvalid ? "invalid" : "edit-options-submit "}
                >
                  edit
                </button>
                <button
                  className="edit-options-cancel"
                  onClick={() => handleCancelAllOptions()}
                >
                  cancel
                </button>
              </form>
            </div>
          )}
          {post.edited && (
            <span className="post-edit">
              edit: {format(post.editedtimestamp)}
            </span>
          )}
          <img className="post-img" src={PF + post.img} alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            {isLiked ? (
              <Favorite className="like-icon" onClick={likeHandler} />
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
                <span className="post-like-counter">
                  {like} people like this
                </span>
              )
            ) : (
              <span className="post-like-counter">
                Be the first to like this
              </span>
            )}
          </div>
        </div>
        <div className="post-comments-container">
          <div className="post-comment-input-container">
            <textarea
              className="comment-input"
              type="text"
              ref={commentRef}
              onChange={(e) => setDisableComment(e.target.value)}
              placeholder="add a comment!"
            />
            <form onSubmit={submitComment}>
              <button type="submit" disabled={commentButtonIsInvalid}>
                comment
              </button>
            </form>
          </div>
          {/* postPage - show all comments */}
          {comments && comments.length > 0 && page === "postPage" && (
            <div className="post-comments">
              {comments.map((comment) => (
                <Comment
                  comment={comment}
                  fetchNotifications={fetchNotifications}
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
              />
              <Link to={"/post/" + post._id}>
                <button className="view-more-comments-button">
                  View more comments {"(" + post.comments.length + ")"}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
