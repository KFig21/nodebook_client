import React from "react";
import "./Follows.scss";
import FollowFeed from "../../components/followFeed/FollowFeed";
import Nav from "../../components/nav/Nav";

export default function Followers({
  currentPage,
  setCurrentPage,
  follow,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
}) {
  return (
    <div className="container" id="container">
      <Nav
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleSidebar={handleSidebar}
      />
      <FollowFeed
        follow={follow}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}
