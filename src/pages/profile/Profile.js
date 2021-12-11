import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CenterFeed from "../../components/centerFeed/CenterFeed";
import Nav from "../../components/nav/Nav";
import { AuthContext } from "../../context/AuthContext";
import cover from "../../assets/cover.png";
import noAvi from "../../assets/noAvatar.png";
import plusSign from "../../assets/plusSign.png";
import avatarCropper from "../../assets/avatarCropper.png";
import { PermMedia, Cancel } from "@material-ui/icons";
import "./Profile.scss";

export default function Profile({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [profileUser, setProfileUser] = useState({});
  const [profileAvatar, setProfileAvatar] = useState("");
  const username = useParams().username;
  const [followed, setFollowed] = useState(false);
  const [feed, setFeed] = useState("posts");
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [avatarModal, setAvatarModal] = useState(false);
  const [file, setFile] = useState(null);
  const isInvalid = file === "" || file === null;

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
        // `http://localhost:3000/api/users?username=${username}`
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

  // gets posts on scroll
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
  }, [currentUser._id, skip]);

  // gets posts on profile or feed switch
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/profile/${profileUser.username}/0`
        // `http://localhost:3000/api/posts/profile/${profileUser.username}/${skip}`
      );
      setPosts(res.data);
      setLoading(false);
    };
    if (feed === "posts" && profileUser.username) {
      fetchPosts();
    }
  }, [profileUser.username, feed]);

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
    if (feed === "followers" || feed === "following") {
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
    if (feed === "followers" || feed === "following") {
      getFollows();
    } else {
      setLoading(false);
    }
  }, [feed, profileUser.username, currentUser]);

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

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();

      data.append("file", file);
      data.append("userId", currentUser._id);

      try {
        await axios.put(
          "https://radiant-oasis-77477.herokuapp.com/api/users/avatar",
          // `http://localhost:3000/api/users/avatar/`,
          data
        );
        window.location.reload();
      } catch (err) {}
    }
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
            {/* AVATAR CHANGE MODAL */}
            {avatarModal && (
              <div className="avatar-modal-wrapper">
                <div className="avatar-modal-container">
                  {file && (
                    <div className="avatar-modal-img-container">
                      <img
                        className="avatar-modal-cropper"
                        src={avatarCropper}
                        alt=""
                      />
                      <img
                        className="avatar-modal-img"
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                      <Cancel
                        className="avatar-modal-cancel-img"
                        onClick={() => setFile("")}
                      />
                    </div>
                  )}
                  <div className="avatar-modal-bottom-container">
                    <form
                      className="avatar-modal-bottom"
                      onSubmit={handleAvatarUpdate}
                      encType="multipart/form-data"
                    >
                      <div className="avatar-modal-options">
                        <label htmlFor="file" className="avatar-modal-option">
                          <PermMedia className="file-icon" />
                          <span className="avatar-modal-option-text">
                            Select a new avatar
                          </span>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            name="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </label>
                      </div>
                      <button
                        type="submit"
                        className={
                          isInvalid
                            ? "save-button invalid-save-button"
                            : "save-button"
                        }
                        disabled={isInvalid}
                      >
                        save
                      </button>
                    </form>
                  </div>
                </div>
                <div
                  className="modal-background"
                  onClick={() => setAvatarModal(false)}
                ></div>
              </div>
            )}
            {/* PROFILE */}
            <div className="profile-right-top">
              <div className="profile-cover">
                <img
                  className="profile-cover-img"
                  src={
                    profileUser.coverPicture ? profileUser.coverPicture : cover
                  }
                  alt=""
                />
                {username === currentUser.username ? (
                  <div
                    className="profile-img-container"
                    onClick={() => setAvatarModal(true)}
                  >
                    <div className="plus-sign-container">
                      <img
                        className="profile-avatar-plus"
                        src={plusSign}
                        alt=""
                      />
                    </div>
                    <img
                      className="profile-avatar"
                      src={
                        profileUser.profilePicture
                          ? "data:image/jpg;base64," +
                            profileUser.profilePicture
                          : noAvi
                      }
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="profile-img-container">
                    <img
                      className="profile-avatar"
                      src={
                        profileUser.profilePicture
                          ? "data:image/jpg;base64," +
                            profileUser.profilePicture
                          : noAvi
                      }
                      alt=""
                    />
                  </div>
                )}
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
