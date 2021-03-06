import React from "react";
import "./Home.scss";
import Timeline from "../../components/timeline/Timeline";
import Nav from "../../components/nav/Nav";

export default function Home({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
}) {
  return (
    <div className="container" id="container">
      <Nav
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        handleSidebar={handleSidebar}
      />
      <Timeline
        setCurrentPage={setCurrentPage}
        fetchNotifications={fetchNotifications}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
