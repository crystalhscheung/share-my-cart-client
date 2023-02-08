import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ItemInCart.scss";

export default function ItemInCart({ item, getCart, setTotal }) {
  const [quantityRequired, setQuantityRequired] = useState(
    item.quantity_required
  );
  const [itemTotal, setItemTotal] = useState(quantityRequired * item.price);

  //   useEffect(() => {
  //     let newItemTotal = quantityRequired * item.price;

  //     setTotal((sum) => {
  //       sum = sum - itemTotal + newItemTotal;
  //       return sum;
  //     });

  //     setItemTotal(newItemTotal);
  //     // setTotal(sum => sum+=itemTotal)
  //   }, [quantityRequired]);

  useEffect(() => {
    const changeItemQuantity = async () => {
      const token = sessionStorage.getItem("JWTtoken");

      const { data } = await axios.put(
        `http://localhost:8080/cart/${item.item_id}`,
        { new_quantity_required: quantityRequired },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    };
    changeItemQuantity();
    setItemTotal(quantityRequired * item.price);
    getCart();
  }, [quantityRequired]);

  const removeFromCartHandler = () => {
    const removeItemFromCart = async () => {
      const token = sessionStorage.getItem("JWTtoken");

      const { data } = await axios.delete(
        `http://localhost:8080/cart/${item.item_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    };
    removeItemFromCart();
    getCart();
  };

  return (
    <div className="itemCart">
      <div className="itemCart-imgs">
        <img
          className="itemCart-img"
          src={`http://localhost:8080/images/${item.images}`}
        />
      </div>
      <div className="itemCart-info">
        <h3 className="itemCart-info__name">{item.item_name}</h3>
        <span className="itemCart-info__price">{`$${item.price}`}</span>
      </div>
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
  );
}
