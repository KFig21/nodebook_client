import React from "react";
import NotificationsFeed from "../../components/notificationsFeed/NotificationsFeed";
import Nav from "../../components/nav/Nav";

export default function Notifications({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  notificationsCount,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
}) {
  return (
    <div className="container" id="container">
      <Nav
        currentPage={currentPage}
        notificationsCount={notificationsCount}
        sidebarOpen={sidebarOpen}
        handleSidebar={handleSidebar}
      />
      <NotificationsFeed
        fetchNotifications={fetchNotifications}
        setCurrentPage={setCurrentPage} 
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
