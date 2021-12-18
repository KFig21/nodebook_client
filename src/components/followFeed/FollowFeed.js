import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Follower from "../follower/Follower";
import Loader from "../../components/loader/Loader";
import "./FollowFeed.scss";
import SC from "../../themes/styledComponents";
import { fetchFollowsList } from "../../helpers/apiCalls";

export default function FollowFeed({
  currentPage,
  setCurrentPage,
  follow,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [skip, setSkip] = useState(0);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // set current page on load
  useEffect(() => {
    setCurrentPage(follow);
  });

  const getInitialFollows = async () => {
    try {
      const followsList = await fetchFollowsList(currentUser._id, follow, 0);
      setFriends(followsList);
      setTimeout(async function () {
        setLoading(false);
      }, 200);
    } catch (err) {
      console.log(err);
    }
  };

  const getScrollFollows = async () => {
    try {
      const followsList = await fetchFollowsList(currentUser._id, follow, skip);
      setFriends([...friends, ...followsList]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // update page on infinite scroll
  useEffect(() => {
    getScrollFollows();
  }, [skip]);

  // update page on load or feed switch
  useEffect(() => {
    setLoading(true);
    setFriends([]);
    getInitialFollows();
  }, [follow]);

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop > scrollHeight * 0.9) {
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
                <Follower
                  friend={friend}
                  sidebarOpen={sidebarOpen}
                  currentPage={currentPage}
                />
              ))}
            </>
          ) : (
            <>
              {follow === "Following" ? (
                <span className="no-explore-message">
                  Find users to follow in the Explore tab!
                </span>
              ) : (
                <span className="no-explore-message">No followers yet!</span>
              )}
            </>
          )}
        </div>
      )}
    </SC.ScrollThumb>
  );
}
