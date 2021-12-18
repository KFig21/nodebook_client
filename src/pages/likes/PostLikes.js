import React, { useState, useEffect } from "react";
import PostLikesFeed from "../../components/likesFeed/PostLikesFeed";
import ImageModal from "../../components/Modals/ImageModals/ImageModal";
import Nav from "../../components/nav/Nav";
import { useParams } from "react-router";
import { fetchUserById, fetchPostById } from "../../helpers/apiCalls";
import "../follows/Follows.scss";

export default function PostLikes({
  currentPage,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
}) {
  const postId = useParams().postId;
  const [post, setPost] = useState("");
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

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
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleSidebar={handleSidebar}
        post={post}
        likesUser={user}
      />
      {showModal && (
        <ImageModal
          post={post}
          directional={false}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <PostLikesFeed
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        post={post}
        user={user}
        handleSetModal={handleSetModal}
      />
    </div>
  );
}
