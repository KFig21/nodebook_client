import { useContext, useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./ExploreUser.scss";
import { AuthContext } from "../../../context/AuthContext";
import Loader from "../../loader/Loader";
import noAvi from "../../../assets/noAvatar.png";

export default function Follower({
  friend,
  handleFollowingStatus,
  sidebarOpen,
}) {
  const { user: currentUser } = useContext(AuthContext);
  const [followStatus, setFollowStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollowStatus = async () => {
      setTimeout(async function () {
        if (friend._id === (await currentUser._id)) {
          setFollowStatus("you");
        } else if (
          friend.followingStatus === true &&
          friend.followerStatus === true
        ) {
          setFollowStatus("mutual following");
        } else if (
          friend.followingStatus === false &&
          friend.followerStatus === true
        ) {
          setFollowStatus("follows you");
        } else if (
          friend.followingStatus === true &&
          friend.followerStatus === false
        ) {
          setFollowStatus("doesn't follow you");
        }
        setLoading(false);
      }, 1000);
    };
    checkFollowStatus();
  });

  return (
    <div className="follow-container" key={friend._id}>
      {loading ? (
        <Loader type={"follower"} />
      ) : (
        <>
          <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
          >
            <div className="follow-container-left">
              <img
                src={friend.profilePicture ? friend.profilePicture : noAvi}
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
              <button
                disabled={sidebarOpen}
                className="follow-button"
                onClick={() =>
                  handleFollowingStatus(friend.followingStatus, friend)
                }
              >
                {friend.followingStatus ? "Unfollow" : "Follow"}
                {friend.followingStatus ? <Remove /> : <Add />}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}