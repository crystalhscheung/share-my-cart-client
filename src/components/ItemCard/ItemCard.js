import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./ItemCard.scss";

export default function ItemCard({ item }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isThatUser, setIsThatUser] = useState(false);
  const url = process.env.REACT_APP_API;

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    if (currentUser.id === item.user_id) {
      setIsThatUser(true);
    }
  }, [currentUser, item]);

  const deleteHandler = (e) => {
    const deleteItem = async (e) => {
      try {
        const token = sessionStorage.getItem("JWTtoken");
        await axios.delete(`${url}/items/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser();
      } catch (error) {
        console.log(error);
      }
    };
    deleteItem();
  };

  const addToCartHandler = (e) => {
    const token = sessionStorage.getItem("JWTtoken");
    if (!token) {
      return;
    }
    const addItemToCart = async () => {
      try {
        await axios.post(
          `${url}/cart/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    addItemToCart();
  };

  return (
    <div className="itemCard">
      <Link to={`/items/${item.id}`} className="itemCard-link"></Link>
      <div className="itemCard-imgs">
        <img
          className="itemCard-img"
          alt={item.name}
          src={`${url}/images/${item.images}`}
        />
      </div>
      <div className="itemCard-info">
        <h3 className="itemCard-info__name">{item.item_name}</h3>
        <Link to={`/user/${item.user_id}`} className="itemCard-info__user">
          <span className="itemCard-info__user">{`From ${item.username}`}</span>
        </Link>
        <span className="itemCard-info__quantity">{`Quantity: ${item.quantity}`}</span>
        <span className="itemCard-info__price">{`Price: $${item.price}`}</span>
      </div>
      <div className="itemCard-btns">
        {!isThatUser && (
          <Link
            to={currentUser ? "/user/cart" : "/login"}
            onClick={addToCartHandler}
            className="itemCard-btn itemCard-btn__add">
            + cart
          </Link>
        )}
        {!isThatUser && (
          <Link to={"/checkout"} className="itemCard-btn itemCard-btn__buy">
            Buy Now
          </Link>
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
    </div>
  );
}
