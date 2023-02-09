import "./LoginPage.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import jwt_decode from "jwt-decode";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedin, isLoggedin, currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const login = async () => {
      const { data } = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });
      sessionStorage.setItem("JWTtoken", data.token);
      setIsLoggedin(true);
      navigate("/");
    };
    login();
  };

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    const googleUser = jwt_decode(res.credential);
    console.log(googleUser);

    const userFromGoogle = {
      username: googleUser.given_name,
      email: googleUser.email,
      avatar: googleUser.picture,
      is_login_with_google: true,
    };

    const loginWithGoogle = async () => {
      const { data } = await axios.post(
        "http://localhost:8080/user/google",
        userFromGoogle
      );
      // console.log(data);
      sessionStorage.setItem("JWTtoken", data.token);
      setIsLoggedin(true);
      console.log(isLoggedin, currentUser);
      navigate("/");
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
        <button className="login-form__btn" type="submit">
          Log in
        </button>
      </form>
      <div id="signInDiv"></div>
    </main>
  );
}
