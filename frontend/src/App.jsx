import React from "react";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextProvider from "./context/DataProvider";
import { useEffect } from "react";
import CategoryPage from "./screens/CategoryPage";
import Home from "./screens/Home";
import ProductPage from "./screens/ProductPage";
import Account from "./screens/Account";
import Cart from "./screens/Cart";
import Banner from "./components/Banner";
import CategorySection from "./components/CategorySection";
import Profile from "./components/Profile";
import OrderHistory from "./components/OrderHistory";
import Orders from "./components/Orders";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";


const App = () => {

  return (
        <ContextProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route index element={<><Banner/><CategorySection/></>}/>
            <Route path="category/:categoryName" element={<CategoryPage/>}/>
            <Route path="product/:productId" element={<ProductPage/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="account" element={<Account/>}>
              <Route index element={<Profile/>}/>
              <Route path="orderHistory" element={<OrderHistory/>} />
              <Route path="orders" element={<Orders/>} />
              <Route path="products" element={<Products/>} />
              <Route path="products/addProduct" element={<AddProduct/>} />
              <Route path="products/:productId" element={<EditProduct/>} />
            </Route>
          </Route>
          <Route path="/login" element={<div className="bg-[#a2b8cd] h-[100vh] min-h-[450px] flex items-center justify-center"><Login/></div>}/>
          <Route path="/signup" element={<div className="bg-[#a2b8cd] h-[100vh] min-h-[640px] flex items-center justify-center"><Signup/></div>}/>
        </Routes>
    </BrowserRouter>
        </ContextProvider>
  );
};

export default App;
