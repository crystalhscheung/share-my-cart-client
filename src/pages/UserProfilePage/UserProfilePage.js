import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./UserProfilePage.scss";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get(`http://localhost:8080/user/${userId}`);
      setUser(data);
    };
    getProfile();
  }, [userId]);

  return (
    <main className="profile">
      <div className="profile-data">
        <img
          className="profile-data__avatar"
          alt="avatar"
          src={`http://localhost:8080/avatars/${
            user ? user.avatar : "avatar_placeholder.jpeg"
          }`}
        />
        <h2 className="profile-data__name">{user && user.username}</h2>
      </div>
      <div className="profile-items">
        {user &&
          JSON.parse(user.items_posted).map((item) => {
            return <ItemCard key={item.id} item={item} />;
          })}
      </div>
    </main>
  );
}
