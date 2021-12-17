import React, { useState, useEffect } from "react";
import CommentLikesFeed from "../../components/likesFeed/CommentLikesFeed";
import Nav from "../../components/nav/Nav";
import { useParams } from "react-router";
import axios from "axios";
import "../follows/Follows.scss";

export default function CommentLikes({
  currentPage,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
}) {
  const commentId = useParams().commentId;
  const [comment, setComment] = useState("");
  const [user, setUser] = useState({});

  const getCommentInfo = async () => {
    const fetchComment = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/comments/${commentId}`
      // `http://localhost:3000/api/comments/${commentId}`
    );
    setComment(fetchComment.data);
    const fetchUser = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/users?userId=${fetchComment.data.userId}`
      // `http://localhost:3000/api/users?userId=${fetchComment.data.userId}`
    );
    setUser(fetchUser.data);
  };

  useEffect(() => {
    getCommentInfo();
  }, [commentId]);

  return (
    <div className="container" id="container">
      <Nav
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleSidebar={handleSidebar}
        comment={comment}
        likesUser={user}
      />
      <CommentLikesFeed
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        comment={comment}
        user={user}
      />
    </div>
  );
}
