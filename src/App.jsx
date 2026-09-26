import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Products from "./Pages/Products.jsx";
import Cart from "./Pages/Cart.jsx";
import Categories from "./Pages/Categories.jsx"
import Wishlist from "./Pages/Wishlist.jsx"
import Navbar from "./components/Navbar.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import AdminDashBoard from "./Pages/AdminDashBoard.jsx";
import Register from "./Pages/Register.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Login from "./Pages/Login.jsx";
import Orders from "./Pages/Orders.jsx";
import Checkout from "./Pages/CheckOut.jsx";
import OrderSuccess from "./Pages/OrderSucess.jsx";
import AddProduct from "./Pages/AddProduct.jsx";
import ManageProducts from "./Pages/ManageProducts.jsx";
import AddCategory from "./Pages/AddCategory.jsx";
import ManageCategories from "./Pages/ManageCategories.jsx";
import ManageOrders from "./Pages/ManageOrders.jsx";
import ManageUsers from "./Pages/ManageUsers.jsx";

function App() {
  return (
    <>
     <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/> 
        <Route path="/category" element={<Categories/>}/>
        <Route path="/userprofile" element={<UserProfile/>}/>
        <Route path="/adminDashboard" element={<AdminDashBoard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/productDetail" element={<ProductDetail/>}/>
        <Route path="/order" element={<Orders/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/ordersucess" element={<OrderSuccess/>}/>
        <Route path="/admin/add-product" element={<AddProduct/>}/>
        <Route path="/admin/products" element={<ManageProducts/>}/>
        <Route path="/admin/add-category" element={<AddCategory/>}/>
        <Route path="/admin/categories" element={<ManageCategories/>}/>
        <Route path="/admin/orders" element={<ManageOrders/>}/>
        <Route path="/admin/users" element={<ManageUsers/>}/>
      </Routes>
    </BrowserRouter> 
    </>
    
  )
}
export default App