import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PostPage from "../../components/postPage/PostPage";
import Nav from "../../components/nav/Nav";
import ImageModal from "../../components/Modals/ImageModals/ImageModal";
import "./Post.scss";

export default function Post({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
}) {
  const postId = useParams().postId;
  const [post, setPost] = useState("");
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  setCurrentPage("Post");

  const getPostInfo = async () => {
    const fetchPost = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/posts/${postId}`
      // `http://localhost:3000/api/posts/${postId}`
    );
    setPost(fetchPost.data);
    const fetchUser = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/users?userId=${fetchPost.data.userId}`
      // `http://localhost:3000/api/users?userId=${fetchPost.data.userId}`
    );
    setUser(fetchUser.data);
  };

  useEffect(() => {
    getPostInfo();
  }, [postId]);

  // image modal
  const handleSetModal = (post) => {
    setTimeout(function () {
      setShowModal(true);
    }, 250);
  };

  return (
    <div className="container" id="container">
      <Nav
        postUser={user}
        post={post}
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        handleSidebar={handleSidebar}
      />
      {showModal && (
        <ImageModal
          post={post}
          directional={false}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <PostPage
        post={post}
        fetchNotifications={fetchNotifications}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        handleSetModal={handleSetModal}
      />
    </div>
  );
}
