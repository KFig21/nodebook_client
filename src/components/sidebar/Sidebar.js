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
} from "@material-ui/icons";
import { logoutCall } from "../../apiCalls";
import Logo from "./Logo";

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
    <div className={"sidebar " + (sidebarOpen && "active")}>
      <div className="sidebar-wrapper">
        <Logo />
        {/* TIMELINE */}
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
            Timeline
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
            Profile
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
            Notifications
            {notificationsCount > 0 && (
              <div className="notification-badge">{notificationsCount}</div>
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
            Followers
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
            Following
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
            Explore
          </div>
        </Link>
        {/* LOGOUT */}
        <div className="sidebar-logout">
          <button className="logout-button" onClick={logout}>
            <ExitToApp className="sidebar-icon" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
