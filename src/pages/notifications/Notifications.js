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
}) {
  return (
    <div className="container" id="container">
      <Nav
        currentPage={currentPage}
        notificationsCount={notificationsCount}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <NotificationsFeed
        fetchNotifications={fetchNotifications}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
