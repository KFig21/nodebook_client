import { useContext, useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Liker.scss";
import { AuthContext } from "../../../context/AuthContext";
import Loader from "../../loader/Loader";
import noAvi from "../../../assets/noAvatar.png";

export default function Liker({ liker, handleFollowingStatus, sidebarOpen }) {
  const { user: currentUser } = useContext(AuthContext);
  const [followStatus, setFollowStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollowStatus = async () => {
      setTimeout(async function () {
        if (liker._id === (await currentUser._id)) {
          setFollowStatus("you");
        } else if (
          liker.followingStatus === true &&
          liker.followerStatus === true
        ) {
          setFollowStatus("mutual following");
        } else if (
          liker.followingStatus === false &&
          liker.followerStatus === true
        ) {
          setFollowStatus("follows you");
        } else if (
          liker.followingStatus === true &&
          liker.followerStatus === false
        ) {
          setFollowStatus("doesn't follow you");
        }
        setLoading(false);
      }, 1000);
    };
    checkFollowStatus();
  });

  return (
    <div
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
                  liker.profilePicture
                    ? "data:image/jpg;base64," + liker.profilePicture
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
              <button
                disabled={sidebarOpen}
                className="follow-button"
                onClick={() =>
                  handleFollowingStatus(liker.followingStatus, liker)
                }
              >
                {liker.followingStatus ? "Unfollow" : "Follow"}
                {liker.followingStatus ? <Remove /> : <Add />}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
