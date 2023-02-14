import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./EditProfilePage.scss";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("");
  const url = process.env.BASE_API_URL;

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setBio(currentUser.bio);
  }, [currentUser]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("bio", bio);

    const updateProfile = async () => {
      try {
        const token = sessionStorage.getItem("JWTtoken");
        await axios.patch(`${url}/user/edit/${currentUser.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser();
      } catch (error) {
        console.log(error);
      }
    };
    updateProfile();

    navigate(`/user/${currentUser.id}`);
  };

  return (
    <main className="editprofile">
      <h2 className="editprofile-title">Edit your profile</h2>
      <form onSubmit={submitHandler} className="editprofile-form">
        <label className="editprofile-form__label">
          Avatar
          <input
            className="editprofile-form__input"
            type="file"
            name="avatar"
            accept="images/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </label>
        <label className="editprofile-form__label">
          Bio
          <textarea
            className="editprofile-form__input editprofile-form__input--bio"
            name="bio"
            value={bio ?? ""}
            onChange={(e) => setBio(e.target.value)}></textarea>
        </label>
        <button className="editprofile-form__btn" type="submit">
          Update
        </button>
      </form>
    </main>
  );
}
