import { useEffect, useState } from "react";
import "./ItemForm.scss";

export default function ItemForm({ submitHandler, currentItem, buttonTxt }) {
  const initialValue = {
    item_name: "",
    description: "",
    category: "",
    quantity: 1,
    price: 0,
    expiry_date: null,
    images: "",
  };
  const [itemInfo, setItemInfo] = useState(initialValue);
  const [itemImage, setItemImage] = useState(null);

  useEffect(() => {
    setItemInfo(currentItem ?? initialValue);
  }, [currentItem]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setItemInfo({
      ...itemInfo,
      [name]: value,
    });
  };
  return (
    <form
      className="form"
      onSubmit={(e) => submitHandler(e, itemInfo, itemImage)}>
      <div className="form-data">
        <label className="form__label">
          Item image
          <input
            className="form__input"
            type="file"
            name="images"
            accept="images/*"
            onChange={(e) => setItemImage(e.target.files[0])}
          />
        </label>
        <label className="form__label">
          Item name*
          <input
            className="form__input"
            type="text"
            name="item_name"
            value={itemInfo.item_name}
            onChange={changeHandler}
          />
        </label>
        <label className="form__label">
          Description
          <textarea
            className="form__input"
            name="description"
            value={itemInfo.description}
            onChange={changeHandler}
          />
        </label>
        <label className="form__label">
          Category*
          <input
            className="form__input"
            type="text"
            name="category"
            value={itemInfo.category}
            onChange={changeHandler}
          />
        </label>
        <label className="form__label">
          Quantity*
          <input
            className="form__input"
            type="number"
            name="quantity"
            value={itemInfo.quantity}
            onChange={changeHandler}
          />
        </label>
        <label className="form__label">
          Price*
          <input
            className="form__input"
            type="number"
            name="price"
            value={itemInfo.price}
            onChange={changeHandler}
          />
        </label>
        <label className="form__label">
          Expiry Date
          <input
            className="form__input"
            type="date"
            name="expiry_date"
            onChange={changeHandler}
          />
        </label>
      </div>
      <div className="form-btns">
        <button className="form-btn form-btn__cancel">Cancel</button>
        <button className="form-btn form-btn__save" type="submit">
          {buttonTxt}
        </button>
      </div>
    </form>
  );
}
