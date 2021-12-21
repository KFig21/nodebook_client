import React, { useContext } from "react";
import "./CenterFeed.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  AccountBox,
  Chat,
  Group,
  Edit,
  Image as ImageIcon,
} from "@material-ui/icons";
// component imports
import Loader from "../../components/loader/Loader";
import Share from "../share/Share";
import Post from "../post/Post";
import Image from "../image/Image";
import Follower from "../follower/Follower";
import SC from "../../themes/styledComponents";

export default function CenterFeed({
  profileUser,
  feed,
  followedByUser,
  fetchNotifications,
  loading,
  posts,
  images,
  friends,
  sidebarOpen,
  loadNewUser,
  getInitialPosts,
  getInitialFollows,
  getInitialImages,
  setToInfo,
  handleSetModal,
  followerCount,
  followingCount,
  setFollowingCount,
  currentPage,
}) {
  const { user: currentUser } = useContext(AuthContext);

  const formatBday = (date) => {
    let arr = date.split("-");
    let formattedDate = arr[1] + "/" + arr[2] + "/" + arr[0];
    return formattedDate;
  };

  const formatTheme = (theme) => {
    let themeClass = theme.split(" ").join("");
    return themeClass;
  };

  return (
    <>
      <div className="profile-feed">
        {/* <Heading>test</Heading> */}
        <SC.ProfileHeader className="profile-header">
          <SC.ProfileHeader className="profile-header-wrapper">
            <div className="profile-info">
              <div className="profile-info-username">
                {profileUser.username}
              </div>
              <div className="profile-info-name">
                {profileUser.firstname} {profileUser.lastname}
              </div>
              {/* {followedByUser ? (
                <div className="profile-header-follows-you"> follows you</div>
              ) : null} */}
            </div>
          </SC.ProfileHeader>
        </SC.ProfileHeader>
        <SC.ProfileHeader
          className="profile-header-buttons-container"
          style={sidebarOpen ? { pointerEvents: "none" } : {}}
        >
          <SC.ProfileHeader className="profile-header-buttons-wrapper">
            {/* INFO BUTTON */}
            <SC.ProfileNavButton
              onClick={() => setToInfo()}
              className={
                "profile-info-clickable " +
                (feed === "info" ? "pic-active" : "first")
              }
            >
              <SC.ProfileNavButtonText className="button-name">
                info
              </SC.ProfileNavButtonText>
              <SC.ProfileNavButtonIcon
                className={feed === "info" ? "icon-active" : ""}
              >
                <AccountBox className="profile-info-icon" />
              </SC.ProfileNavButtonIcon>
            </SC.ProfileNavButton>
            {/* POSTS BUTTON */}
            <SC.ProfileNavButton
              onClick={() => getInitialPosts()}
              className={
                "profile-info-clickable " +
                (feed === "posts" ? "pic-active" : "")
              }
            >
              <SC.ProfileNavButtonCount className="count">
                {profileUser.posts ? profileUser.posts.length : "0"}
              </SC.ProfileNavButtonCount>
              <SC.ProfileNavButtonText className="button-name">
                posts
              </SC.ProfileNavButtonText>
              <SC.ProfileNavButtonIcon
                className={feed === "posts" ? "icon-active" : ""}
              >
                <Chat className="profile-info-icon" />
              </SC.ProfileNavButtonIcon>
            </SC.ProfileNavButton>
            {/* IMAGES BUTTON */}
            <SC.ProfileNavButton
              onClick={() => getInitialImages()}
              className={
                "profile-info-clickable " +
                (feed === "images" ? "pic-active" : "")
              }
            >
              <SC.ProfileNavButtonCount className="count">
                {profileUser.images ? profileUser.images.length : "0"}
              </SC.ProfileNavButtonCount>
              <SC.ProfileNavButtonText className="button-name">
                images
              </SC.ProfileNavButtonText>
              <SC.ProfileNavButtonIcon
                className={feed === "images" ? "icon-active" : ""}
              >
                <ImageIcon className="profile-info-icon" />
              </SC.ProfileNavButtonIcon>
            </SC.ProfileNavButton>
            {/* FOLLOWERS BUTTON */}
            <SC.ProfileNavButton
              onClick={() => getInitialFollows("followers")}
              className={
                "profile-info-clickable " +
                (feed === "followers" ? "pic-active" : "")
              }
            >
              <SC.ProfileNavButtonCount className="count">
                {followerCount}
              </SC.ProfileNavButtonCount>
              <SC.ProfileNavButtonText className="button-name">
                followers
              </SC.ProfileNavButtonText>
              <SC.ProfileNavButtonIcon
                className={feed === "followers" ? "icon-active" : ""}
              >
                <Group className="profile-info-icon" />
              </SC.ProfileNavButtonIcon>
            </SC.ProfileNavButton>
            {/* FOLLOWING BUTTON */}
            <SC.ProfileNavButton
              onClick={() => getInitialFollows("following")}
              className={
                "profile-info-clickable last " +
                (feed === "following" ? "pic-active" : "")
              }
            >
              <SC.ProfileNavButtonCount className="count">
                {followingCount}
              </SC.ProfileNavButtonCount>
              <SC.ProfileNavButtonText className="button-name">
                following
              </SC.ProfileNavButtonText>
              <SC.ProfileNavButtonIcon
                className={feed === "following" ? "icon-active" : ""}
              >
                <Group className="profile-info-icon" />
              </SC.ProfileNavButtonIcon>
            </SC.ProfileNavButton>
          </SC.ProfileHeader>
        </SC.ProfileHeader>
        {loading ? (
          <Loader type={"center-feed"} />
        ) : (
          <div className="feed">
            {/* INFO FEED */}
            {feed === "info" && (
              <div className="feed-wrapper">
                <SC.ProfileInfoContainer className="profileInfo-container">
                  {currentUser._id === profileUser._id &&
                    currentUser._id !==
                      process.env.REACT_APP_TEST_ACCOUNT_ID && (
                      <Link to={`/${currentUser._id}/update`}>
                        <SC.ProfileEditButtonIcon title="update user info">
                          <Edit className="edit-icon" />
                        </SC.ProfileEditButtonIcon>
                      </Link>
                    )}
                  <div className="profile-info-div">
                    <div className="profile-info-strong">Name:</div>{" "}
                    <div className="profile-info-content">
                      {profileUser.firstname} {profileUser.lastname}
                    </div>
                  </div>
                  <div className="profile-info-div">
                    {" "}
                    <div className="profile-info-strong">Bio:</div>{" "}
                    <div className="profile-info-content">
                      {profileUser.about}
                    </div>
                  </div>
                  <div className="profile-info-div">
                    <div className="profile-info-strong">Birthday:</div>{" "}
                    <div className="profile-info-content">
                      {profileUser.birthday
                        ? formatBday(profileUser.birthday)
                        : "private"}
                    </div>
                  </div>
                  <div className="profile-info-div">
                    <div className="profile-info-strong">Location:</div>{" "}
                    <div className="profile-info-content">
                      {profileUser.location ? profileUser.location : "private"}
                    </div>
                  </div>
                  {/* WEBSITE */}
                  <div className="profile-info-div">
                    <div className="profile-info-strong">Website:</div>{" "}
                    <div className="profile-info-content">
                      {profileUser.website ? (
                        <SC.ProfileLink
                          href={profileUser.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="profile-website-a"
                        >
                          {profileUser.website}
                        </SC.ProfileLink>
                      ) : (
                        "private"
                      )}
                    </div>
                  </div>
                  {/* Theme */}
                  <div className="profile-info-div theme">
                    <div className="profile-info-strong">Theme:</div>{" "}
                    <div
                      className={`profile-info-content theme-container ${formatTheme(
                        profileUser.theme
                      )}`}
                    >
                      {profileUser.theme}
                    </div>
                  </div>
                </SC.ProfileInfoContainer>
              </div>
            )}
            {/* POST FEED */}
            {feed === "posts" && (
              <div className="feed-wrapper">
                {(!profileUser.username ||
                  profileUser.username === currentUser.username) && (
                  <div className="share-desktop-container">
                    <Share />
                  </div>
                )}
                {posts.length > 0 && loading === false ? (
                  <div className="profile-posts-feed">
                    {posts.map((post) => (
                      <Post
                        key={post._id}
                        post={post}
                        page="timeline"
                        handleSetModal={handleSetModal}
                        fetchNotifications={fetchNotifications}
                      />
                    ))}
                  </div>
                ) : (
                  <SC.ProfileNoContent className="no-content-message">
                    No posts yet ☹
                  </SC.ProfileNoContent>
                )}
              </div>
            )}
            {/* IMAGES FEED */}
            {feed === "images" && (
              <div className="feed-wrapper">
                {images.length > 0 && loading === false ? (
                  <div className="profile-images-feed">
                    {images.map((image) => (
                      <Image
                        key={image._id}
                        image={image}
                        page="timeline"
                        fetchNotifications={fetchNotifications}
                        handleSetModal={handleSetModal}
                      />
                    ))}
                  </div>
                ) : (
                  <SC.ProfileNoContent className="no-content-message">
                    No images yet ☹
                  </SC.ProfileNoContent>
                )}
              </div>
            )}
            {/* FOLLOWERS FEED */}
            {feed === "followers" && (
              <div className="feed-wrapper">
                {friends.length > 0 ? (
                  <div className="profile-follows-feed">
                    {friends.map((friend) => (
                      <Follower
                        friend={friend}
                        loadNewUser={loadNewUser}
                        followingCount={followingCount}
                        setFollowingCount={setFollowingCount}
                        currentPage={currentPage}
                      />
                    ))}
                  </div>
                ) : (
                  <SC.ProfileNoContent className="no-content-message">
                    Nothing to see here ☹
                  </SC.ProfileNoContent>
                )}
              </div>
            )}
            {/* FOLLOWING FEED */}
            {feed === "following" && (
              <div className="feed-wrapper">
                {friends.length > 0 ? (
                  <div className="profile-follows-feed">
                    {friends.map((friend) => (
                      <Follower
                        friend={friend}
                        loadNewUser={loadNewUser}
                        followingCount={followingCount}
                        setFollowingCount={setFollowingCount}
                        currentPage={currentPage}
                      />
                    ))}
                  </div>
                ) : (
                  <SC.ProfileNoContent className="no-content-message">
                    Nothing to see here ☹
                  </SC.ProfileNoContent>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
