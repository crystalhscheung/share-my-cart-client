import "./LoginPage.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import jwt_decode from "jwt-decode";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setIsLoggedin } = useContext(UserContext);
  const url = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrMsg("Please fill in all the information");
      return;
    }

    const login = async () => {
      try {
        const { data } = await axios.post(`${url}/user/login`, {
          username,
          password,
        });
        sessionStorage.setItem("JWTtoken", data.token);
        setIsLoggedin(true);
        navigate("/");
      } catch (error) {
        setErrMsg(error.response.data.error);
      }
    };
    login();
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
    <main className="login">
      <h2 className="login-title">Log in</h2>
      <form className="login-form" onSubmit={submitHandler}>
        <input
          className="login-form__input"
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-form__input"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errMsg && <span className="login-form__err">{errMsg}</span>}
        <button className="login-form__btn" type="submit">
          Log in
        </button>
      </form>
      <span className="login-or">OR</span>
      <div id="signInDiv"></div>
    </main>
  );
}
