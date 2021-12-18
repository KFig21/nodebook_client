import { useContext, useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
import noAvi from "../../assets/noAvatar.png";
import SC from "../../themes/styledComponents";
import {
  updateFollowStatus,
  deleteFollowNotification,
  sendFollowNotification,
} from "../../helpers/apiCalls";
import "./Follower.scss";

export default function Follower({
  friend,
  sidebarOpen,
  loadNewUser,
  currentPage,
  followingCount,
  setFollowingCount,
}) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followStatus, setFollowStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);

  const handleFollowingStatus = async (followedStatus, userInQuestion) => {
    const updateFollow = async () => {
      try {
        if (followedStatus) {
          await updateFollowStatus(
            currentUser._id,
            userInQuestion._id,
            "unfollow"
          );
          dispatch({ type: "UNFOLLOW", payload: userInQuestion._id });
          if (currentPage === "Profile") {
            setFollowingCount(followingCount - 1);
          }
          // delete follow notification
          try {
            await deleteFollowNotification(currentUser._id, userInQuestion._id);
          } catch (err) {}
        } else {
          await updateFollowStatus(
            currentUser._id,
            userInQuestion._id,
            "follow"
          );
          dispatch({ type: "FOLLOW", payload: userInQuestion._id });
          if (currentPage === "Profile") {
            setFollowingCount(followingCount + 1);
          }
          // send follow notification
          try {
            await sendFollowNotification(currentUser._id, userInQuestion._id);
          } catch (err) {}
        }
        setFollowed(!followed);
        updateRelationship();
      } catch (err) {}
    };
    updateFollow();
  };

  const updateRelationship = async () => {
    if (friend._id === (await currentUser._id)) {
      setFollowStatus("you");
    } else if (!followed === true && friend.followerStatus === true) {
      setFollowStatus("mutual following");
    } else if (!followed === false && friend.followerStatus === true) {
      setFollowStatus("follows you");
    } else if (!followed === true && friend.followerStatus === false) {
      setFollowStatus("doesn't follow you");
    } else {
      setFollowStatus("");
    }
  };

  const checkInitialFollowStatus = async () => {
    setTimeout(async function () {
      if (friend._id === (await currentUser._id)) {
        setFollowStatus("you");
      } else if (
        friend.followingStatus === true &&
        friend.followerStatus === true
      ) {
        setFollowStatus("mutual following");
        setFollowed(true);
      } else if (
        friend.followingStatus === false &&
        friend.followerStatus === true
      ) {
        setFollowStatus("follows you");
        setFollowed(false);
      } else if (
        friend.followingStatus === true &&
        friend.followerStatus === false
      ) {
        setFollowStatus("doesn't follow you");
        setFollowed(true);
      } else {
        setFollowStatus("");
        setFollowed(false);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    checkInitialFollowStatus();
  }, []);

  return (
    <SC.FollowContainer
      className={
        followStatus !== "you"
          ? "follow-container"
          : "follow-container current-user-container"
      }
      key={friend._id}
    >
      {loading ? (
        <Loader type={"follower"} />
      ) : (
        <>
          <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
            onClick={() =>
              currentPage === "Followers" || currentPage === "Following"
                ? null
                : loadNewUser(friend.username)
            }
          >
            <div className="follow-container-left">
              <img
                src={
                  friend.avatar
                    ? "https://nodebook-images.s3.amazonaws.com/" +
                      friend.avatar
                    : noAvi
                }
                alt=""
                className="follow-img"
              />
              <div className="follow-user-info">
                <span className="follow-username">{friend.username}</span>
                <span className="follow-name">
                  {friend.firstname} {friend.lastname}
                </span>
              </div>
            </div>
          </Link>
          {/* follow unfollow button */}
          {followStatus !== "you" && (
            <div className="follow-container-right">
              <span className="follow-status-span">{followStatus}</span>
              <SC.FollowButton
                disabled={sidebarOpen}
                className={
                  followed ? "follow-button Unfollow" : "follow-button Follow"
                }
                onClick={() => handleFollowingStatus(followed, friend)}
              >
                {followed ? "Unfollow " : "Follow "}
                {followed ? <Remove /> : <Add />}
              </SC.FollowButton>
            </div>
          )}
        </>
      )}
    </SC.FollowContainer>
  );
}
