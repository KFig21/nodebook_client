import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FollowFeed from "../../components/followFeed/FollowFeed";
import Nav from "../../components/nav/Nav";
import "./Follows.scss";
import { fetchUserByUsername } from "../../helpers/apiCalls";

export default function Followers({
  currentPage,
  setCurrentPage,
  follow,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
}) {
  const { user: currentUser } = useContext(AuthContext);
  const [followersCount, setFollowersCount] = useState(0);

  const getFollowersCount = async () => {
    const res = await fetchUserByUsername(currentUser.username);
    setFollowersCount(res.followers.length);
  };

  useEffect(() => {
    getFollowersCount();
  }, []);

  return (
    <div className="container" id="container">
      <Nav
        currentPage={currentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleSidebar={handleSidebar}
        followersCount={followersCount}
      />
      <FollowFeed
        follow={follow}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}
