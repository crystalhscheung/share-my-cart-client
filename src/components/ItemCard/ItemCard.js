import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./ItemCard.scss";

export default function ItemCard({ item }) {
  const { currentUser } = useContext(UserContext);
  const [isThatUser, setIsThatUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    if (currentUser.id === item.user_id) {
      setIsThatUser(true);
    }
  }, [currentUser]);

  const deleteHandler = (e) => {
    e.stopPropagation();
    const deleteItem = async () => {
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
      navigate(`/user/${item.user_id}`);
    };
    deleteItem();
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
          <span className="itemCard-info__user">{item.username}</span>
        </Link>
        <span className="itemCard-info__quantity">{item.quantity}</span>
        <span className="itemCard-info__price">{`$${item.price}`}</span>
      </div>
      <div className="itemCard-btns">
        {!isThatUser && (
          <button className="itemCard-btns__add">Add to Cart</button>
        )}
        {!isThatUser && <button className="itemCard-btns__buy">Buy Now</button>}
        {isThatUser && (
          <Link to={`/items/edit/${item.id}`} className="itemCard-btns__edit">
            Edit
          </Link>
        )}
        {isThatUser && (
          <button onClick={deleteHandler} className="itemCard-btns__del">
            Delete
          </button>
        )}
      </div>
    </Link>
  );
}
