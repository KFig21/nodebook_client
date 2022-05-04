import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import "./UpdateUser.scss";
import {
  fetchUserByUsername,
  logoutCall,
  updateUser,
} from "../../helpers/apiCalls";
import SC from "../../themes/styledComponents";

export default function UpdateUser() {
  let firstname = useRef();
  let lastname = useRef();
  let username = useRef();
  let email = useRef();
  let about = useRef();
  let location = useRef();
  let website = useRef();
  let birthday = useRef();
  let navigate = useNavigate();
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // gets up to date user info
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchUserByUsername(currentUser.username);
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    const updatedUser = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      username: username.current.value,
      email: email.current.value,
      about: about.current.value,
      location: location.current.value,
      website: website.current.value,
      birthday: birthday.current.value,
      userId: user._id,
    };
    try {
      await updateUser(user._id, updatedUser);
      setError(false);
      setErrorMsg("");
      if (currentUser.username === username.current.value) {
        // if the username did not change, navigate to the timeline
        navigate("/", { replace: true });
      } else {
        dispatch({ type: "USERNAME", payload: username.current.value });
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(true);
      setErrorMsg(err.response.data.msg);
    }
  };

  return (
    <SC.ScrollThumb className="update-user-page">
      <SC.UpdateProfileContainer className="update-form">
        <form onSubmit={handleClick}>
          {/* first name */}
          <div className="update-item-div">
            <label htmlFor="firstname" className="update-label">
              First name:
            </label>
            <SC.UpdateProfileInput
              className="update-form-input"
              type="text"
              placeholder="First name"
              ref={firstname}
              defaultValue={user.firstname ? user.firstname : null}
              // {...register("firstname", { required: true })}
            ></SC.UpdateProfileInput>
          </div>
          {/* last name */}
          <div className="update-item-div">
            <label htmlFor="lastname" className="update-label">
              Last name:
            </label>
            <SC.UpdateProfileInput
              className="update-form-input"
              type="text"
              placeholder="Last name"
              ref={lastname}
              defaultValue={user.lastname ? user.lastname : null}
              // {...register("lastname", { required: true })}
            ></SC.UpdateProfileInput>
          </div>
          {/* username */}
          <div className="update-item-div">
            <label htmlFor="username" className="update-label">
              Username:
            </label>
            <SC.UpdateProfileInput
              className="update-form-input"
              type="text"
              placeholder="Username"
              ref={username}
              defaultValue={user.username ? user.username : null}
              // {...register("username", { required: true })}
            ></SC.UpdateProfileInput>
          </div>
          {/* email */}
          <div className="update-item-div">
            <label htmlFor="email" className="update-label">
              Email:
            </label>
            <SC.UpdateProfileInput
              className="update-form-input"
              type="email"
              placeholder="Email address"
              ref={email}
              defaultValue={user.email ? user.email : null}
              // {...register("email", { required: true })}
            ></SC.UpdateProfileInput>
          </div>
          {/* Bio */}
          <div className="update-item-div">
            <label htmlFor="bio" className="update-label">
              Bio:
            </label>
            <SC.UpdateProfileTextarea
              className="update-form-textarea"
              placeholder="About"
              type="text"
              ref={about}
              defaultValue={user.about ? user.about : null}
              // {...register("password", { required: true })}
            ></SC.UpdateProfileTextarea>
          </div>
          {/* Location */}
          <div className="update-item-div">
            <label htmlFor="location" className="update-label">
              Location:
            </label>
            <SC.UpdateProfileInput
              className="update-form-input"
              placeholder="Location"
              type="text"
              ref={location}
              defaultValue={user.location ? user.location : null}
              // {...register("password", { required: true })}
            ></SC.UpdateProfileInput>
          </div>
          {/* Website */}
          <div className="update-item-div">
            <label htmlFor="website" className="update-label">
              Website:
            </label>
            <SC.UpdateProfileInput
              className="update-form-input"
              placeholder="Website"
              type="text"
              ref={website}
              defaultValue={user.website ? user.website : null}
              // {...register("confirm-password", { required: true })}
            ></SC.UpdateProfileInput>
          </div>
          {/* birthday */}
          <div className="update-item-div">
            <label htmlFor="birthday" className="update-label">
              Birthday:
            </label>
            <SC.UpdateProfileInput
              className="update-form-input"
              placeholder="Website"
              type="date"
              ref={birthday}
              defaultValue={user.birthday ? user.birthday : null}
              // {...register("confirm-password", { required: true })}
            ></SC.UpdateProfileInput>
          </div>

          {error && (
            <div className="error-msg">
              <span>{errorMsg}</span>
            </div>
          )}
          <SC.FollowButton type="submit">Update</SC.FollowButton>
        </form>
      </SC.UpdateProfileContainer>
    </SC.ScrollThumb>
  );
}
