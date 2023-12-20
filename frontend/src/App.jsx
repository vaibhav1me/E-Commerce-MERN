import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextProvider from "./context/DataProvider";
import { useEffect } from "react";


const App = () => {

  return (
        <ContextProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="bg-[#a2b8cd]"><Header/>
          <Banner/>
          </div>}/>
          <Route path="/login" element={<div className="bg-[#a2b8cd] h-[100vh] min-h-[450px] flex items-center justify-center"><Login/></div>}/>
          <Route path="/signup" element={<div className="bg-[#a2b8cd] h-[100vh] min-h-[640px] flex items-center justify-center"><Signup/></div>}/>
        </Routes>
    </BrowserRouter>
        </ContextProvider>
  );
};

export default App;
