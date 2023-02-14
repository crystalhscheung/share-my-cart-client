import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import { UserContext } from "../../context/UserContext";
import "./UserProfilePage.scss";

export default function UserProfilePage() {
  const [viewUser, setViewUser] = useState(null);
  const [isThatUser, setIsThatUser] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { userId } = useParams();
  const { currentUser } = useContext(UserContext);
  const url = process.env.REACT_APP_API;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = sessionStorage.getItem("JWTtoken");
        const { data } = await axios.get(`${url}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsThatUser(data.isThatUser);
        setViewUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [userId, currentUser, url]);

  useEffect(() => {
    if (!viewUser) {
      return;
    }
    if (!viewUser.avatar) {
      setAvatar(`${url}/avatars/avatar_placeholder.jpeg`);
    } else if (viewUser.avatar.slice(0, 5) === "https") {
      setAvatar(viewUser.avatar);
    } else if (viewUser.avatar) {
      setAvatar(`${url}/avatars/${viewUser.avatar}`);
    }
  }, [viewUser, url]);

  return (
    <main className="profile">
      <div className="profile-data">
        {avatar && (
          <img className="profile-data__avatar" alt="avatar" src={avatar} />
        )}
        <h2 className="profile-data__name">{viewUser && viewUser.username}</h2>
        {isThatUser && (
          <Link to={`/user/edit/${viewUser.id}`} className="profile-data__edit">
            Edit Profile
          </Link>
        )}
        {isThatUser && (
          <Link to="/upload" className="profile-data__upload">
            Upload Item
          </Link>
        )}
        {viewUser && (
          <p className="profile-data__bio">{`Bio: ${viewUser.bio}`}</p>
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
