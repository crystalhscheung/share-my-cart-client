import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import UploadItemPage from "./pages/UploadItemPage/UploadItemPage";
import HomePage from "./pages/HomePage/HomePage.js";
import "./styles/partials/_resets.scss";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import ItemsPage from "./pages/ItemsPage/ItemsPage";
import ItemDetail from "./pages/ItemDetailPage/ItemDetail";
import { UserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(
    !!sessionStorage.getItem("JWTtoken")
  );
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!isLoggedin) {
      return;
    }
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
  }, [isLoggedin]);

  // console.log(isLoggedin && currentUser.username);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          isLoggedin: isLoggedin,
          setIsLoggedin: setIsLoggedin,
          currentUser: currentUser,
          setCurrentUser: setCurrentUser,
        }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/:itemId" element={<ItemDetail />} />
            <Route path="/items/edit/:itemId" element={<EditItemPage />} />
            <Route path="/user/:userId" element={<UserProfilePage />} />
            <Route path="/user/edit/:userId" element={<EditProfilePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/upload" element={<UploadItemPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
