import { Link } from "react-router-dom";
import "./ItemCard.scss";

export default function ItemCard({ item }) {
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
        <span className="itemCard-info__price">{item.price}</span>
      </div>
      <div className="itemCard-btns">
        <button className="itemCard-btns__add">Add to Cart</button>
        <button className="itemCard-btns__buy">Buy Now</button>
      </div>
    </Link>
  );
}
