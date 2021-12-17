import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import PostPagePost from "../post/PostPagePost";
import axios from "axios";
import SC from "../../themes/styledComponents";

export default function PostPage({
  post,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
  handleSetModal,
}) {
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (post) {
      fetchUser();
    }
  }, [post]);

  const getInitialComments = async () => {
    const fetchComments = async () => {
      setSkip(0);
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/comments/0`
        // `http://localhost:3000/api/posts/${post._id}/comments/0`
      );
      setComments(
        res.data.sort((p1, p2) => {
          return new Date(p1.createdAt) - new Date(p2.createdAt);
        })
      );
      setTimeout(async function () {
        setLoading(false);
      }, 1000);
    };
    if (post.comments && post._id) {
      fetchComments();
    }
  };

  const fetchUser = async () => {
    const res = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/users?userId=${post.userId}`
      // `http://localhost:3000/api/users?userId=${post.userId}`
    );
    setUser(res.data);
    getInitialComments();
  };

  const getScrollComments = async () => {
    const res = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/posts/${post._id}/comments/${skip}`
      // `http://localhost:3000/api/posts/${post._id}/comments/${skip}`
    );
    setComments([...comments, ...res.data]);
    setLoading(false);
  };

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop > scrollHeight * 0.85) {
      setSkip(comments.length);
    }
  };

  useEffect(() => {
    // gets comments on scroll
    getScrollComments();
  }, [skip]);

  return (
    <SC.ScrollThumb
      className="timeline"
      onClick={() => {
        setSidebarOpen(false);
      }}
      onScroll={handleScroll}
    >
      <>
        {loading ? (
          <Loader type={"full-screen"} />
        ) : (
          <div>
            <div className="timeline-wrapper">
              <PostPagePost
                key={post._id}
                post={post}
                user={user}
                comments={comments}
                page="postPage"
                fetchNotifications={fetchNotifications}
                sidebarOpen={sidebarOpen}
                getInitialComments={getInitialComments}
                handleSetModal={handleSetModal}
              />
            </div>
          </div>
        )}
      </>
    </SC.ScrollThumb>
  );
}
