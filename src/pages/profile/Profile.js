import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import SC from "../../themes/styledComponents";
import "./Profile.scss";
import "./ProfileImages.scss";
import {
  fetchUserByUsername,
  fetchInitialPosts,
  fetchInitialImages,
  fetchInitialfollowsForProfile,
  fetchScrollPosts,
  fetchScrollfollowsForProfile,
  fetchScrollImages,
} from "../../helpers/apiCalls";
// components
import CenterFeed from "../../components/centerFeed/CenterFeed";
import Nav from "../../components/nav/Nav";
import Loader from "../../components/loader/Loader";
import ImageModal from "../../components/Modals/ImageModals/ImageModal";
import CoverImageModal from "../../components/Modals/ImageModals/CoverImageModal";
import AvatarImageModal from "../../components/Modals/ImageModals/AvatarImageModal";
import AvatarChangeModal from "./Modals/AvatarChangeModal";
import CoverChangeModal from "./Modals/CoverChangeModal";
// images
import cover from "../../assets/cover.png";
import noAvi from "../../assets/noAvatar.png";
// icons
import { AccountCircle, Edit, Image as ImageIcon } from "@material-ui/icons";

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
  const [followedByUser, setFollowedByUser] = useState(false);
  const [feed, setFeed] = useState("posts");
  const { user: currentUser } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [image, setImage] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCoverImageModal, setShowCoverImageModal] = useState(false);
  const [showAvatarImageModal, setShowAvatarImageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [coverModal, setCoverModal] = useState(false);
  const [followerCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  // image cropper
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState(null);
  const isInvalid = file === "" || file === null;

  useEffect(() => {
    // check if the current user follows the profile user
    const checkFollowing = async () => {
      let check = await currentUser.followings.includes(profileUser?._id);
      setFollowed(check);
    };
    checkFollowing();
    // check if the profile user follows the current user
    const checkIfFollowedByUser = async () => {
      let check = await currentUser.followers.includes(profileUser?._id);
      setFollowedByUser(check);
    };
    checkIfFollowedByUser();
    // remove unused error
    if (followed) {
      return null;
    }
  });

  // gets the profiles user info
  const loadNewUser = async (newUser) => {
    const fetchUser = async () => {
      const res = await fetchUserByUsername(newUser);
      setProfileUser(res);
      if (res.followers) {
        setFollowersCount(res.followers.length);
      }
      if (res.followings) {
        setFollowingCount(res.followings.length);
      }
      setFeed("posts");
      fetchPosts(res.username);
    };

    const fetchPosts = async (userFetched) => {
      setTimeout(async function () {
        const res = await fetchInitialPosts(userFetched);
        setPosts(res);
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
      const res = await fetchInitialPosts(profileUser.username);
      setPosts(res);
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
      const fetchedImages = await fetchInitialImages(profileUser.username);
      setImages(fetchedImages);
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
        const followsList = await fetchInitialfollowsForProfile(
          profileUser._id,
          type,
          currentUser._id
        );
        setFriends(followsList);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }, 300);
  };

  const getScrollPosts = async () => {
    const res = await fetchScrollPosts(profileUser.username, skip);
    setPosts([...posts, ...res]);
    setLoading(false);
  };

  const getScrollFollows = async () => {
    try {
      const followsList = await fetchScrollfollowsForProfile(
        profileUser._id,
        feed,
        currentUser._id,
        skip
      );
      setFriends([...friends, ...followsList]);
    } catch (err) {
      console.log(err);
    }
  };

  const getScrollImages = async () => {
    try {
      const newImages = await fetchScrollImages(profileUser.username, skip);
      setImages([...images, ...newImages]);
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
    setShowAvatarImageModal(false);
  };

  return (
    <>
      <div className="container" id="container">
        {/* EDIT IMAGE SELECTION MODAL */}
        {editModal && (
          <div className="profile-modal-wrapper">
            <SC.ProfileModalContainer className="profile-modal-container">
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
            </SC.ProfileModalContainer>
            <SC.ModalWrapper
              className="modal-background"
              onClick={closeAllModals}
            ></SC.ModalWrapper>
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
        {/* AVATAR IMAGE MODAL */}
        {showAvatarImageModal && (
          <AvatarImageModal
            avatar={profileUser.avatar}
            showModal={showAvatarImageModal}
            setShowModal={setShowAvatarImageModal}
          />
        )}
        {/* AVATAR CHANGE MODAL */}
        {avatarModal &&
          (!sending ? (
            <div className="profile-modal-wrapper">
              <AvatarChangeModal
                file={file}
                setFile={setFile}
                isInvalid={isInvalid}
                setSending={setSending}
                currentUser={currentUser}
              />
              {sending ? (
                <SC.ModalWrapper className="modal-background"></SC.ModalWrapper>
              ) : (
                <SC.ModalWrapper
                  className="modal-background"
                  onClick={closeAllModals}
                ></SC.ModalWrapper>
              )}
            </div>
          ) : (
            <div className="profile-modal-wrapper">
              <SC.ProfileModalContainer className="profile-modal-container">
                <Loader />
              </SC.ProfileModalContainer>
              <SC.ModalWrapper className="modal-background"></SC.ModalWrapper>
            </div>
          ))}
        {/* COVER CHANGE MODAL */}
        {coverModal &&
          (!sending ? (
            <div className="profile-modal-wrapper">
              <CoverChangeModal
                file={file}
                setFile={setFile}
                isInvalid={isInvalid}
                setSending={setSending}
                currentUser={currentUser}
              />
              {sending ? (
                <SC.ModalWrapper className="modal-background"></SC.ModalWrapper>
              ) : (
                <SC.ModalWrapper
                  className="modal-background"
                  onClick={closeAllModals}
                ></SC.ModalWrapper>
              )}
            </div>
          ) : (
            <div className="profile-modal-wrapper">
              <SC.ProfileModalContainer className="profile-modal-container">
                <Loader />
              </SC.ProfileModalContainer>
              <SC.ModalWrapper className="modal-background"></SC.ModalWrapper>
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
          <SC.ScrollThumb
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
                <SC.AvatarContainer className="profile-img-container">
                  <img
                    onClick={() => setShowAvatarImageModal(true)}
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
              </div>
            </div>
            <div className="profile-right-bottom">
              <CenterFeed
                profileUser={profileUser}
                feed={feed}
                followedByUser={followedByUser}
                fetchNotifications={fetchNotifications}
                loading={loading}
                posts={posts}
                images={images}
                friends={friends}
                sidebarOpen={sidebarOpen}
                loadNewUser={loadNewUser}
                getInitialPosts={getInitialPosts}
                getInitialFollows={getInitialFollows}
                getInitialImages={getInitialImages}
                setToInfo={setToInfo}
                handleSetModal={handleSetModal}
                followerCount={followerCount}
                followingCount={followingCount}
                setFollowingCount={setFollowingCount}
                currentPage={currentPage}
              />
            </div>
          </SC.ScrollThumb>
        </div>
      </div>
    </>
  );
}
