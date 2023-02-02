import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import searchIcon from "../../assets/icons/search.svg";
import accountIcon from "../../assets/icons/account.svg";
import shoppingcartIcon from "../../assets/icons/shopping_cart.svg";

export default function Header() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/items/?search=${e.target.search.value}`);
    e.target.reset();
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
          <img
            src={accountIcon}
            className="nav-acc__icon icon"
            alt="account icon"
          />
          <div className="nav-acc__dropdown">
            <Link className="nav-acc__dropdown-link" to="/login">
              Log In
            </Link>
            <Link className="nav-acc__dropdown-link" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
        <img
          src={shoppingcartIcon}
          className="nav-shoppingcart icon"
          alt="shopping cart icon"
        />
      </nav>
    </header>
  );
}
