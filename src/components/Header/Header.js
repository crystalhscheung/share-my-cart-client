import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import searchIcon from "../../assets/icons/search.svg";
import accountIcon from "../../assets/icons/account.svg";
import shoppingcartIcon from "../../assets/icons/shopping_cart.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const { currentUser, setIsLoggedin, isLoggedin } = useContext(UserContext);

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (!e.target.search.value) {
      return;
    }
    navigate(`/items/?search=${e.target.search.value}`);
    e.target.reset();
  };

  const onLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setIsLoggedin(false);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    if (!currentUser.avatar) {
      setAvatar("http://localhost:8080/avatars/avatar_placeholder.jpeg");
    } else if (currentUser.avatar.slice(0, 5) === "https") {
      setAvatar(currentUser.avatar);
    } else if (currentUser.avatar) {
      setAvatar(`http://localhost:8080/avatars/${currentUser.avatar}`);
    }
  }, [currentUser, isLoggedin]);

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">Share My Chart</h1>
      </Link>
      <nav className="nav">
        <form className="nav-searchbar" onSubmit={submitSearchHandler}>
          <input type="search" name="search" className="nav-searchbar__input" />
          <button type="submit" className="nav-searchbar__btn">
            <img src={searchIcon} alt="search icon" className="icon" />
          </button>
        </form>
        <div className="nav-acc">
          {!isLoggedin && (
            <img
              src={accountIcon}
              className="nav-acc__icon icon"
              alt="account icon"
            />
          )}
          {currentUser && isLoggedin && (
            <img
              src={avatar}
              className="nav-acc__avatar icon"
              alt="account icon"
            />
          )}
          <div className="nav-acc__dropdown">
            {!isLoggedin && (
              <Link className="nav-acc__dropdown-link" to="/login">
                Log In
              </Link>
            )}
            {isLoggedin && (
              <Link
                className="nav-acc__dropdown-link"
                to="/"
                onClick={onLogout}>
                Log Out
              </Link>
            )}
            {!isLoggedin && (
              <Link className="nav-acc__dropdown-link" to="/signup">
                Sign up
              </Link>
            )}
            {isLoggedin && currentUser && (
              <Link
                className="nav-acc__dropdown-link"
                to={`/user/${currentUser.id}`}>
                View Profile
              </Link>
            )}
          </div>
        </div>
        {!currentUser && (
          <img
            src={shoppingcartIcon}
            className="nav-shoppingcart icon"
            alt="shopping cart icon"
          />
        )}
        {currentUser && (
          <Link to="/user/cart" className="nav-shoppingcart icon">
            <img
              src={shoppingcartIcon}
              className="nav-shoppingcart icon"
              alt="shopping cart icon"
            />
          </Link>
        )}
      </nav>
    </header>
  );
}
