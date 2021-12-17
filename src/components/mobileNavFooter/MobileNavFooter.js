import React, { useContext } from "react";
import "./MobileNavFooter.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  HomeRounded,
  HomeOutlined,
  Person,
  PersonOutlineRounded,
  Notifications,
  NotificationsOutlined,
  Create,
  CreateOutlined,
} from "@material-ui/icons";
import SC from "../../themes/styledComponents";

export default function MobileNavFooter({
  currentPage,
  notificationsCount,
  sidebarOpen,
  setSidebarOpen,
}) {
  const { user } = useContext(AuthContext);
  return (
    <SC.NavFooter
      className="mobile-nav-footer"
      style={sidebarOpen ? { pointerEvents: "none" } : {}}
    >
      <div className="nav-footer-button-container">
        {/* PROFILE */}
        <Link to={"/profile/" + user.username}>
          <div
            className={
              "footer-link " +
              (currentPage === "Profile" ? "active-nav-link" : "")
            }
          >
            {currentPage === "Profile" ? (
              <Person className="footer-icon" />
            ) : (
              <PersonOutlineRounded className="footer-icon" />
            )}
          </div>
        </Link>
        {/* TIMELINE */}
        <Link to="/">
          <div
            className={
              "footer-link " +
              (currentPage === "Timeline" ? "active-nav-link" : "")
            }
          >
            {currentPage === "Timeline" ? (
              <HomeRounded className="footer-icon" />
            ) : (
              <HomeOutlined className="footer-icon" />
            )}
          </div>
        </Link>
        {/* NOTIFICATIONS */}
        <Link to={"/notifications/" + user.username}>
          <div
            className={
              "footer-link " +
              (currentPage === "Notifications" ? "active-nav-link" : "")
            }
          >
            {currentPage === "Notifications" ? (
              <div className="notifications-icon-container">
                <Notifications className="footer-icon" />
                {notificationsCount > 0 && (
                  <div className="footer-notification-badge-container">
                    <SC.NotificationBadge className="footer-notification-badge">
                      <span className="footer-badge-count">
                        {notificationsCount}
                      </span>
                    </SC.NotificationBadge>
                  </div>
                )}
              </div>
            ) : (
              <div className="notifications-icon-container">
                <NotificationsOutlined className="footer-icon" />
                {notificationsCount > 0 && (
                  <div className="footer-notification-badge-container">
                    <SC.NotificationBadge className="footer-notification-badge">
                      <span className="footer-badge-count">
                        {notificationsCount > 99 ? "+" : notificationsCount}
                      </span>
                    </SC.NotificationBadge>
                  </div>
                )}
              </div>
            )}
          </div>
        </Link>
        {/* Share */}
        <Link to="/share">
          <div
            className={
              "footer-link " +
              (currentPage === "Share" ? "active-nav-link" : "")
            }
          >
            {currentPage === "Share" ? (
              <Create className="footer-icon" />
            ) : (
              <CreateOutlined className="footer-icon" />
            )}
          </div>
        </Link>
      </div>
    </SC.NavFooter>
  );
}
