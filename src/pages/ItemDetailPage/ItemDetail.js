import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.scss";

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    const getItem = async () => {
      const { data } = await axios.get(`http://localhost:8080/items/${itemId}`);
      console.log(data);
      setItem(data);
    };
    getItem();
  }, [itemId]);

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
          {item && `Quantity ${item.quantity}`}
        </span>
        <span className="detail-info__price">
          {item && `Price ${item.price}`}
        </span>
        <span className="detail-info__expiry">
          {item && `Best before: ${item.expiry_date}`}
        </span>
        <span className="detail-info__description">
          {item && `Description ${item.description}`}
        </span>
      </div>
    </main>
  );
}
