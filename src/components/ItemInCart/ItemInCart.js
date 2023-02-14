import axios from "axios";
import { useEffect, useState } from "react";
import "./ItemInCart.scss";

export default function ItemInCart({ item, getCart }) {
  const [quantityRequired, setQuantityRequired] = useState(
    item.quantity_required
  );
  const [itemTotal, setItemTotal] = useState(quantityRequired * item.price);
  const url = process.env.REACT_APP_API;

  useEffect(() => {
    const changeItemQuantity = async () => {
      try {
        const token = sessionStorage.getItem("JWTtoken");
        await axios.put(
          `${url}/cart/${item.item_id}`,
          { new_quantity_required: quantityRequired },
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
    changeItemQuantity();
    setItemTotal(quantityRequired * item.price);
    getCart();
  }, [quantityRequired, item]);

  const removeFromCartHandler = () => {
    const removeItemFromCart = async () => {
      try {
        const token = sessionStorage.getItem("JWTtoken");
        await axios.delete(`${url}/cart/${item.item_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    removeItemFromCart();
    getCart();
  };

  return (
    <div className="itemCart">
      <div className="itemCart-data">
        <div className="itemCart-imgs">
          <img
            className="itemCart-img"
            alt={item.name}
            src={`${url}/images/${item.images}`}
          />
        </div>
        <div className="itemCart-info">
          <h3 className="itemCart-info__name">{item.item_name}</h3>
          <span className="itemCart-info__price">{`$${item.price}`}</span>
        </div>
      </div>
      <div className="itemCart-amount">
        <div className="itemCart-quantity">
          <div className="itemCart-quantity-bar">
            <button
              onClick={() => {
                if (quantityRequired > 1) {
                  setQuantityRequired((num) => num - 1);
                }
              }}
              className="itemCart-quantity-bar__btn itemCart-quantity-bar__btn--minus">
              -
            </button>
            <input
              className=" itemCart-quantity-bar__field"
              type="number"
              value={quantityRequired}
              readOnly
            />
            <button
              onClick={() => {
                if (quantityRequired < item.quantity) {
                  setQuantityRequired((num) => num + 1);
                }
              }}
              className="itemCart-quantity-bar__btn itemCart-quantity-bar__btn--plus">
              +
            </button>
          </div>
          <span className="itemCart-quantity__max">{`/${item.quantity}`}</span>
        </div>
        <div className="itemCart-total">
          <button className="itemCart-remove" onClick={removeFromCartHandler}>
            X
          </button>
          <span className="itemCart-total__sum">{`$${itemTotal}`}</span>
        </div>
      </div>
    </div>
  );
}
