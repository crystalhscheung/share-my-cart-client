import "./UploadItemPage.scss";

export default function UploadItemPage() {
  return (
    <>
      <h1>Upload an item to share</h1>
      <form>
        <div className="form-data">
          <label className="form__label">
            Item image
            <input
              className="form__input"
              type="file"
              name="item-image"
              accept="images/*"
              onChange={""}
            />
          </label>
          <label className="form__label">
            Item name
            <input
              className="form__input"
              type="text"
              name="item-name"
              onChange={""}
            />
          </label>
          <label className="form__label">
            Description
            <textarea
              className="form__input"
              name="item-description"
              onChange={""}
            />
          </label>
          <label className="form__label">
            Quantity
            <input
              className="form__input"
              type="number"
              name="item-quantity"
              onChange={""}
            />
          </label>
          <label className="form__label">
            Price
            <input
              className="form__input"
              type="number"
              name="price"
              onChange={""}
            />
          </label>
          <label className="form__label">
            Expiry Date
            <input
              className="form__input"
              type="date"
              name="item-expiry-date"
              onChange={""}
            />
          </label>
          <label className="form__label">
            Location
            <input
              className="form__input"
              type="text"
              name="item-location"
              onChange={""}
            />
          </label>
        </div>
        <div className="form-btns">
          <button>Cancel</button>
          <button type="submit">Upload</button>
        </div>
      </form>
    </>
  );
}
