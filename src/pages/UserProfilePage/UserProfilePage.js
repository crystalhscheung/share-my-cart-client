import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./UserProfilePage.scss";

export default function UserProfilePage() {
  const [viewUser, setViewUser] = useState(null);
  const [isThatUser, setIsThatUser] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("JWTtoken");
    const getProfile = async () => {
      const { data } = await axios.get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsThatUser(data.isThatUser);
      setViewUser(data.user);
    };
    getProfile();
  }, [userId]);

  useEffect(() => {
    if (!viewUser) {
      return;
    }
    if (!viewUser.avatar) {
      setAvatar("http://localhost:8080/avatars/avatar_placeholder.jpeg");
    } else if (viewUser.avatar.slice(0, 5) === "https") {
      setAvatar(viewUser.avatar);
    } else if (viewUser.avatar) {
      setAvatar(`http://localhost:8080/avatars/${viewUser.avatar}`);
    }
  }, [viewUser]);

  return (
    <main className="profile">
      <div className="profile-data">
        {avatar && (
          <img className="profile-data__avatar" alt="avatar" src={avatar} />
        )}
        <h2 className="profile-data__name">{viewUser && viewUser.username}</h2>
        {isThatUser && (
          <Link to={`/user/edit/${viewUser.id}`} className="profile-data__edit">
            Edit Avatar
          </Link>
        )}
        {isThatUser && (
          <Link to="/upload" className="profile-data__upload">
            Upload Item
          </Link>
        )}
      </div>
      {viewUser && (
        <div className="profile-items">
          {viewUser.items_posted &&
            viewUser.items_posted.map((item) => {
              return <ItemCard key={item.id} item={item} />;
            })}
        </div>
      )}
    </main>
  );
}
