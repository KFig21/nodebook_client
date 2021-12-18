import { useContext, useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Liker.scss";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Loader from "../../loader/Loader";
import noAvi from "../../../assets/noAvatar.png";
import SC from "../../../themes/styledComponents";
import {
  deleteFollowNotification,
  updateFollowStatus,
  sendFollowNotification,
} from "../../../helpers/apiCalls";

export default function Liker({ liker, sidebarOpen }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [followStatus, setFollowStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFollowingStatus = async (followed, userInQuestion) => {
    const updateFollow = async () => {
      try {
        if (followed) {
          await updateFollowStatus(
            currentUser._id,
            userInQuestion._id,
            "unfollow"
          );
          dispatch({ type: "UNFOLLOW", payload: userInQuestion._id });
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
    if (liker._id === (await currentUser._id)) {
      setFollowStatus("you");
    } else if (!followed === true && liker.followerStatus === true) {
      setFollowStatus("mutual following");
    } else if (!followed === false && liker.followerStatus === true) {
      setFollowStatus("follows you");
    } else if (!followed === true && liker.followerStatus === false) {
      setFollowStatus("doesn't follow you");
    } else {
      setFollowStatus("");
    }
  };

  const checkInitialFollowStatus = async () => {
    setTimeout(async function () {
      if (liker._id === (await currentUser._id)) {
        setFollowStatus("you");
      } else if (
        liker.followingStatus === true &&
        liker.followerStatus === true
      ) {
        console.log(liker);
        setFollowStatus("mutual following");
        setFollowed(true);
      } else if (
        liker.followingStatus === false &&
        liker.followerStatus === true
      ) {
        setFollowStatus("follows you");
        setFollowed(false);
      } else if (
        liker.followingStatus === true &&
        liker.followerStatus === false
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
      key={liker._id}
    >
      {loading ? (
        <Loader type={"follower"} />
      ) : (
        <>
          <Link
            to={"/profile/" + liker.username}
            style={{ textDecoration: "none" }}
          >
            <div className="follow-container-left">
              <img
                src={
                  liker.avatar
                    ? "https://nodebook-images.s3.amazonaws.com/" + liker.avatar
                    : noAvi
                }
                alt=""
                className="follow-img"
              />
              <div className="follow-user-info">
                <span className="follow-username">{liker.username}</span>
                <span className="follow-name">
                  {liker.firstname} {liker.lastname}
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
                  liker.followingStatus
                    ? "follow-button Unfollow"
                    : "follow-button Follow"
                }
                onClick={() => handleFollowingStatus(followed, liker)}
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
