import axios from "axios";
import { useEffect, useState } from "react";
import ItemInCart from "../../components/ItemInCart/ItemInCart";
import "./ShoppingCartPage.scss";

export default function ShoppingCartPage() {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  const token = sessionStorage.getItem("JWTtoken");
  const getCart = async () => {
    const { data } = await axios.get("http://localhost:8080/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCart(data);
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (!cart) {
      return;
    }
    setTotal(
      cart.reduce(
        (total, item) => (total += item.quantity_required * item.price),
        0
      )
    );
  }, [cart]);

  return (
    <main className="cart">
      <h2 className="cart-title">In Your Cart</h2>
      {!cart && <h3 className="cart-noItemMsg">Nothing is in your cart now</h3>}
      {cart &&
        cart.map((item) => {
          return (
            <ItemInCart
              key={item.item_id}
              item={item}
              getCart={getCart}
              setTotal={setTotal}
            />
          );
        })}
      {cart && (
        <div className="cart-total">
          <span className="cart-total__amount">{`Total: $${total}`}</span>
          <button className="cart-total__btn">Check Out</button>
        </div>
      )}
    </main>
  );
}
