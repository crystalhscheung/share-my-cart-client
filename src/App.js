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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:itemId" element={<ItemDetail />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload" element={<UploadItemPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
