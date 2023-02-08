import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./ItemCard.scss";

export default function ItemCard({ item }) {
  const { currentUser } = useContext(UserContext);
  const [isThatUser, setIsThatUser] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    if (currentUser.id === item.user_id) {
      setIsThatUser(true);
    }
  }, [currentUser]);

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
    const addItemToCart = async () => {
      const token = sessionStorage.getItem("JWTtoken");

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
    <Link to={`/items/${item.id}`} className="itemCard">
      <div className="itemCard-imgs">
        <img
          className="itemCard-img"
          src={`http://localhost:8080/images/${item.images}`}
        />
      </div>
      <div className="itemCard-info">
        <h3 className="itemCard-info__name">{item.item_name}</h3>
        <Link to={`/user/${item.user_id}`}>
          <span className="itemCard-info__user">{`From ${item.username}`}</span>
        </Link>
        <span className="itemCard-info__quantity">{`Quantity: ${item.quantity}`}</span>
        <span className="itemCard-info__price">{`Price: $${item.price}`}</span>
      </div>
      <div className="itemCard-btns">
        {!isThatUser && (
          <Link
            to={`/user/cart`}
            onClick={addToCartHandler}
            className="itemCard-btn itemCard-btn__add">
            +Cart
          </Link>
        )}
        {!isThatUser && (
          <button className="itemCard-btn itemCard-btn__buy">Buy Now</button>
        )}
        {isThatUser && (
          <Link
            to={`/items/edit/${item.id}`}
            className="itemCard-btn itemCard-btn__edit">
            Edit
          </Link>
        )}
        {isThatUser && (
          <Link
            to={`/user/${currentUser.id}`}
            onClick={deleteHandler}
            className="itemCard-btn itemCard-btn__del">
            Delete
          </Link>
        )}
      </div>
    </Link>
  );
}
