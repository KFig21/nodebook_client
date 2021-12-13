import React, { useEffect, useState, useContext } from "react";
import "./Timeline.scss";
import axios from "axios";
// component imports
import Loader from "../../components/loader/Loader";
import Share from "../share/Share";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";

export default function Timeline({
  fetchNotifications,
  setSidebarOpen,
  setCurrentPage,
}) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const { user } = useContext(AuthContext);

  // set current page to "Timeline" on load
  useEffect(() => {
    setCurrentPage("Timeline");
  });

  let username = user.username;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/timeline/${user._id}/${skip}`
        // `http://localhost:3000/api/posts/timeline/${user._id}/${skip}`
      );
      setPosts([...posts, ...res.data]);
      setLoading(false);
    };
    if (username) {
      fetchPosts();
    }
  }, [username, user._id, skip]);

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop > scrollHeight * 0.85) {
      setSkip(posts.length);
    }
  };

  return (
    <div
      className="timeline"
      onScroll={handleScroll}
      onClick={() => setSidebarOpen(false)}
    >
      <>
        {loading ? (
          <Loader type={"full-screen"} />
        ) : (
          <div onScroll={handleScroll}>
            <div className="timeline-wrapper">
              {(!username || username === user.username) && (
                <div className="share-dektop-container">
                  <Share />
                </div>
              )}
              {posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  page="timeline"
                  fetchNotifications={fetchNotifications}
                />
              ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
