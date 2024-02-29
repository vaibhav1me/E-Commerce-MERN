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
import SearchPage from "./components/SearchPage";

const App = () => {

  // Google Analytics employment
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTIC_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', import.meta.env.VITE_GOOGLE_ANALYTIC_ID)
  }, [])

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              index
              element={
                <>
                  <Banner />
                  <CategorySection />
                </>
              }
            />
            <Route path="category/:categoryName" element={<CategoryPage />} />
            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="search/:searchQuery" element={<SearchPage />} />
            <Route path="account" element={<Account />}>
              <Route index element={<Profile />} />
              <Route path="orderHistory" element={<OrderHistory />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="products/addProduct" element={<AddProduct />} />
              <Route path="products/:productId" element={<EditProduct />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;
