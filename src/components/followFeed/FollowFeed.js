import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Follower from "../follower/Follower";
import Loader from "../../components/loader/Loader";
import "./FollowFeed.scss";

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

  const handleFollowingStatus = async (followed, userInQuestion) => {
    try {
      if (followed) {
        await axios.put(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${userInQuestion._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: userInQuestion._id });
        // delete follow notification
        try {
          axios.delete(
            "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
            // "http://localhost:3000/api/notifications/",
            {
              data: {
                sender: currentUser._id,
                recipient: userInQuestion._id,
                postId: null,
                commentId: null,
                type: "follow",
              },
            }
          );
        } catch (err) {}
      } else {
        await axios.put(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${userInQuestion._id}/follow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: userInQuestion._id });
        // send follow notification
        try {
          axios.post(
            "https://radiant-oasis-77477.herokuapp.com/api/notifications/",
            // "http://localhost:3000/api/notifications/",
            {
              sender: currentUser._id,
              recipient: userInQuestion._id,
              postId: null,
              commentId: null,
              type: "follow",
              seen: false,
            }
          );
        } catch (err) {}
      }
    } catch (err) {}
  };

  // update page on infinite scroll
  useEffect(() => {
    const getFollows = async () => {
      try {
        const friendsList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${currentUser._id}/${follow}/${skip}`
          // `http://localhost:3000/api/users/${currentUser._id}/${follow}/${skip}`
        );
        setFriends([...friends, ...friendsList.data]);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getFollows();
  }, [skip]);

  // update page on new follow
  useEffect(() => {
    const getFollows = async () => {
      try {
        const friendsList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${currentUser._id}/${follow}/0`
          // `http://localhost:3000/api/users/${currentUser._id}/${follow}/0`
        );
        setFriends(friendsList.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getFollows();
  }, [currentUser, currentPage]);

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop > scrollHeight * 0.95) {
      setSkip(friends.length);
    }
  };

  return (
    <div
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
                  handleFollowingStatus={handleFollowingStatus}
                  key={friend._id}
                  sidebarOpen={sidebarOpen}
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
    </div>
  );
}
