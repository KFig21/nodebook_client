import { React, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import Loader from "../../components/loader/Loader";
import "./Login.scss";
// import { loginCall } from "../../apiCalls";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import wordmark from "../../assets/wordmark4.png";

export default function Login() {
  // const { register, handleSubmit } = useForm();
  const [loginErr, setLoginErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   const formData = JSON.stringify(data);
  //   try {
  //     const req = await fetch(
  //       "https://radiant-oasis-77477.herokuapp.com/api/auth/login",
  //       {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const myJson = await req.json();
  //     if (req.status !== 200) {
  //       setLoginErr(true);
  //       setLoading(false);
  //       return;
  //     }
  //     localStorage.setItem("token", myJson.token);
  //     localStorage.setItem("userAuth", true);
  //     setUserAuth(true);
  //     navigate("/", { replace: true });
  //   } catch (err) {
  //     setLoginErr(true);
  //     setLoading(false);
  //   }
  // };
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

  return (
    <>
      {loading ? (
        <Loader type={"full-screen"} />
      ) : (
        <div className="login-container">
          <div className="login-left">
            {/* <span className="login-left-title">nodebook</span> */}
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
                    // {...register("usermail", { required: true })}
                    ref={usermail}
                    required
                  ></input>
                </div>

                <div>
                  <input
                    className="form-input"
                    placeholder="Password"
                    type="password"
                    // {...register("password", { required: true })}
                    ref={password}
                    required
                  ></input>
                </div>

                <button
                  type="submit"
                  // onClick={((e) => e.preventDefault(), handleSubmit(onSubmit))}
                  disabled={isFetching}
                >
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
