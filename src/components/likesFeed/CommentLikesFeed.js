import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Liker from "./liker/Liker";
import Loader from "../loader/Loader";
import { format } from "timeago.js";
import noAvi from "../../assets/noAvatar.png";
import "./LikesFeed.scss";
import SC from "../../themes/styledComponents";
import { fetchCommentLikers } from "../../helpers/apiCalls";

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
  const { user: currentUser } = useContext(AuthContext);

  setCurrentPage("CommentLikes");

  const getInitialLikers = async () => {
    try {
      const likerList = await fetchCommentLikers(
        comment._id,
        skip,
        currentUser._id
      );
      setLikers(likerList);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getScrollLikers = async () => {
    try {
      const likerList = await fetchCommentLikers(
        comment._id,
        skip,
        currentUser._id
      );
      setLikers([...likers, ...likerList]);
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
    <SC.ScrollThumb
      className="followfeed"
      onScroll={handleScroll}
      onClick={() => setSidebarOpen(false)}
    >
      {loading ? (
        <Loader type={"full-screen"} />
      ) : (
        <div className="likers-feed">
          <div className="likesFeed-post-container">
            <SC.PostUpperLikesPage className="likesFeed-post-upper">
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
                    <SC.PostEdit className="likesFeed-post-edit">
                      edit: {format(comment.editedtimestamp)}
                    </SC.PostEdit>
                  )}
                </div>
              </div>
            </SC.PostUpperLikesPage>
          </div>
          <div className="likesFeed-wrapper">
            {likers.length > 0 ? (
              <>
                {likers.map((liker) => (
                  <Liker
                    liker={liker}
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
    </SC.ScrollThumb>
  );
}
