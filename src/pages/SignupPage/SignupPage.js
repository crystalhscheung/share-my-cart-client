import "./SignupPage.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function SignUpPage() {
  const { setIsLoggedin, isLoggedin, currentUser } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrMsg("Please fill in all the information");
      return;
    }

    const signup = async () => {
      try {
        const { data } = await axios.post(`${url}/user/signup`, {
          username,
          email,
          password,
        });
        sessionStorage.setItem("JWTtoken", data.token);
        setIsLoggedin(true);
        navigate("/");
      } catch (error) {
        setErrMsg(error.response.data);
      }
    };
    signup();
  };

  const handleCallbackResponse = (res) => {
    const googleUser = jwt_decode(res.credential);

    const userFromGoogle = {
      username: googleUser.given_name,
      email: googleUser.email,
      avatar: googleUser.picture,
      is_login_with_google: true,
    };

    const loginWithGoogle = async () => {
      try {
        const { data } = await axios.post(`${url}/user/google`, userFromGoogle);
        sessionStorage.setItem("JWTtoken", data.token);
        setIsLoggedin(true);
        console.log(isLoggedin, currentUser);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    loginWithGoogle();
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "226234521231-2ftfkolcj5r67fs714u6afi6tdvlbhr3.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <main className="signup">
      <h2 className="signup-title">Sign up</h2>
      <form className="signup-form" onSubmit={submitHandler}>
        <input
          className="signup-form__input"
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="signup-form__input"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signup-form__input"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errMsg && <span className="signup-form__err">{errMsg}</span>}
        <button className="signup-form__btn" type="submit">
          Sign up
        </button>
      </form>
      <span className="signup-or">OR</span>
      <div id="signInDiv"></div>
    </main>
  );
}
