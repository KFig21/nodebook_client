import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CenterFeed from "../../components/centerFeed/CenterFeed";
import Nav from "../../components/nav/Nav";
import { AuthContext } from "../../context/AuthContext";
import cover from "../../assets/cover.png";
import noAvi from "../../assets/noAvatar.png";
import avatarCropper from "../../assets/avatarCropper.png";
import coverCropper from "../../assets/coverCropper.png";
import {
  PermMedia,
  Cancel,
  AccountCircle,
  Image as ImageIcon,
} from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import Loader from "../../components/loader/Loader";
import ImageModal from "../../components/Modals/ImageModals/ImageModal";
import CoverImageModal from "../../components/Modals/ImageModals/CoverImageModal";
import SC from "../../themes/styledComponents";
import "./Profile.scss";

export default function Profile({
  currentPage,
  setCurrentPage,
  fetchNotifications,
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
  themeModal,
  logoutModal,
}) {
  const [profileUser, setProfileUser] = useState({});
  const username = useParams().username;
  const [followed, setFollowed] = useState(false);
  const [feed, setFeed] = useState("posts");
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCoverImageModal, setShowCoverImageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [coverModal, setCoverModal] = useState(false);
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
  const loadNewUser = async (newUser) => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/users?username=${newUser}`
        // `http://localhost:3000/api/users?username=${newUser}`
      );
      setProfileUser(res.data);
      setFeed("posts");
      fetchPosts(res.data.username);
    };

    const fetchPosts = async (userFetched) => {
      setTimeout(async function () {
        const res = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/posts/profile/${userFetched}/0`
          // `http://localhost:3000/api/posts/profile/${userFetched}/0`
        );
        setPosts(res.data);
        setLoading(false);
      }, 1000);
    };
    setLoading(true);
    fetchUser();
  };

  const getInitialPosts = async () => {
    setLoading(true);
    setPosts([]);
    setImages([]);
    setFriends([]);
    setSkip(0);
    setFeed("posts");
    setTimeout(async function () {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/profile/${profileUser.username}/0`
        // `http://localhost:3000/api/posts/profile/${profileUser.username}/0`
      );
      setPosts(res.data);
      setLoading(false);
    }, 1000);
  };

  const getInitialImages = async () => {
    setLoading(true);
    setPosts([]);
    setImages([]);
    setFriends([]);
    setSkip(0);
    setFeed("images");
    setTimeout(async function () {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/profile/${profileUser.username}/images/0`
        // `http://localhost:3000/api/posts/profile/${profileUser.username}/images/0`
      );
      setImages(res.data);
      setLoading(false);
    }, 500);
  };

  const getInitialFollows = async (type) => {
    setLoading(true);
    setFeed(type);
    setPosts([]);
    setImages([]);
    setFriends([]);
    setSkip(0);
    setTimeout(async function () {
      try {
        const followsList = await axios.get(
          `https://radiant-oasis-77477.herokuapp.com/api/users/${profileUser._id}/${type}-profile/${currentUser._id}/0`
          // `http://localhost:3000/api/users/${profileUser._id}/${type}-profile/${currentUser._id}/0`
        );
        setFriends(followsList.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }, 300);
  };

  const getScrollPosts = async () => {
    const res = await axios.get(
      `https://radiant-oasis-77477.herokuapp.com/api/posts/profile/${profileUser.username}/${skip}`
      // `http://localhost:3000/api/posts/profile/${profileUser.username}/${skip}`
    );
    setPosts([...posts, ...res.data]);
    setLoading(false);
  };

  const getScrollFollows = async () => {
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

  const getScrollImages = async () => {
    try {
      const newImages = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/profile/${profileUser.username}/images/${skip}`
        // `http://localhost:3000/api/posts/profile/${profileUser.username}/images/${skip}`
      );
      setImages([...images, ...newImages.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const setToInfo = async () => {
    setFeed("info");
  };

  // infinite scroll functionality
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop > scrollHeight * 0.85) {
      if (feed === "posts" && posts.length > skip + 4) {
        setSkip(posts.length);
      } else if (feed !== "posts" && friends.length > skip + 9) {
        setSkip(friends.length);
      } else if (feed === "images" && images.length > skip + 8) {
        setSkip(images.length);
      }
    }
  };

  useEffect(() => {
    loadNewUser(username);
    if (username === currentUser.username) {
      setCurrentPage("Profile");
    } else {
      setCurrentPage("NotUsersProfile");
    }
  }, [username]);

  useEffect(() => {
    // gets posts on scroll
    if (feed === "posts" && profileUser.username && skip > 0) {
      getScrollPosts();
    }
    // update follows on infinite scroll
    if (feed === "followers" || feed === "following") {
      getScrollFollows();
    }
    // update imagess on infinite scroll
    if (feed === "images") {
      getScrollImages();
    }
  }, [skip]);

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

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    setSending(true);
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

  const handleCoverUpdate = async (e) => {
    e.preventDefault();
    setSending(true);

    if (file) {
      const data = new FormData();

      data.append("file", file);
      data.append("userId", currentUser._id);

      try {
        await axios.put(
          "https://radiant-oasis-77477.herokuapp.com/api/users/cover",
          // `http://localhost:3000/api/users/cover/`,
          data
        );
        window.location.reload();
      } catch (err) {}
    }
  };

  // image modal
  const handleSetModal = (post) => {
    setImage(post);
    setTimeout(function () {
      setShowImageModal(true);
    }, 250);
  };

  const openEditModal = () => {
    setShowCoverImageModal(false);
    setEditModal(true);
    setAvatarModal(false);
    setCoverModal(false);
  };
  const openAvatarEditModal = () => {
    setEditModal(false);
    setAvatarModal(true);
    setCoverModal(false);
    setShowCoverImageModal(false);
  };
  const openCoverEditModal = () => {
    setEditModal(false);
    setAvatarModal(false);
    setCoverModal(true);
    setShowCoverImageModal(false);
  };
  const closeAllModals = () => {
    setEditModal(false);
    setAvatarModal(false);
    setCoverModal(false);
    setShowCoverImageModal(false);
  };

  return (
    <>
      <div className="container" id="container">
        {/* EDIT IMAGE SELECTION MODAL */}
        {editModal && (
          <div className="profile-modal-wrapper">
            <div className="profile-modal-container">
              <SC.ProfileModalMessageContainer className="edit-modal-message">
                Which image do you want to change
              </SC.ProfileModalMessageContainer>
              <SC.ProfileModalMessageContainer className="edit-modal-selection-container">
                <SC.ProfileModalButton
                  className="edit-modal-option"
                  onClick={openAvatarEditModal}
                >
                  <SC.ProfileModalButtonIcon>
                    <AccountCircle className="edit-modal-icon" />
                  </SC.ProfileModalButtonIcon>
                  Avatar
                </SC.ProfileModalButton>
                <SC.ProfileModalButton
                  className="edit-modal-option"
                  onClick={openCoverEditModal}
                >
                  <SC.ProfileModalButtonIcon>
                    <ImageIcon className="edit-modal-icon" />
                  </SC.ProfileModalButtonIcon>
                  Cover
                </SC.ProfileModalButton>
              </SC.ProfileModalMessageContainer>
            </div>
            <div className="modal-background" onClick={closeAllModals}></div>
          </div>
        )}
        {/* IMAGE MODAL */}
        {showImageModal && (
          <ImageModal
            post={image}
            directional={true}
            showModal={showImageModal}
            setShowModal={setShowImageModal}
          />
        )}
        {/* COVER IMAGE MODAL */}
        {showCoverImageModal && (
          <CoverImageModal
            cover={profileUser.cover}
            showModal={showCoverImageModal}
            setShowModal={setShowCoverImageModal}
          />
        )}
        {/* AVATAR CHANGE MODAL */}
        {avatarModal &&
          (!sending ? (
            <div className="profile-modal-wrapper">
              <SC.ProfileModalMessageContainer className="profile-modal-container">
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
                <SC.ProfileModalMessageContainer className="avatar-modal-bottom-container">
                  <form
                    className="avatar-modal-bottom"
                    onSubmit={handleAvatarUpdate}
                    encType="multipart/form-data"
                  >
                    <div className="avatar-modal-options">
                      <label htmlFor="file" className="avatar-modal-option">
                        <SC.ProfileModalFileIcon>
                          <PermMedia className="file-icon" />
                        </SC.ProfileModalFileIcon>
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
                    <SC.ProfileImageSaveButton
                      type="submit"
                      className={
                        isInvalid
                          ? "save-button invalid-save-button"
                          : "save-button"
                      }
                      disabled={isInvalid}
                    >
                      save
                    </SC.ProfileImageSaveButton>
                  </form>
                </SC.ProfileModalMessageContainer>
              </SC.ProfileModalMessageContainer>
              {sending ? (
                <div className="modal-background"></div>
              ) : (
                <div
                  className="modal-background"
                  onClick={closeAllModals}
                ></div>
              )}
            </div>
          ) : (
            <div className="profile-modal-wrapper">
              <SC.ProfileModalMessageContainer className="profile-modal-container">
                <Loader />
              </SC.ProfileModalMessageContainer>
              <div className="modal-background"></div>
            </div>
          ))}
        {/* COVER CHANGE MODAL */}
        {coverModal &&
          (!sending ? (
            <div className="profile-modal-wrapper">
              <SC.ProfileModalMessageContainer className="profile-modal-container">
                {file && (
                  <div className="cover-modal-img-container">
                    <img
                      className="cover-modal-cropper"
                      src={coverCropper}
                      alt=""
                    />
                    <img
                      className="cover-modal-img"
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                    <Cancel
                      className="cover-modal-cancel-img"
                      onClick={() => setFile("")}
                    />
                  </div>
                )}
                <SC.ProfileModalMessageContainer className="avatar-modal-bottom-container">
                  <form
                    className="avatar-modal-bottom"
                    onSubmit={handleCoverUpdate}
                    encType="multipart/form-data"
                  >
                    <div className="avatar-modal-options">
                      <label htmlFor="file" className="avatar-modal-option">
                        <SC.ProfileModalFileIcon>
                          <PermMedia className="file-icon" />
                        </SC.ProfileModalFileIcon>
                        <span className="avatar-modal-option-text">
                          Select a new cover
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
                    <SC.ProfileImageSaveButton
                      type="submit"
                      className={
                        isInvalid
                          ? "save-button invalid-save-button"
                          : "save-button"
                      }
                      disabled={isInvalid}
                    >
                      save
                    </SC.ProfileImageSaveButton>
                  </form>
                </SC.ProfileModalMessageContainer>
              </SC.ProfileModalMessageContainer>
              {sending ? (
                <div className="modal-background"></div>
              ) : (
                <div
                  className="modal-background"
                  onClick={closeAllModals}
                ></div>
              )}
            </div>
          ) : (
            <div className="profile-modal-wrapper">
              <SC.ProfileModalMessageContainer className="profile-modal-container">
                <Loader />
              </SC.ProfileModalMessageContainer>
              <div className="modal-background"></div>
            </div>
          ))}

        <div className="profile-right">
          <Nav
            user={currentUser}
            profileUser={profileUser}
            currentPage={currentPage}
            sidebarOpen={sidebarOpen}
            handleSidebar={handleSidebar}
            themeModal={themeModal}
            logoutModal={logoutModal}
          />
          <div
            className="profile-right-content"
            onClick={() => setSidebarOpen(false)}
            onScroll={handleScroll}
          >
            {/* PROFILE */}
            <div className="profile-right-top">
              <div className="profile-cover">
                <div className="cover-img-container">
                  {username === currentUser.username && (
                    <SC.ProfileCoverEditButtonIcon
                      className="edit-icon-container"
                      title="update cover image"
                      onClick={openEditModal}
                    >
                      <Edit className="edit-icon" />
                    </SC.ProfileCoverEditButtonIcon>
                  )}
                  <img
                    onClick={() => setShowCoverImageModal(true)}
                    className="profile-cover-img"
                    src={
                      profileUser.cover
                        ? "https://nodebook-images.s3.amazonaws.com/" +
                          profileUser.cover
                        : cover
                    }
                    alt=""
                  />
                </div>
                {username === currentUser.username ? (
                  <SC.AvatarContainer className="profile-img-container">
                    <img
                      className="profile-avatar"
                      src={
                        profileUser.avatar
                          ? "https://nodebook-images.s3.amazonaws.com/" +
                            profileUser.avatar
                          : noAvi
                      }
                      alt=""
                    />
                  </SC.AvatarContainer>
                ) : (
                  <SC.AvatarContainer className="profile-img-container">
                    <img
                      className="profile-avatar"
                      src={
                        profileUser.avatar
                          ? "https://nodebook-images.s3.amazonaws.com/" +
                            profileUser.avatar
                          : noAvi
                      }
                      alt=""
                    />
                  </SC.AvatarContainer>
                )}
              </div>
            </div>
            <div className="profile-right-bottom">
              <CenterFeed
                profileUser={profileUser}
                feed={feed}
                fetchNotifications={fetchNotifications}
                loading={loading}
                posts={posts}
                images={images}
                friends={friends}
                handleFollowingStatus={handleFollowingStatus}
                sidebarOpen={sidebarOpen}
                loadNewUser={loadNewUser}
                getInitialPosts={getInitialPosts}
                getInitialFollows={getInitialFollows}
                getInitialImages={getInitialImages}
                setToInfo={setToInfo}
                handleSetModal={handleSetModal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
