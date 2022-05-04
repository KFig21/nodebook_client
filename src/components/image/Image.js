import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import noAvi from "../../assets/noAvatar.png";
import { Comment, Favorite } from "@material-ui/icons";
import "./Image.scss";
import Loader from "../loader/Loader";
import SC from "../../themes/styledComponents";
import { fetchImageData, fetchPostById } from "../../helpers/apiCalls";

export default function Image({ image, fetchNotifications, handleSetModal }) {
  const [imageData, setImageData] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const getImageData = async () => {
    setTimeout(async function () {
      const res = await fetchImageData(image._id);
      setImageData(res);
    }, 500);
  };

  useEffect(() => {
    getImageData();
  }, [image]);

  const handleSendImageInfo = async (postId) => {
    const fetchPost = async () => {
      const res = await fetchPostById(postId);
      sendPost(res);
    };
    const sendPost = async (post) => {
      handleSetModal(post);
    };
    fetchPost();
  };

  return (
    <SC.ProfileImagesContainer
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
    </SC.ProfileImagesContainer>
  );
}
