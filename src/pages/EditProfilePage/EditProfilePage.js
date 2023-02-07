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
    const token = sessionStorage.getItem("JWTtoken");

    const autoLogin = async () => {
      const { data } = await axios.get("http://localhost:8080/user/autologin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(data.user);
    };
    autoLogin();

    navigate(`/user/${currentUser.id}`);
  };

  return (
    <main className="editprofile">
      <form onSubmit={submitHandler}>
        <input
          type="file"
          name="avatar"
          accept="images/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <button type="submit">Update</button>
      </form>
    </main>
  );
}
