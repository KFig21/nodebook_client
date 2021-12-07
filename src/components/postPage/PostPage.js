import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Post from "../post/Post";

export default function PostPage({
  post,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (post) {
      setLoading(false);
    }
  }, [post]);

  return (
    <div
      className="timeline"
      onClick={() => {
        setSidebarOpen(false);
      }}
    >
      <>
        {loading ? (
          <Loader type={"full-screen"} />
        ) : (
          <div>
            <div className="timeline-wrapper">
              <Post
                key={post._id}
                post={post}
                page="postPage"
                fetchNotifications={fetchNotifications}
                sidebarOpen={sidebarOpen}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
}
