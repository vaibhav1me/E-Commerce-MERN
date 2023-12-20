import React, { useContext } from "react";
import searchIcon from "../assets/Header/search.svg";
import cart from "../assets/Header/cart.svg"
import { Link } from "react-router-dom";
import {LoginContext} from "../context/DataProvider";



const Header = () => {

  const { user , setUser} = useContext(LoginContext)

  return (
    <nav className="bg-[#162e44] px-[2rem] py-[.8rem]">
      <div id="brand" className="flex justify-between items-center p-2">
        <div id="logo" className="text-[white] text-[2rem]">
          ShopAseZ
        </div>
        <div id="nav-right" className="flex items-center">
            {
              user ? <div ><li id="header-profile" className="text-[1.2rem] mr-[2rem] px-[.2rem] cursor-pointer">
              Hi! {user.name}
              </li> 
              <div id="logout" className="display-none" onClick={() => {setAccount('')}}>
                Logout
              </div></div>
            : 
            <div className="text-[1.2rem] mr-[2rem] px-[.2rem] cursor-pointer">
                <Link to='/login'>Login</Link>
            </div>
            }

          
          <input
            type="text"
            placeholder="Search an Item"
            className="mr-2 outline-none py-[.3rem] px-[.8rem] text-[#162e44]"
          />
          <div
            className="bg-white flex items-center justify-center p-[.3rem] cursor-pointer"
            id="searchIcon"
          >
            <img className="h-6 w-6 " src={searchIcon} alt="" />
          </div>
        </div>
      </div>
      { 
      user ? <div id="user-nav" className="flex justify-between items-center mt-[1rem]">
        <div className="user-profile">

        </div>
        <div id="cart-orders" className="cursor-pointer">
            <span>{user.cart.length}</span>
            <img src={cart} alt="" className="h-6 w-6"/>
        </div>
        <div>
          My Orders
        </div>
      </div> : <></>
      }
      
    </nav>
  );
};

export default Header;
