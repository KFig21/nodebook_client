import React, { useState, useEffect } from "react";
import CommentLikesFeed from "../../components/likesFeed/CommentLikesFeed";
import Nav from "../../components/nav/Nav";
import { useParams } from "react-router";
import "../follows/Follows.scss";
import { fetchUserById, fetchCommentById } from "../../helpers/apiCalls";

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
    const fetchComment = await fetchCommentById(commentId);
    setComment(fetchComment);
    const fetchUser = await fetchUserById(fetchComment.userId);
    setUser(fetchUser);
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
