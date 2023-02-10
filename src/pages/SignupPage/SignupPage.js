import "./SignupPage.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function SignUpPage() {
  const { setIsLoggedin, isLoggedin, currentUser, setCurrentUser } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const signup = async () => {
      const { data } = await axios.post("http://localhost:8080/user/signup", {
        username,
        email,
        password,
      });
      sessionStorage.setItem("JWTtoken", data.token);
      setIsLoggedin(true);

      const token = sessionStorage.getItem("JWTtoken");
      const getUserWithToken = async () => {
        const { data } = await axios.get(
          "http://localhost:8080/user/autologin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(data.user);
      };
      getUserWithToken();
    };
    signup();
    navigate("/");
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
        <button className="signup-form__btn" type="submit">
          Sign up
        </button>
      </form>
      <div id="signInDiv"></div>
    </main>
  );
}
