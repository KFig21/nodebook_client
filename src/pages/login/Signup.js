import { React, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.scss";

export default function Signup({ setUserAuth }) {
  // const { register, handleSubmit } = useForm();
  // const [loginErr, setLoginErr] = useState(false);
  let navigate = useNavigate();

  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
      };
      try {
        await axios.post(
          "https://radiant-oasis-77477.herokuapp.com/api/auth/register",
          user
        );
        navigate("/login", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const onSubmit = async (data) => {
  //   const formData = JSON.stringify(data);
  //   try {
  //     const req = await fetch(
  //       "https://radiant-oasis-77477.herokuapp.com/api/sign-up",
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
  //       return;
  //     }
  //     localStorage.setItem("token", myJson.token);
  //     localStorage.setItem("userAuth", true);
  //     setUserAuth(true);
  //     navigate("/", { replace: true });
  //   } catch (err) {
  //     setLoginErr(true);
  //   }
  // };

  return (
    <div className="login-container">
      <div className="login-left">
        {/* <span className="login-left-title">nodebook</span> */}
        <div className="glow"></div>
        <img className="wordmark" src={PF + "assets/wordmark3.png"} alt="" />
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
                // {...register("firstname", { required: true })}
              ></input>
            </div>
            {/* last name */}
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="Last name"
                ref={lastname}
                // {...register("lastname", { required: true })}
              ></input>
            </div>
            {/* username */}
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="Username"
                ref={username}
                // {...register("username", { required: true })}
              ></input>
            </div>
            {/* email */}
            <div>
              <input
                className="form-input"
                type="email"
                placeholder="Email address"
                ref={email}
                // {...register("email", { required: true })}
              ></input>
            </div>
            {/* password */}
            <div>
              <input
                className="form-input"
                placeholder="Password"
                type="password"
                ref={password}
                // {...register("password", { required: true })}
              ></input>
            </div>
            {/* confirm password */}
            <div>
              <input
                className="form-input"
                placeholder="Confirm password"
                type="password"
                ref={confirmPassword}
                // {...register("confirm-password", { required: true })}
              ></input>
            </div>

            <button
              type="submit"
              // onClick={((e) => e.preventDefault(), handleSubmit(onSubmit))}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="login-sub-container">
          <p className="dont-have-an-account">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
          {/* {loginErr && <span className="error-span">Error, try again</span>} */}
        </div>
      </div>
    </div>
  );
}
