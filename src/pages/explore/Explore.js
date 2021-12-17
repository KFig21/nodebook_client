import React from "react";
import "../follows/Follows.scss";
import ExploreFeed from "../../components/exploreFeed/ExploreFeed";
import Nav from "../../components/nav/Nav";

export default function Followers({
  currentPage,
  setCurrentPage,
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
      <ExploreFeed
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
