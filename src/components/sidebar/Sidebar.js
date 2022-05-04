import React, { useContext } from "react";
import "./Sidebar.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
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
  ColorLens,
} from "@material-ui/icons";
import Logo from "./Logo";
import KF from "./KF";
// themes
import SC from "../../themes/styledComponents";

export default function Sidebar({
  currentPage,
  notificationsCount,
  sidebarOpen,
  setSidebarOpen,
  handleThemeModal,
  handleLogoutModal,
}) {
  const { user } = useContext(AuthContext);

  const handleOptionClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <SC.Sidebar className={sidebarOpen ? "sidebar active" : "sidebar"}>
        {/* <div className={sidebarOpen ? "sidebar active" : "sidebar"}> */}
        <div className="sidebar-wrapper">
          <SC.SidebarLogoTop className="sidebar-logo-container">
            <Logo />
          </SC.SidebarLogoTop>
          {/* TIMELINE */}
          <>
            <Link to="/">
              <SC.SidebarLink
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
              </SC.SidebarLink>
            </Link>
            {/* PROFILE */}
            <Link to={"/profile/" + user.username}>
              <SC.SidebarLink
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
              </SC.SidebarLink>
            </Link>
            {/* NOTIFICATIONS */}
            <Link to={"/notifications/" + user.username}>
              <SC.SidebarLink
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
                    <SC.NotificationBadge className="notification-badge">
                      <SC.NotificationBadgeCount className="badge-count">
                        {notificationsCount > 99 ? "+" : notificationsCount}
                      </SC.NotificationBadgeCount>
                    </SC.NotificationBadge>
                  </div>
                )}
              </SC.SidebarLink>
            </Link>
            {/* FOLLOWERS */}
            <Link to={`/${user.username}/followers`}>
              <SC.SidebarLink
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
              </SC.SidebarLink>
            </Link>
            {/* FOLLOWING */}
            <Link to={`/${user.username}/following`}>
              <SC.SidebarLink
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
              </SC.SidebarLink>
            </Link>
            {/* EXPLORE */}
            <Link to={`/explore/${user._id}`}>
              <SC.SidebarLink
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
              </SC.SidebarLink>
            </Link>
            {/* SHARE */}
            <Link to={`/share`}>
              <SC.ShareButton
                onClick={() => handleOptionClick()}
                className={
                  "sidebar-link share-link" +
                  (currentPage === "Share" ? " active-share-link" : "")
                }
              >
                {currentPage === "Share" ? (
                  <SC.ShareIconActive>
                    <Create className="sidebar-icon" />
                  </SC.ShareIconActive>
                ) : (
                  <SC.ShareIcon>
                    <CreateOutlined className="sidebar-icon" />
                  </SC.ShareIcon>
                )}{" "}
                <span className="sidebar-link-text">Share</span>
              </SC.ShareButton>
            </Link>
            {/* LOGOUT */}
            <div className="sidebar-logout">
              <SC.SidebarButton
                className="logout-button"
                onClick={handleThemeModal}
              >
                <ColorLens className="sidebar-icon" />{" "}
                <span className="sidebar-link-text">Themes</span>
              </SC.SidebarButton>
            </div>
            <div className="sidebar-logout">
              <SC.SidebarButton
                className="logout-button"
                onClick={handleLogoutModal}
              >
                <ExitToApp className="sidebar-icon" />{" "}
                <span className="sidebar-link-text">Logout</span>
              </SC.SidebarButton>
            </div>
          </>
        </div>
        <SC.PersonalInfoContainer className="sidebar-personal-info-container">
          <a
            href="https://kfig21.github.io/portfolio_2021/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <KF />
          </a>
          <SC.MadeBy className="made-by">Made by KFig21</SC.MadeBy>
          <SC.GitHubA
            href="https://github.com/KFig21/nodebook_client"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub className="sidebar-icon" />
          </SC.GitHubA>
        </SC.PersonalInfoContainer>
        {/* </div> */}
      </SC.Sidebar>
      <SC.MobileSidebarBackground
      className={sidebarOpen ? "mobile-sidebar-background active" : "mobile-sidebar-background"}
      onClick= {() => setSidebarOpen(false)}
      ></SC.MobileSidebarBackground>
    </>
  );
}
