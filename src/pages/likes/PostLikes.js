import React, { useState, useEffect } from "react";
import PostLikesFeed from "../../components/likesFeed/PostLikesFeed";
import Nav from "../../components/nav/Nav";
import { useParams } from "react-router";
import axios from "axios";
import "../follows/Follows.scss";

export default function PostLikes({
  currentPage,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const postId = useParams().postId;
  const [post, setPost] = useState("");
  const [user, setUser] = useState({});

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
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        post={post}
        likesUser={user}
      />
      <PostLikesFeed
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        post={post}
        user={user}
      />
    </div>
  );
}
