import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";

import "./HomePage.scss";

export default function HomePage() {
  return (
    <main className="main">
      <div className="carousel">
        <h2 className="carousel-title">Trending Deals</h2>
        <Carousel />
      </div>
      <div className="discount">
        <Link to="/signup" className="discount__banner">
          Sign up and get $10 off for your first order
        </Link>
      </div>
      <div className="categories">
        <Link
          to={`/items/?category=household`}
          className="category category--household">
          Household
        </Link>
        <Link
          to={`/items/?category=grocery`}
          className="category category--grocery">
          Grocery
        </Link>
        <Link
          to={`/items/?category=apparel`}
          className="category category--apparel">
          Apparel
        </Link>
        <Link
          to={`/items/?category=personal-care`}
          className="category category--personal-care">
          Personal Care
        </Link>
        <Link
          to={`/items/?category=electronics`}
          className="category category--electronics">
          Electronics
        </Link>
        <Link
          to={`/items/?category=books`}
          className="category category--books">
          Books
        </Link>
      </div>
    </main>
  );
}
