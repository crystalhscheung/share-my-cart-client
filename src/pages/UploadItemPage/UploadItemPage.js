import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";
import { UserContext } from "../../context/UserContext";
import "./UploadItemPage.scss";

export default function UploadItemPage() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const submitHandler = (e, itemInfo, itemImage) => {
    e.preventDefault();

    if (!itemInfo.item_name || !itemInfo.price || !itemInfo.category) {
      return;
    }

    const formData = new FormData();
    formData.append("images", itemImage);
    formData.append("newItem", JSON.stringify(itemInfo));

    const token = sessionStorage.getItem("JWTtoken");

    const uploadItem = async () => {
      const { data } = await axios.post(
        "http://localhost:8080/items/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.newItemId);
    };
    uploadItem();
    navigate(`/user/${currentUser.id}`);
  };

  return (
    <main className="upload">
      <h1 className="upload-title">Upload Item</h1>
      <ItemForm submitHandler={submitHandler} buttonTxt="Upload" />
    </main>
  );
}
