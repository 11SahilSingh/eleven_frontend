import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StoreProvider from "./context/StoreProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./Pages/Home.jsx";
import Products from "./Pages/Products.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Categories from "./Pages/Categories.jsx";
import Cart from "./Pages/Cart.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import Orders from "./Pages/Orders.jsx";
import Checkout from "./Pages/Checkout.jsx";
import OrderSuccess from "./Pages/OrderSucess.jsx";
import AdminDashBoard from "./Pages/AdminDashBoard.jsx";
import AddProduct from "./Pages/AddProduct.jsx";
import ManageProducts from "./Pages/ManageProducts.jsx";
import AddCategory from "./Pages/AddCategory.jsx";
import ManageCategories from "./Pages/ManageCategories.jsx";
import ManageOrders from "./Pages/ManageOrders.jsx";
import ManageUsers from "./Pages/ManageUsers.jsx";
import NotFound from "./Pages/NotFound.jsx";

const user = (element) => <ProtectedRoute>{element}</ProtectedRoute>;
const admin = (element) => <ProtectedRoute adminOnly>{element}</ProtectedRoute>;

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            {/* Shop */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Account */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userprofile" element={user(<UserProfile />)} />
            <Route path="/orders" element={user(<Orders />)} />
            <Route path="/checkout" element={user(<Checkout />)} />
            <Route path="/order-success" element={user(<OrderSuccess />)} />

            {/* Admin */}
            <Route path="/adminDashboard" element={admin(<AdminDashBoard />)} />
            <Route path="/admin/add-product" element={admin(<AddProduct />)} />
            <Route path="/admin/edit-product/:id" element={admin(<AddProduct />)} />
            <Route path="/admin/products" element={admin(<ManageProducts />)} />
            <Route path="/admin/add-category" element={admin(<AddCategory />)} />
            <Route path="/admin/edit-category/:id" element={admin(<AddCategory />)} />
            <Route path="/admin/categories" element={admin(<ManageCategories />)} />
            <Route path="/admin/orders" element={admin(<ManageOrders />)} />
            <Route path="/admin/users" element={admin(<ManageUsers />)} />

            {/* Old paths kept working */}
            <Route path="/categories" element={<Navigate to="/category" replace />} />
            <Route path="/productDetail" element={<Navigate to="/products" replace />} />
            <Route path="/order" element={<Navigate to="/orders" replace />} />
            <Route path="/ordersucess" element={<Navigate to="/orders" replace />} />
            <Route path="/admin" element={<Navigate to="/adminDashboard" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
