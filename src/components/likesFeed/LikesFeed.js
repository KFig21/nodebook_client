import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Liker from "./liker/Liker";
import Loader from "../../components/loader/Loader";
import { format } from "timeago.js";
import noAvi from "../../assets/noAvatar.png";
import "./LikesFeed.scss";

export default function LikesFeed({
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
  post,
}) {
  const [loading, setLoading] = useState(true);
  const [likers, setLikers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [user, setUser] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // set current page to "Likes" on load
  useEffect(() => {
    setCurrentPage("Likes");
  });

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

  // update page on infinite scroll
  useEffect(() => {
    const getLikers = async () => {
      try {
        const likerList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/likers/${skip}/${currentUser._id}`
          // `http://localhost:3000/api/posts/${post._id}/likers/${skip}/${currentUser._id}`
        );
        setLikers([...likers, ...likerList.data]);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    if (post) {
      getLikers();
    }
  }, [skip]);

  // update page on new follow
  useEffect(() => {
    const getLikers = async () => {
      try {
        const likerList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/likers/0/${currentUser._id}`
          // `http://localhost:3000/api/posts/${post._id}/likers/0/${currentUser._id}`
        );
        setLikers(likerList.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    if (post) {
      getLikers();
    }
  }, [currentUser, post]);

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
                <div className="post-top-center">
                  <div className="post-info">
                    <span className="likesFeed-post-username">
                      {user.username}
                    </span>
                    <span className="likesFeed-post-date">
                      {format(post.createdAt)}
                    </span>
                  </div>
                  <span className="likesFeed-post-body">{post?.body}</span>
                  {post.edited && (
                    <span className="likesFeed-post-edit">
                      edit: {format(post.editedtimestamp)}
                    </span>
                  )}
                </div>
              </div>

              {/* Post content */}
              <div className="likesFeed-post-center">
                {post.img && (
                  <div className="likesFeed-post-img-wrapper">
                    <div className="likesFeed-post-img-container">
                      <img
                        className="likesFeed-post-img"
                        src={
                          "https://nodebook-images.s3.amazonaws.com/" + post.img
                        }
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="followfeed-wrapper">
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
              <span className="no-explore-message">No likes yet</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
