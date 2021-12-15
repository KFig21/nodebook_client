import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import noAvi from "../../assets/noAvatar.png";
import { Comment, Favorite } from "@material-ui/icons";
import "./Image.scss";
import Loader from "../loader/Loader";

export default function Image({ image, fetchNotifications, handleSetModal }) {
  const [imageData, setImageData] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const getImageData = async () => {
    setTimeout(async function () {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/images/${image._id}`
        // `http://localhost:3000/api/images/${image._id}`
      );
      setImageData(res.data);
    }, 500);
  };

  useEffect(() => {
    getImageData();
  }, [image]);

  const handleSendImageInfo = async (postId) => {
    const fetchPost = async () => {
      const res = await axios.get(
        `https://radiant-oasis-77477.herokuapp.com/api/posts/${postId}`
        // `http://localhost:3000/api/images/${image._id}`
      );
      sendPost(res.data);
    };
    const sendPost = async (post) => {
      handleSetModal(post);
    };
    fetchPost();
  };

  return (
    <div
      className="image-wrapper"
      onClick={() => handleSendImageInfo(image.postId)}
    >
      <div className="image-data-container">
        <div className="image-data">
          {imageData.comments && (
            <div className="image-data-noti-container">
              {imageData.comments.length}{" "}
              <Comment className="image-data-icon" />
            </div>
          )}
          {imageData.likerIds && (
            <div className="image-data-noti-container">
              {imageData.likerIds.length}{" "}
              <Favorite className="image-data-icon" />
            </div>
          )}
        </div>
      </div>
      {imageData.img ? (
        <img
          src={
            imageData.img
              ? "https://nodebook-images.s3.amazonaws.com/" + imageData.img
              : noAvi
          }
          className="profile-images-img"
          alt=""
        />
      ) : (
        <Loader type={" profile-image"} />
      )}
    </div>
  );
}
