import { React, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import wordmark from "../../assets/wordmark.png";
import "./Login.scss";

export default function Signup() {
  let navigate = useNavigate();

  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      };
      try {
        await axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/auth/register",
          // "http://localhost:3000/api/auth/register",
          user
        );
        navigate("/login", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="glow"></div>
        <img className="wordmark" src={wordmark} alt="" />
      </div>
      <div className="login-right">
        <div className="login-form">
          <form onSubmit={handleClick}>
            {/* first name */}
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="First name"
                ref={firstname}
              ></input>
            </div>
            {/* last name */}
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="Last name"
                ref={lastname}
              ></input>
            </div>
            {/* username */}
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="Username"
                ref={username}
              ></input>
            </div>
            {/* email */}
            <div>
              <input
                className="form-input"
                type="email"
                placeholder="Email address"
                ref={email}
              ></input>
            </div>
            {/* password */}
            <div>
              <input
                className="form-input"
                placeholder="Password"
                type="password"
                ref={password}
              ></input>
            </div>
            {/* confirm password */}
            <div>
              <input
                className="form-input"
                placeholder="Confirm password"
                type="password"
                ref={confirmPassword}
              ></input>
            </div>

            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className="login-sub-container">
          <p className="dont-have-an-account">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
