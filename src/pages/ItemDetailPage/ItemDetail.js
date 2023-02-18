import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./ItemDetail.scss";

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const [isThatUser, setIsThatUser] = useState(false);
  const { itemId } = useParams();
  const { currentUser } = useContext(UserContext);
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!itemId) {
      return;
    }
    const getItem = async () => {
      try {
        const { data } = await axios.get(`${url}/items/${itemId}`);
        setItem(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [itemId, url]);

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
      try {
        const token = sessionStorage.getItem("JWTtoken");

        await axios.delete(`${url}/items/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    <main className="detail">
      <div className="detail-img__wrapper">
        {item && (
          <img
            src={`${url}/images/${item.images}`}
            alt={item && item.images}
            className="detail-img"
          />
        )}
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
            <Link
              to={"/checkout"}
              className="detail-info-btn detail-info-btn__buy">
              Buy Now
            </Link>
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
