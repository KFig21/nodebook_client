import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PostPage from "../../components/postPage/PostPage";
import Nav from "../../components/nav/Nav";
import "./Post.scss";

export default function Post({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
}) {
  const postId = useParams().postId;
  const [post, setPost] = useState("");
  const [user, setUser] = useState({});

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

  return (
    <div className="container" id="container">
      <Nav
        postUser={user}
        post={post}
        currentPage={currentPage}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <PostPage
        post={post}
        fetchNotifications={fetchNotifications}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}
