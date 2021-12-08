import React, { useContext } from "react";
import "./CenterFeed.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AccountBox, Chat, Group, Edit } from "@material-ui/icons";
// component imports
import Loader from "../../components/loader/Loader";
import Share from "../share/Share";
import Post from "../post/Post";
import Follower from "../follower/Follower";

export default function CenterFeed({
  profileUser,
  feed,
  handleChangeFeed,
  fetchNotifications,
  loading,
  posts,
  friends,
  handleFollowingStatus,
  sidebarOpen,
}) {
  const { user: currentUser } = useContext(AuthContext);

  const formatBday = (date) => {
    let arr = date.split("-");
    let formattedDate = arr[1] + "/" + arr[2] + "/" + arr[0];
    return formattedDate;
  };

  return (
    <>
      <div className="profile-feed">
        <div className="profile-header">
          <div className="profile-header-wrapper">
            <div className="profile-info">
              <h4 className="profile-info-username">{profileUser.username}</h4>
              <span className="profile-info-name">
                {profileUser.firstname} {profileUser.lastname}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-header-buttons-container">
          <div className="profile-header-buttons-wrapper">
            {/* INFO BUTTON */}
            <div
              style={sidebarOpen ? { pointerEvents: "none" } : {}}
              onClick={() => handleChangeFeed("info")}
              className={
                "profile-info-clickable " +
                (feed === "info" ? "pic-active" : "")
              }
            >
              info
              <AccountBox className="profile-info-icon" />
            </div>
            {/* POSTS BUTTON */}
            <div
              style={sidebarOpen ? { pointerEvents: "none" } : {}}
              onClick={() => handleChangeFeed("posts")}
              className={
                "profile-info-clickable " +
                (feed === "posts" ? "pic-active" : "")
              }
            >
              <span className="count">
                {profileUser.posts ? profileUser.posts.length : "0"}
              </span>
              posts
              <Chat className="profile-info-icon" />
            </div>
            {/* FOLLOWERS BUTTON */}
            <div
              style={sidebarOpen ? { pointerEvents: "none" } : {}}
              onClick={() => handleChangeFeed("followers")}
              className={
                "profile-info-clickable " +
                (feed === "followers" ? "pic-active" : "")
              }
            >
              <span className="count">
                {profileUser.followers ? profileUser.followers.length : "0"}
              </span>
              followers
              <Group className="profile-info-icon" />
            </div>
            {/* FOLLOWING BUTTON */}
            <div
              style={sidebarOpen ? { pointerEvents: "none" } : {}}
              onClick={() => handleChangeFeed("following")}
              className={
                "profile-info-clickable " +
                (feed === "following" ? "pic-active" : "")
              }
            >
              <span className="count">
                {profileUser.followings ? profileUser.followings.length : "0"}
              </span>
              following
              <Group className="profile-info-icon" />
            </div>
          </div>
        </div>
        {loading ? (
          <Loader type={"center-feed"} />
        ) : (
          <div className="feed">
            {/* INFO FEED */}
            {feed === "info" && (
              <div className="feed-wrapper">
                <div className="profileInfo-container">
                  {currentUser._id === profileUser._id && (
                    <Link to={`/${currentUser._id}/update`}>
                      <div title="update user info">
                        <Edit className="edit-icon" />
                      </div>
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
                        <a
                          href={profileUser.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="profile-website-a"
                        >
                          {profileUser.website}
                        </a>
                      ) : (
                        "private"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* POST FEED */}
            {feed === "posts" && (
              <div className="feed-wrapper">
                {(!profileUser.username ||
                  profileUser.username === currentUser.username) && <Share />}
                {posts.length > 0 ? (
                  <>
                    {posts.map((p) => (
                      <Post
                        key={p._id}
                        post={p}
                        page="timeline"
                        fetchNotifications={fetchNotifications}
                      />
                    ))}
                  </>
                ) : (
                  <span className="no-content-message">No posts yet ☹</span>
                )}
              </div>
            )}
            {/* FOLLOWERS FEED */}
            {feed === "followers" && (
              <div className="feed-wrapper">
                {friends.length > 0 ? (
                  <>
                    {friends.map((friend) => (
                      <Follower
                        friend={friend}
                        handleChangeFeed={handleChangeFeed}
                        handleFollowingStatus={handleFollowingStatus}
                      />
                    ))}
                  </>
                ) : (
                  <span className="no-content-message">
                    Nothing to see here ☹
                  </span>
                )}
              </div>
            )}
            {/* FOLLOWING FEED */}
            {feed === "following" && (
              <div className="feed-wrapper">
                {friends.length > 0 ? (
                  <>
                    {friends.map((friend) => (
                      <Follower
                        friend={friend}
                        handleChangeFeed={handleChangeFeed}
                        handleFollowingStatus={handleFollowingStatus}
                      />
                    ))}
                  </>
                ) : (
                  <span className="no-content-message">
                    Nothing to see here ☹
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
