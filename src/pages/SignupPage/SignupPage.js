import "./SignupPage.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const { setIsLoggedin } = useContext(UserContext);
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
      console.log(data);
      sessionStorage.setItem("JWTtoken", data.token);
      setIsLoggedin(true);
    };
    signup();
    navigate("/");
  };

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
    </main>
  );
}
