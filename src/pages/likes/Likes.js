import React, { useState, useEffect } from "react";
import LikesFeed from "../../components/likesFeed/LikesFeed";
import Nav from "../../components/nav/Nav";
import { useParams } from "react-router";
import axios from "axios";
import "../follows/Follows.scss";

export default function Followers({
  currentPage,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const postId = useParams().postId;
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${postId}`
        // `http://localhost:3000/api/posts/${postId}`
      );
      setPost(res.data);
    };
    fetchPost();
  }, [postId]);

  return (
    <div className="container" id="container">
      <Nav
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        post={post}
      />
      <LikesFeed
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        post={post}
      />
    </div>
  );
}
