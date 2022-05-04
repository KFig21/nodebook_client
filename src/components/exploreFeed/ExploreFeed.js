import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ExploreUser from "./exploreUser/ExploreUser";
import Loader from "../../components/loader/Loader";
import "./ExploreFeed.scss";
import SC from "../../themes/styledComponents";
import { fetchExploreList } from "../../helpers/apiCalls";

export default function ExploreFeed({
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [skip, setSkip] = useState(0);
  const { user: currentUser } = useContext(AuthContext);

  // set current page to "Explore" on load
  useEffect(() => {
    setCurrentPage("Explore");
  });

  // update page on infinite scroll
  const getExploreListOnScroll = async () => {
    try {
      const exploreList = await fetchExploreList(currentUser._id, skip);
      setFriends([...friends, ...exploreList]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getExploreListOnScroll();
  }, [skip]);

  // update page on new follow
  const getInitialExploreList = async () => {
    try {
      const exploreList = await fetchExploreList(currentUser._id, 0);
      setFriends(exploreList);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInitialExploreList();
  }, []);

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop > scrollHeight * 0.95) {
      setSkip(friends.length);
    }
  };

  return (
    <SC.ScrollThumb
      className="followfeed"
      onScroll={handleScroll}
      onClick={() => setSidebarOpen(false)}
    >
      {loading ? (
        <Loader type={"full-screen"} />
      ) : (
        <div className="followfeed-wrapper">
          {friends.length > 0 ? (
            <>
              {friends.map((friend) => (
                <ExploreUser
                  friend={friend}
                  key={friend._id}
                  sidebarOpen={sidebarOpen}
                />
              ))}
            </>
          ) : (
            <span className="no-explore-message">No one new to see</span>
          )}
        </div>
      )}
    </SC.ScrollThumb>
  );
}
