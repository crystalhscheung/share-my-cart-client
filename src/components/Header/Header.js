import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import searchIcon from "../../assets/icons/search.svg";
import accountIcon from "../../assets/icons/account.svg";
import shoppingcartIcon from "../../assets/icons/shopping_cart.svg";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, isLoggedin, setCurrentUser, setIsLoggedin } =
    useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/items/?search=${e.target.search.value}`);
    e.target.reset();
  };

  const onLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    setIsLoggedin(false);
    setCurrentUser(null);
  };

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">Share My Chart</h1>
      </Link>
      <nav className="nav">
        <form className="nav-searchbar" onSubmit={submitHandler}>
          <input type="search" name="search" className="nav-searchbar__input" />
          <button type="submit" className="nav-searchbar__btn">
            <img src={searchIcon} alt="search icon" className="icon" />
          </button>
        </form>
        <div className="nav-acc">
          {!currentUser && (
            <img
              src={accountIcon}
              className="nav-acc__icon icon"
              alt="account icon"
            />
          )}
          {currentUser && (
            <img
              src={`http://localhost:8080/avatars/${
                currentUser.avatar ?? "avatar_placeholder.jpeg"
              }`}
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
            {!currentUser && (
              <Link className="nav-acc__dropdown-link" to="/signup">
                Sign up
              </Link>
            )}
            {currentUser && (
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
            {" "}
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
