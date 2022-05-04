// imports
import { useEffect, useState, useContext } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./global.scss";
import axios from "axios";
import { getNotifications, url } from "./helpers/apiCalls";
// pages
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Follows from "./pages/follows/Follows";
import Post from "./pages/post/Post";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import Update from "./pages/update/Update";
import PostLikes from "./pages/likes/PostLikes";
import CommentLikes from "./pages/likes/CommentLikes";
import Explore from "./pages/explore/Explore";
import Notifications from "./pages/notifications/Notifications";
import Share from "./pages/share/Share";
// components
import Sidebar from "./components/sidebar/Sidebar";
import MobileNavFooter from "./components/mobileNavFooter/MobileNavFooter";
import LogoutModal from "./components/Modals/SidebarModals/LogoutModal";
import ThemeModal from "./components/Modals/SidebarModals/ThemeModal";
// themes
import { ThemeProvider } from "styled-components";
import SC from "./themes/styledComponents";
import defaultTheme_Green from "./themes/defaultTheme_Green";
import { findTheme } from "./helpers/helperFunctions";

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState("Timeline");
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(defaultTheme_Green);

  const [themeModal, setThemeModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [logoutModal, setLogoutModal] = useState(false);

  const fetchNotifications = async () => {
    // set a buffer for new notifications to get set before fetching
    setTimeout(async function () {
      const res = await getNotifications(user._id)
      setUserData(res);
      let count = 0;
      for (let notification of res.notifications) {
        if (notification.seen === false) {
          count++;
        }
      }
      setNotificationsCount(count);
      // remove unused error
      if (userData) {
        return null;
      }
    }, 300);
  };

  useEffect(() => {
    const userCheck = localStorage.getItem("userAuth");
    if (userCheck) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // set theme
  useEffect(() => {
    if (user) {
      setTheme(findTheme(user.theme));
      setSelectedTheme(user.theme);
    }
  }, [user]);

  const handleThemeModal = () => {
    setSidebarOpen(false);
    setLogoutModal(false);
    setThemeModal(!themeModal);
  };

  const handleLogoutModal = () => {
    setSidebarOpen(false);
    setThemeModal(false);
    setLogoutModal(!logoutModal);
  };

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setThemeModal(false);
    setLogoutModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/">
        <div className="app">
          <div className="home-container">
            {user && (
              <Sidebar
                currentPage={currentPage}
                notificationsCount={notificationsCount}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleThemeModal={handleThemeModal}
                handleLogoutModal={handleLogoutModal}
              />
            )}
            <SC.ContentContainer className={"content-container"}>
              {/* LOGOUT MODAL */}
              {logoutModal && (
                <LogoutModal
                  setLogoutModal={setLogoutModal}
                  setSidebarOpen={setSidebarOpen}
                  handleLogoutModal={handleLogoutModal}
                />
              )}

              {/* THEME MODAL */}
              {themeModal && (
                <ThemeModal
                  setLogoutModal={setLogoutModal}
                  setSidebarOpen={setSidebarOpen}
                  setThemeModal={setThemeModal}
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  setTheme={setTheme}
                  themeModal={themeModal}
                  handleThemeModal={handleThemeModal}
                />
              )}

              <Routes>
                {/* HOME ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Home
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        fetchNotifications={fetchNotifications}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* PROFILE ROUTE, if no user go to LOGIN */}
                <Route
                  path="/profile/:username"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Profile
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        fetchNotifications={fetchNotifications}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                        themeModal={themeModal}
                        logoutModal={logoutModal}
                      />
                    )
                  }
                ></Route>
                {/* NOTIFICATIONS ROUTE, if no user go to LOGIN */}
                <Route
                  path="/notifications/:username"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Notifications
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        fetchNotifications={fetchNotifications}
                        notificationsCount={notificationsCount}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* FOLLOWERS ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/:id/followers"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Follows
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        follow={"Followers"}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* FOLLOWING ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/:id/following"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Follows
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        follow={"Following"}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* POST LIKES ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/post/:postId/likes"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <PostLikes
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* COMMENT LIKES ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/comment/:commentId/likes"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <CommentLikes
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* EXPLORE ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/explore/:userId"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Explore
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* POST ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/post/:postId"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Post
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        fetchNotifications={fetchNotifications}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* SHARE ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/share"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Share
                        user={user}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        fetchNotifications={fetchNotifications}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* UPDATE USER ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/:id/update"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Update
                        user={user}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        updateType={"user"}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* LOGIN ROUTE, if there's a user redirect to home */}
                <Route
                  exact
                  path="/login"
                  element={
                    !user ? (
                      <Login />
                    ) : (
                      <Home
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        fetchNotifications={fetchNotifications}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
                {/* SIGNUP ROUTE*/}
                <Route
                  exact
                  path="/signup"
                  element={
                    !user ? (
                      <Signup userAuth={userAuth} setUserAuth={setUserAuth} />
                    ) : (
                      <Home
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        fetchNotifications={fetchNotifications}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleSidebar={handleSidebar}
                      />
                    )
                  }
                ></Route>
              </Routes>
            </SC.ContentContainer>
            {user && (
              <MobileNavFooter
                currentPage={currentPage}
                notificationsCount={notificationsCount}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleSidebar={handleSidebar}
              />
            )}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
