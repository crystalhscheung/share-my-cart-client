import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./EditProfilePage.scss";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target.avatar.value);

    const formData = new FormData();
    formData.append("avatar", avatar);

    const updateAvatar = async () => {
      await axios.patch(
        `http://localhost:8080/user/edit/${currentUser.id}`,
        formData
      );
    };
    updateAvatar();

    navigate(`/user/${currentUser.id}`);
  };

  return (
    <main className="editprofile">
      <h2 className="editprofile-title">Edit your avatar</h2>
      <form onSubmit={submitHandler} className="editprofile-form">
        <input
          className="editprofile-form__input"
          type="file"
          name="avatar"
          accept="images/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <button className="editprofile-form__btn" type="submit">
          Update
        </button>
      </form>
    </main>
  );
}
