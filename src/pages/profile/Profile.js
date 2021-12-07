import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CenterFeed from "../../components/centerFeed/CenterFeed";
import Nav from "../../components/nav/Nav";
// import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import { AuthContext } from "../../context/AuthContext";
import cover from "../../assets/cover.png";
import noAvi from "../../assets/noAvatar.png";
import "./Profile.scss";

export default function Profile({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [profileUser, setProfileUser] = useState({});
  const username = useParams().username;
  const [followed, setFollowed] = useState(false);
  const [feed, setFeed] = useState("posts");
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const checkFollowing = async () => {
      let check = await currentUser.followings.includes(profileUser?._id);
      setFollowed(check);
    };
    checkFollowing();
    // remove unused error
    if (followed) {
      return null;
    }
  });

  // gets the profiles user info
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/users?username=${username}`
      );
      setProfileUser(res.data);
      setFeed("posts");
    };
    fetchUser();
    if (username === currentUser.username) {
      setCurrentPage("Profile");
    } else {
      setCurrentPage("NotUsersProfile");
    }
  }, [username, currentPage]);

  // gets posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/profile/${profileUser.username}/${skip}`
        // `http://localhost:3000/api/posts/profile/${profileUser.username}/${skip}`
      );
      setPosts([...posts, ...res.data]);
      setLoading(false);
    };
    if (feed === "posts" && profileUser.username) {
      fetchPosts();
    }
  }, [profileUser.username, currentUser._id, skip, feed]);

  // FOLLOW FEED FUNCTIONALITY
  // FOLLOW FEED FUNCTIONALITY
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

  // update follows on infinite scroll
  useEffect(() => {
    const getFollows = async () => {
      try {
        const followsList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${profileUser._id}/${feed}-profile/${currentUser._id}/${skip}`
          // `http://localhost:3000/api/users/${profileUser._id}/${feed}-profile/${currentUser._id}/${skip}`
        );
        setFriends([...friends, ...followsList.data]);
      } catch (err) {
        console.log(err);
      }
    };
    if (feed !== "posts") {
      getFollows();
    }
  }, [skip]);

  // update page on new follow or feed switch
  useEffect(() => {
    const getFollows = async () => {
      setTimeout(async function () {
        try {
          const followsList = await axios.get(
            `https://radiant-oasis-77477.herokuapp.com/api/users/${profileUser._id}/${feed}-profile/${currentUser._id}/0`
            // `http://localhost:3000/api/users/${profileUser._id}/${feed}-profile/${currentUser._id}/0`
          );
          setFriends(followsList.data);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      }, 300);
    };
    if (feed !== "posts") {
      getFollows();
    }
  }, [feed, profileUser.username]);

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop > scrollHeight * 0.98) {
      if (feed === "posts" && posts.length > skip + 4) {
        setSkip(posts.length);
      } else if (feed !== "posts" && friends.length > skip + 9) {
        setSkip(friends.length);
      }
    }
  };

  const handleChangeFeed = (newFeed) => {
    setPosts([]);
    setFriends([]);
    setLoading(true);
    setSkip(0);
    setFeed(newFeed);
  };

  return (
    <>
      <div className="container" id="container">
        <div className="profile-right">
          <Nav
            user={currentUser}
            profileUser={profileUser}
            currentPage={currentPage}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div
            className="profile-right-content"
            onClick={() => setSidebarOpen(false)}
            onScroll={handleScroll}
          >
            <div className="profile-right-top">
              <div className="profile-cover">
                <img
                  className="profile-cover-img"
                  src={
                    profileUser.coverPicture ? profileUser.coverPicture : cover
                  }
                  alt=""
                />
                <img
                  className="profile-avatar"
                  src={
                    profileUser.profilePicture
                      ? profileUser.profilePicture
                      : noAvi
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="profile-right-bottom">
              <CenterFeed
                profileUser={profileUser}
                feed={feed}
                handleChangeFeed={handleChangeFeed}
                fetchNotifications={fetchNotifications}
                loading={loading}
                posts={posts}
                friends={friends}
                handleFollowingStatus={handleFollowingStatus}
                sidebarOpen={sidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
