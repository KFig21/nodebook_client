import axios from "axios";
// export const url = "https://radiant-oasis-77477.herokuapp.com/api"
export const url = "http://localhost:3000/api"

// ---------- USER ----------
// ---------- USER ----------

// get a user by their username
export const fetchUserByUsername = async (user) => {
  const res = await axios.get(
    `${url}/users?username=${user}`
  );
  return res.data;
};

// get a user by their id
export const fetchUserById = async (user) => {
  const res = await axios.get(
    `${url}/users?userId=${user}`
  );
  return res.data;
};

// update a users theme
export const updateUserTheme = async (data, user) => {
  await axios.put(
    `${url}/users/${user}/theme/`,
    data
  );
};

// edit user info
export const updateUser = async (user, updatedUser) => {
  await axios.put(
    `${url}/users/${user}`,
    updatedUser
  );
};

// unfollow a user
export const updateFollowStatus = async (user, otherUser, follow) => {
  await axios.put(
    `${url}/users/${otherUser}/${follow}`,
    {
      userId: user,
    }
  );
};

// ---------- POST ----------
// ---------- POST ----------

// share post
export const sharePost = async (post) => {
  await axios.post(
    `${url}/posts`,
    post
  );
};

// share post with image
export const sharePostWithImage = async (postWithImg) => {
  await axios.post(
    `${url}/posts/image`,
    postWithImg
  );
};

// get post by id
export const fetchPostById = async (post) => {
  const res = await axios.get(
    `${url}/posts/${post}`
  );
  return res.data;
};

// get post by id
export const fetchTimeline = async (user, skip) => {
  const res = await axios.get(
    `${url}/posts/timeline/${user}/${skip}`
  );
  return res.data;
};

// edit a post
export const editPost = async (post, updatedPost) => {
  await axios.put(
    `${url}/posts/${post}`,
    updatedPost
  );
};

// delete a post
export const deletePost = async (post, user) => {
  await axios.delete(
    `${url}/posts/${post}/`,
    {
      data: {
        userId: user,
      },
    }
  );
};

// get post comments
export const fetchPostComments = async (post, skip) => {
  const res = await axios.get(
    `${url}/posts/${post}/comments/${skip}`
  );
  return res.data;
};

// get post likers
export const fetchPostLikers = async (post, skip, user) => {
  const res = await axios.get(
    `${url}/posts/${post}/likers/${skip}/${user}`
  );
  return res.data;
};

// ---------- PROFILE ----------
// ---------- PROFILE ----------

// get profile users initial posts
export const fetchInitialPosts = async (user) => {
  const res = await axios.get(
    `${url}/posts/profile/${user}/0`
  );
  return res.data;
};

// get profile users posts on scroll
export const fetchScrollPosts = async (user, skip) => {
  const res = await axios.get(
    `${url}/posts/profile/${user}/${skip}`
  );
  return res.data;
};

// get profile users initial images
export const fetchInitialImages = async (user) => {
  const res = await axios.get(
    `${url}/posts/profile/${user}/images/0`
  );
  return res.data;
};

// get profile users images on scroll
export const fetchScrollImages = async (user, skip) => {
  const res = await axios.get(
    `${url}/posts/profile/${user}/images/${skip}`
  );
  return res.data;
};

// get profile users initial follows list
export const fetchInitialfollowsForProfile = async (
  profileUser,
  type,
  currentUser
) => {
  const res = await axios.get(
    `${url}/users/${profileUser}/${type}-profile/${currentUser}/0`
  );
  return res.data;
};

// get profile users follows on scroll
export const fetchScrollfollowsForProfile = async (
  profileUser,
  feed,
  currentUser,
  skip
) => {
  const res = await axios.get(
    `${url}/users/${profileUser}/${feed}-profile/${currentUser}/${skip}`
  );
  return res.data;
};

// get image data
export const fetchImageData = async (image) => {
  const res = await axios.get(
    `${url}/images/${image}`
  );
  return res.data;
};

// ---------- COMMENT ----------
// ---------- COMMENT ----------

// submit a comment
export const submitComment = async (post, comment) => {
  await axios.post(
    `${url}/posts/${post}/comment`,
    comment
  );
};

// get comment by id
export const fetchCommentById = async (comment) => {
  const res = await axios.get(
    `${url}/comments/${comment}`
  );
  return res.data;
};

// delete a comment
export const deleteComment = async (comment, user) => {
  await axios.delete(
    `${url}/comments/${comment}/`,
    {
      data: {
        userId: user,
      },
    }
  );
};

// edit a comment
export const editComment = async (comment, updatedComment) => {
  await axios.put(
    `${url}/comments/${comment}/`,
    updatedComment
  );
};

// get comment likers
export const fetchCommentLikers = async (comment, skip, user) => {
  const res = await axios.get(
    `${url}/comments/${comment}/likers/${skip}/${user}`
  );
  return res.data;
};

// ---------- NOTIFICATIONS ----------
// ---------- NOTIFICATIONS ----------

// get notifications
export const getNotifications = async (user) => {
  const res = await axios.get(
    `${url}/users/notifications?userId=${user}`
  );
  return res.data;
};

// get notifications feed
export const fetchNotificationsFeed = async (user) => {
  const res = await axios.get(
    `${url}/notifications/${user}`
  );
  return res.data;
};

// update a notification
export const updateNotificationStatus = async (notification) => {
  await axios.put(
    `${url}/notifications/${notification}`
  );
};

// delete a notification
export const deleteNotification = async (notification) => {
  await axios.delete(
    `${url}/notifications/${notification}`
  );
};

// delete follow notification (its different)
export const deleteFollowNotification = async (user, otherUser) => {
  axios.delete(
    `${url}/notifications/`,
    {
      data: {
        sender: user,
        recipient: otherUser,
        postId: null,
        commentId: null,
        type: "follow",
      },
    }
  );
};

// send a follow notification
export const sendFollowNotification = async (user, otherUser) => {
  axios.post(
    `${url}/notifications/`,
    {
      sender: user,
      recipient: otherUser,
      postId: null,
      commentId: null,
      type: "follow",
      seen: false,
    }
  );
};

// ---------- FOLLOWERS/FOLLOWING/EXPLORE ----------
// ---------- FOLLOWERS/FOLLOWING/EXPLORE ----------

// get followers/followings list
export const fetchFollowsList = async (user, follow, skip) => {
  const res = await axios.get(
    `${url}/users/${user}/${follow}/${skip}`
  );
  return res.data;
};

// get explore list
export const fetchExploreList = async (user, skip) => {
  const res = await axios.get(
    `${url}/users/explore/${user}/${skip}`
  );
  return res.data;
};

// ---------- AUTH ----------
// ---------- AUTH ----------
// login
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${url}/auth/login`,
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

// logout
export const logoutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT", payload: null });
};
