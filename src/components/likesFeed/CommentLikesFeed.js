import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Liker from "./liker/Liker";
import Loader from "../loader/Loader";
import { format } from "timeago.js";
import noAvi from "../../assets/noAvatar.png";
import "./LikesFeed.scss";

export default function PostLikesFeed({
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
  comment,
  user,
}) {
  const [loading, setLoading] = useState(true);
  const [likers, setLikers] = useState([]);
  const [skip, setSkip] = useState(0);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  setCurrentPage("CommentLikes");

  const handleFollowingStatus = async (followed, userInQuestion) => {
    const updateFollow = async () => {
      try {
        if (followed) {
          await axios.put(
            `https://radiant-oasis-77477.herokuapp.com/api/users/${userInQuestion._id}/unfollow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "UNFOLLOW", payload: userInQuestion._id });
          // delete follow notification
          try {
            axios.delete(
              "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
              // "http://localhost:3000/api/notifications/",
              {
                data: {
                  sender: currentUser._id,
                  recipient: userInQuestion._id,
                  postId: null,
                  commentId: null,
                  type: "follow",
                },
              }
            );
          } catch (err) {}
        } else {
          await axios.put(
            `https://radiant-oasis-77477.herokuapp.com/api/users/${userInQuestion._id}/follow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "FOLLOW", payload: userInQuestion._id });
          // send follow notification
          try {
            axios.post(
              "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
              // "http://localhost:3000/api/notifications/",
              {
                sender: currentUser._id,
                recipient: userInQuestion._id,
                postId: null,
                commentId: null,
                type: "follow",
                seen: false,
              }
            );
          } catch (err) {}
        }
      } catch (err) {}
    };

    updateFollow();
  };

  const getInitialLikers = async () => {
    try {
      const likerList = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/comments/${comment._id}/likers/0/${currentUser._id}`
        // `http://localhost:3000/api/comments/${comment._id}/likers/0/${currentUser._id}`
      );
      setLikers(likerList.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getScrollLikers = async () => {
    try {
      const likerList = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/comments/${comment._id}/likers/${skip}/${currentUser._id}`
        // `http://localhost:3000/api/comments/${comment._id}/likers/${skip}/${currentUser._id}`
      );
      setLikers([...likers, ...likerList.data]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // update page on infinite scroll
  useEffect(() => {
    if (comment) {
      getScrollLikers();
    }
  }, [skip]);

  // update page on new follow
  useEffect(() => {
    if (comment) {
      getInitialLikers();
    }
  }, [currentUser, comment]);

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop > scrollHeight * 0.95) {
      setSkip(likers.length);
    }
  };

  return (
    <div
      className="followfeed"
      onScroll={handleScroll}
      onClick={() => setSidebarOpen(false)}
    >
      {loading ? (
        <Loader type={"full-screen"} />
      ) : (
        <div className="likers-feed">
          <div className="likesFeed-post-container">
            <div className="likesFeed-post-upper">
              <div className="likesFeed-post-top">
                <Link to={`/profile/${user.username}`}>
                  <img
                    className="likesFeed-post-avatar"
                    src={
                      user.avatar
                        ? "https://nodebook-images.s3.amazonaws.com/" +
                          user.avatar
                        : noAvi
                    }
                    alt=""
                  />
                </Link>
                <div className="likesFeed-post-top-center">
                  <div className="likesFeed-post-info">
                    <Link to={`/profile/${user.username}`}>
                      <span className="likesFeed-post-username">
                        {user.username}
                      </span>
                    </Link>
                    <span className="likesFeed-post-date">
                      {format(comment.createdAt)}
                    </span>
                  </div>
                  <span className="likesFeed-post-body">{comment?.body}</span>
                  {comment.edited && (
                    <span className="likesFeed-post-edit">
                      edit: {format(comment.editedtimestamp)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="likesFeed-wrapper">
            {likers.length > 0 ? (
              <>
                {likers.map((liker) => (
                  <Liker
                    liker={liker}
                    handleFollowingStatus={handleFollowingStatus}
                    key={liker._id}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </>
            ) : (
              <span className="no-likes-message">No likes yet</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}