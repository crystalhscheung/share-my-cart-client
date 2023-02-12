import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./ItemDetail.scss";

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [isThatUser, setIsThatUser] = useState(false);

  useEffect(() => {
    if (!itemId) {
      return;
    }
    const getItem = async () => {
      const { data } = await axios.get(`http://localhost:8080/items/${itemId}`);
      setItem(data);
    };
    getItem();
  }, [itemId]);

  useEffect(() => {
    if (!currentUser || !item) {
      return;
    }
    if (currentUser.id === item.user_id) {
      setIsThatUser(true);
    }
  }, [currentUser, item]);

  const deleteHandler = (e) => {
    const deleteItem = async (e) => {
      console.log("In delete handler");
      const token = sessionStorage.getItem("JWTtoken");

      const { data } = await axios.delete(
        `http://localhost:8080/items/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    };
    deleteItem();
  };

  const addToCartHandler = (e) => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!token) {
      return;
    }
    const addItemToCart = async () => {
      const { data } = await axios.post(
        `http://localhost:8080/cart/${item.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    };
    addItemToCart();
  };

  return (
    <main className="detail">
      <div className="detail-img__wrapper">
        <img
          src={`http://localhost:8080/images/${item && item.images}`}
          alt={item && item.images}
          className="detail-img"
        />
      </div>
      <div className="detail-info">
        <h3 className="detail-info__name">{item && item.item_name}</h3>
        <Link to={`/user/${item && item.user_id}`}>
          <span className="detail-info__user">
            {item && `From ${item.username}`}
          </span>
        </Link>
        <span className="detail-info__quantity">
          {item && `Quantity: ${item.quantity}`}
        </span>
        <span className="detail-info__price">
          {item && `Price: ${item.price}`}
        </span>
        {item && (
          <span className="detail-info__expiry">
            {item.expiry_date &&
              `Best before: ${item.expiry_date.slice(0, 10)}`}
          </span>
        )}
        <span className="detail-info__description">
          {item && `Description: ${item.description}`}
        </span>
        <div className="detail-info-btns">
          {!isThatUser && (
            <Link
              to={currentUser ? "/user/cart" : "/login"}
              onClick={addToCartHandler}
              className="detail-info-btn detail-info-btn__add">
              Add to Cart
            </Link>
          )}
          {!isThatUser && (
            <button className="detail-info-btn detail-info-btn__buy">
              Buy Now
            </button>
          )}
          {isThatUser && (
            <Link
              to={`/items/edit/${item.id}`}
              className="detail-info-btn detail-info-btn__edit">
              Edit
            </Link>
          )}
          {isThatUser && (
            <Link
              to={`/user/${currentUser.id}`}
              onClick={deleteHandler}
              className="detail-info-btn detail-info-btn__del">
              Delete
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
