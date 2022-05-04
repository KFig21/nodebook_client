import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PostPage from "../../components/postPage/PostPage";
import Nav from "../../components/nav/Nav";
import ImageModal from "../../components/Modals/ImageModals/ImageModal";
import "./Post.scss";
import { fetchUserById, fetchPostById } from "../../helpers/apiCalls";

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
    const fetchPost = await fetchPostById(postId);
    setPost(fetchPost);
    const fetchUser = await fetchUserById(fetchPost.userId);
    setUser(fetchUser);
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
