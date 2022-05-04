import { React, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import "./Login.scss";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import wordmark from "../../assets/wordmark.png";

export default function Login() {
  const [loginErr, setLoginErr] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const usermail = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/auth/login",
          // "http://localhost:3000/api/auth/login",
          { usermail: usermail.current.value, password: password.current.value }
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        setLoading(false);
        navigate("/", { replace: true });
      } catch (err) {
        setLoginErr(true);
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const justVisiting = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/auth/login",
          // "http://localhost:3000/api/auth/login",
          {
            usermail: "TestAccount",
            password: process.env.REACT_APP_TEST_ACCOUNT_PASSWORD,
          }
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        setLoading(false);
        navigate("/", { replace: true });
      } catch (err) {
        setLoginErr(true);
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loader type={"login"} />
      ) : (
        <div className="login-container">
          <div className="login-left">
            <div className="glow"></div>
            <img className="wordmark" src={wordmark} alt="" />
          </div>
          <div className="login-right">
            <div className="login-form">
              <form onSubmit={handleClick}>
                <div>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Username or email"
                    ref={usermail}
                    required
                  ></input>
                </div>

                <div>
                  <input
                    className="form-input"
                    placeholder="Password"
                    type="password"
                    ref={password}
                    required
                  ></input>
                </div>

                <button type="submit" disabled={isFetching}>
                  {isFetching ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
            <div className="login-sub-container">
              <p className="dont-have-an-account">
                Don't have an account?
                <Link to="/signup"> Sign-up</Link>
              </p>
              <div className="just-visiting-container">
                Wanna look around?{" "}
                <button onClick={justVisiting}>Just visiting</button>
              </div>
              {loginErr && (
                <span className="error-span">
                  Username or password incorrect
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
