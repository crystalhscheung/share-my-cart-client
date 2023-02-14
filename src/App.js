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
import { UserContextProvider } from "./context/UserContext";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import CompletePaymentPage from "./pages/CompletePaymentPage/CompletePayment";

function App() {
  document.title = "Share my cart";
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/:itemId" element={<ItemDetail />} />
            <Route path="/items/edit/:itemId" element={<EditItemPage />} />
            <Route path="/user/:userId" element={<UserProfilePage />} />
            <Route path="/user/cart" element={<ShoppingCartPage />} />
            <Route path="/user/edit/:userId" element={<EditProfilePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/upload" element={<UploadItemPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/completion" element={<CompletePaymentPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
