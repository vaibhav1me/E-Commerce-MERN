import React from "react";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextProvider from "./context/DataProvider";
import { useEffect } from "react";
import CategoryPage from "./screens/CategoryPage";
import Home from "./screens/Home";
import ProductPage from "./screens/ProductPage";


const App = () => {

  return (
        <ContextProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<div className="bg-[#a2b8cd] h-[100vh] min-h-[450px] flex items-center justify-center"><Login/></div>}/>
          <Route path="/signup" element={<div className="bg-[#a2b8cd] h-[100vh] min-h-[640px] flex items-center justify-center"><Signup/></div>}/>
          <Route path="/category/:categoryName" element={<CategoryPage/>}/>
          <Route path="/product/:productId" element={<ProductPage/>}/>
        </Routes>
    </BrowserRouter>
        </ContextProvider>
  );
};

export default App;
