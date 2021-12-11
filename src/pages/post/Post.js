import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PostPage from "../../components/postPage/PostPage";
import Nav from "../../components/nav/Nav";
import "./Post.scss";

export default function Post({
  user,
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
}) {
  const postId = useParams().postId;
  const [post, setPost] = useState("");

  // set current page to"Post on load
  useEffect(() => {
    setCurrentPage("Post");
  });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        // `https://radiant-oasis-77477.herokuapp.com/api/posts/${postId}`
        `http://localhost:3000/api/posts/${postId}`
      );
      setPost(res.data);
    };
    fetchPost();
  }, [postId]);

  return (
    <div className="container" id="container">
      <Nav
        user={user}
        currentPage={currentPage}
        post={post}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <PostPage
        user={user}
        post={post}
        fetchNotifications={fetchNotifications}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}
