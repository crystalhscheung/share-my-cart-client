import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";
import { UserContext } from "../../context/UserContext";
import "./UploadItemPage.scss";

export default function UploadItemPage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const submitHandler = (e, itemInfo, itemImage) => {
    e.preventDefault();

    if (
      !itemInfo.item_name ||
      !itemInfo.price ||
      !itemInfo.category ||
      !itemInfo.quantity
    ) {
      setErrMsg("Please fill in all the required fields");
      return;
    }

    const formData = new FormData();
    formData.append("images", itemImage);
    formData.append("newItem", JSON.stringify(itemInfo));

    const uploadItem = async () => {
      try {
        const token = sessionStorage.getItem("JWTtoken");
        await axios.post(`${url}/items/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser();
        navigate(`/user/${currentUser.id}`);
      } catch (error) {
        console.log(error);
      }
    };
    uploadItem();
  };

  return (
    <main className="upload">
      <h1 className="upload-title">Upload Item</h1>
      {errMsg && <span className="signup-form__err">{errMsg}</span>}
      <ItemForm submitHandler={submitHandler} buttonTxt="Upload" />
    </main>
  );
}
