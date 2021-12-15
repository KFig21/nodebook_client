import React, { useEffect, useState, useContext } from "react";
import "./Timeline.scss";
import axios from "axios";
// component imports
import Loader from "../../components/loader/Loader";
import Share from "../share/Share";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";
import ImageModal from "../imageModal/ImageModal";

export default function Timeline({
  fetchNotifications,
  setSidebarOpen,
  setCurrentPage,
}) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);

  // set current page to "Timeline" on load
  useEffect(() => {
    setCurrentPage("Timeline");
  });

  let username = user.username;

  const fetchPosts = async () => {
    const res = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/posts/timeline/${user._id}/${skip}`
      // `http://localhost:3000/api/posts/timeline/${user._id}/${skip}`
    );
    setPosts([...posts, ...res.data]);
    setTimeout(async function () {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
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

  // image modal
  const handleSetModal = (post) => {
    setImage(post);
    setTimeout(function () {
      setShowModal(true);
    }, 250);
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
            {showModal && (
              <ImageModal
                post={image}
                directional={true}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            )}
            <div className="timeline-wrapper">
              {(!username || username === user.username) && (
                <div className="share-desktop-container">
                  <Share />
                </div>
              )}
              {posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  page="timeline"
                  fetchNotifications={fetchNotifications}
                  handleSetModal={handleSetModal}
                />
              ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
