import React, { useContext } from "react";
import "./Sidebar.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeRounded,
  HomeOutlined,
  Person,
  PersonOutlineRounded,
  ExitToApp,
  Notifications,
  NotificationsOutlined,
  Group,
  GroupOutlined,
  Language,
  Public,
  GitHub,
  Create,
  CreateOutlined,
} from "@material-ui/icons";
import { logoutCall } from "../../apiCalls";
import Logo from "./Logo";
import KF from "./KF";

export default function Sidebar({
  currentPage,
  notificationsCount,
  sidebarOpen,
  setSidebarOpen,
}) {
  const { user, dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    logoutCall(dispatch);
    setSidebarOpen(false);
    navigate("/login", { replace: true });
  };

  const handleOptionClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={sidebarOpen ? "sidebar active" : "sidebar"}>
      <div className="sidebar-wrapper">
        <div className="sidebar-logo-container">
          <Logo />
        </div>
        {/* TIMELINE */}
        <>
          <Link to="/">
            <div
              onClick={() => handleOptionClick()}
              className={
                "sidebar-link " +
                (currentPage === "Timeline" ? "active-nav-link" : "")
              }
            >
              {currentPage === "Timeline" ? (
                <HomeRounded className="sidebar-icon" />
              ) : (
                <HomeOutlined className="sidebar-icon" />
              )}{" "}
              <span className="sidebar-link-text">Timeline</span>
            </div>
          </Link>
          {/* PROFILE */}
          <Link to={"/profile/" + user.username}>
            <div
              onClick={() => handleOptionClick()}
              className={
                "sidebar-link " +
                (currentPage === "Profile" ? "active-nav-link" : "")
              }
            >
              {currentPage === "Profile" ? (
                <Person className="sidebar-icon" />
              ) : (
                <PersonOutlineRounded className="sidebar-icon" />
              )}{" "}
              <span className="sidebar-link-text">Profile</span>
            </div>
          </Link>
          {/* NOTIFICATIONS */}
          <Link to={"/notifications/" + user.username}>
            <div
              onClick={() => handleOptionClick()}
              className={
                "sidebar-link " +
                (currentPage === "Notifications" ? "active-nav-link" : "")
              }
            >
              {currentPage === "Notifications" ? (
                <Notifications className="sidebar-icon" />
              ) : (
                <NotificationsOutlined className="sidebar-icon" />
              )}{" "}
              <span className="sidebar-link-text">Notifications</span>
              {notificationsCount > 0 && (
                <div className="notification-badge-container">
                  <div className="notification-badge">
                    <span className="badge-count">{notificationsCount}</span>
                  </div>
                </div>
              )}
            </div>
          </Link>
          {/* FOLLOWERS */}
          <Link to={`/${user.username}/followers`}>
            <div
              onClick={() => handleOptionClick()}
              className={
                "sidebar-link " +
                (currentPage === "Followers" ? "active-nav-link" : "")
              }
            >
              {currentPage === "Followers" ? (
                <Group className="sidebar-icon" />
              ) : (
                <GroupOutlined className="sidebar-icon" />
              )}{" "}
              <span className="sidebar-link-text">Followers</span>
            </div>
          </Link>
          {/* FOLLOWING */}
          <Link to={`/${user.username}/following`}>
            <div
              onClick={() => handleOptionClick()}
              className={
                "sidebar-link " +
                (currentPage === "Following" ? "active-nav-link" : "")
              }
            >
              {currentPage === "Following" ? (
                <Group className="sidebar-icon" />
              ) : (
                <GroupOutlined className="sidebar-icon" />
              )}{" "}
              <span className="sidebar-link-text">Following</span>
            </div>
          </Link>
          {/* EXPLORE */}
          <Link to={`/explore/${user._id}`}>
            <div
              onClick={() => handleOptionClick()}
              className={
                "sidebar-link " +
                (currentPage === "Explore" ? "active-nav-link" : "")
              }
            >
              {currentPage === "Explore" ? (
                <Public className="sidebar-icon" />
              ) : (
                <Language className="sidebar-icon" />
              )}{" "}
              <span className="sidebar-link-text">Explore</span>
            </div>
          </Link>
          {/* SHARE */}
          <Link to={`/share`}>
            <div
              onClick={() => handleOptionClick()}
              className={
                "sidebar-link share-link" +
                (currentPage === "Share" ? " active-share-link" : "")
              }
            >
              {currentPage === "Share" ? (
                <Create className="sidebar-icon" />
              ) : (
                <CreateOutlined className="sidebar-icon" />
              )}{" "}
              <span className="sidebar-link-text">Share</span>
            </div>
          </Link>
          {/* LOGOUT */}
          <div className="sidebar-logout">
            <button className="logout-button" onClick={logout}>
              <ExitToApp className="sidebar-icon" />{" "}
              <span className="sidebar-link-text">Logout</span>
            </button>
          </div>
        </>
      </div>
      <div className="sidebar-personal-info-container">
        <a
          href="https://kfig21.github.io/portfolio_2021/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <KF />
        </a>
        <span className="made-by">Made by KFig21</span>
        <a
          href="https://github.com/KFig21/nodebook_client"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub className="sidebar-icon" />
        </a>
      </div>
    </div>
  );
}
