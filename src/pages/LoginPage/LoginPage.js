import "./LoginPage.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedin } = useContext(UserContext);

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
    </main>
  );
}
