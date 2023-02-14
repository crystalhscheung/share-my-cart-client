import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";
import "./EditItemPage.scss";

export default function EditItemPage() {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState(null);
  const { itemId } = useParams();
  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/items/${itemId}`
        );
        setCurrentItem(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [itemId]);

  const editItemHandler = (e, itemInfo, itemImage) => {
    e.preventDefault();
    const token = sessionStorage.getItem("JWTtoken");
    const formData = new FormData();
    formData.append("updatedItem", JSON.stringify(itemInfo));
    if (itemImage) {
      formData.append("images", itemImage);
    }
    const updateItem = async () => {
      try {
        await axios.patch(
          `http://localhost:8080/items/edit/${itemInfo.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Successfully updated item");
        navigate(`/user/${currentItem.user_id}`);
      } catch (error) {
        console.log(error);
      }
    };
    updateItem();
  };
  return (
    <main className="editItem">
      <h2 className="editItem-title">Edit Item Details</h2>
      <ItemForm
        submitHandler={editItemHandler}
        currentItem={currentItem}
        buttonTxt="Save"
      />
    </main>
  );
}
