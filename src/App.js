// imports
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import "./global.scss";
import axios from "axios";
// pages
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Follows from "./pages/follows/Follows";
import Post from "./pages/post/Post";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import Update from "./pages/update/Update";
import Explore from "./pages/explore/Explore";
import Notifications from "./pages/notifications/Notifications";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState("Timeline");
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchNotifications = async () => {
    // set a buffer for new notifications to get set before fetching
    setTimeout(async function () {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/users?userId=${user._id}`
        // `http://localhost:3000/api/users?userId=${user._id}`
      );
      setUserData(res.data);
      let count = 0;
      for (let notification of res.data.notifications) {
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

  return (
    <Router basename="/nodebook_client">
      <div className="app">
        {user ? (
          <div className="home-container">
            <Sidebar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              notificationsCount={notificationsCount}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="left-container">
              <Routes>
                {/* HOME ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/"
                  element={
                    <Home
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      fetchNotifications={fetchNotifications}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* PROFILE ROUTE, if no user go to LOGIN */}
                <Route
                  path="/profile/:username"
                  element={
                    <Profile
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      fetchNotifications={fetchNotifications}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* NOTIFICATIONS ROUTE, if no user go to LOGIN */}
                <Route
                  path="/notifications/:username"
                  element={
                    <Notifications
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      fetchNotifications={fetchNotifications}
                      notificationsCount={notificationsCount}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* FOLLOWERS ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/:id/followers"
                  element={
                    <Follows
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      follow={"Followers"}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* FOLLOWING ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/:id/following"
                  element={
                    <Follows
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      follow={"Following"}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* EXPLORE ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/explore/:userId"
                  element={
                    <Explore
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* POST ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/post/:postId"
                  element={
                    <Post
                      user={user}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      fetchNotifications={fetchNotifications}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* UPDATE USER ROUTE, if no user go to LOGIN */}
                <Route
                  exact
                  path="/:id/update"
                  element={
                    <Update
                      user={user}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      updateType={"user"}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  }
                ></Route>
                {/* LOGIN ROUTE, if there's a user redirect to home */}
                <Route
                  exact
                  path="/login"
                  element={
                    <Home
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  }
                ></Route>
                {/* SIGNUP ROUTE*/}
                <Route
                  exact
                  path="/signup"
                  element={
                    <Signup userAuth={userAuth} setUserAuth={setUserAuth} />
                  }
                ></Route>
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            {/* LOGIN ROUTE, if there's a user redirect to home */}
            <Route exact path="/login" element={<Login />}></Route>
            {/* SIGNUP ROUTE*/}
            <Route
              exact
              path="/signup"
              element={<Signup userAuth={userAuth} setUserAuth={setUserAuth} />}
            ></Route>
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
