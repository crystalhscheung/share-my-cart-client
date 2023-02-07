import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./UserProfilePage.scss";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [isThatUser, setIsThatUser] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("JWTtoken");
    const getProfile = async () => {
      const { data } = await axios.get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      setIsThatUser(data.isThatUser);
      setUser(data.user);
    };
    getProfile();
  }, [userId]);

  return (
    <main className="profile">
      <div className="profile-data">
        {user && (
          <img
            className="profile-data__avatar"
            alt="avatar"
            src={`http://localhost:8080/avatars/${
              user.avatar ?? "avatar_placeholder.jpeg"
            }`}
          />
        )}
        <h2 className="profile-data__name">{user && user.username}</h2>
        {isThatUser && (
          <Link to={`/user/edit/${user.id}`} className="profile-data__edit">
            Edit Avatar
          </Link>
        )}
        {isThatUser && (
          <Link to="/upload" className="profile-data__upload">
            Upload Item
          </Link>
        )}
      </div>
      {user && (
        <div className="profile-items">
          {user.items_posted &&
            user.items_posted.map((item) => {
              return <ItemCard key={item.id} item={item} />;
            })}
        </div>
      )}
    </main>
  );
}
