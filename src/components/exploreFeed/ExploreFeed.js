import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ExploreUser from "./exploreUser/ExploreUser";
import Loader from "../../components/loader/Loader";
import "./ExploreFeed.scss";

export default function ExploreFeed({
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [skip, setSkip] = useState(0);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // set current page to "Explore" on load
  useEffect(() => {
    setCurrentPage("Explore");
  });

  const handleFollowingStatus = async (followed, userInQuestion) => {
    const updateFollow = async () => {
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

    updateFollow();
  };

  // update page on infinite scroll
  useEffect(() => {
    const getFollows = async () => {
      try {
        const exploreList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/users/explore/${currentUser._id}/${skip}`
          // `http://localhost:3000/api/users/explore/${currentUser._id}/${skip}`
        );
        setFriends([...friends, ...exploreList.data]);
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
        const exploreList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/users/explore/${currentUser._id}/0`
          // `http://localhost:3000/api/users/explore/${currentUser._id}/0`
        );
        setFriends(exploreList.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getFollows();
  }, [currentUser]);

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
                <ExploreUser
                  friend={friend}
                  handleFollowingStatus={handleFollowingStatus}
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
    </div>
  );
}
