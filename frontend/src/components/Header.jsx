import React, { useContext, useState } from "react";
import searchIcon from "../assets/search.svg";
import cart from "../assets/cart.svg"
import { NavLink, useNavigate } from "react-router-dom";
import close from '../assets/close.svg'
import menu from '../assets/menu.svg'
import {LoginContext} from "../context/DataProvider";


const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { user , setUser} = useContext(LoginContext)
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const logoutUser = () => {
    localStorage.clear()
    // Cookies.remove('jwt')
    setUser('')
    navigate('/')
  }

  return (
    <nav className="bg-primary p-[1rem]">
      <div className="large-menu hidden medium:block">
      <div className="flex justify-between items-center">
        <div id="logo" className="text-yellow text-[2rem] underline underline-offset-4">
          <NavLink to='/'>ShopAseZ</NavLink>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Search an Item"
            className="mr-2 outline-none py-[.3rem] px-[.8rem] text-yellow bg-secondary w-[35vw]"
           value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}/>
          <div
            className="bg-yellow-300 flex items-center justify-center p-[.3rem] hover:bg-secondary cursor-pointer rounded-md"
            id="searchIcon" onClick={() => {navigate(`/search/${searchQuery}`)}}
          >
            <img className="h-6 w-6" src={searchIcon} alt="" />
          </div>
        </div>
        <div id="" className="flex items-center">
            {
              user ? <div className=""><span className="text-[1.2rem] px-[.2rem] text-yellow">
              Hi! {user.name}
              </span> 
              </div>
            : 
            <button className="text-[1.2rem] text-yellow bg-secondary px-[1rem] py-[.2rem] rounded-md cursor-pointer">
                <NavLink to='/login'>Login</NavLink>
            </button>
            }
        </div>
      </div>
      { 
      user ? <div className="flex justify-between items-center mt-[.5rem] pt-[1rem] text-yellow">
        <div className="flex text-yellow">
        <NavLink to='/cart' id="cart" className="cursor-pointer text-center relative mx-2">
            <span className="text-yellow font-bold bg-secondary rounded-full w-[1.5rem] inline-block absolute -top-[.8rem] -right-[.5rem]">{user.cart.length}</span>
            <img src={cart} alt="" className="h-6 w-6"/>
        </NavLink>
        <NavLink  to="/account" className="mx-2">
                My Account
              </NavLink>
        </div>
          <button id="logout" className="cursor-pointer hover:bg-secondary px-3 py-1 rounded-md" onClick={logoutUser}>
                Logout
              </button>
              
      </div> : <></>
      }
      </div>


      <div className="mobile-menu relative block medium:hidden">
        <div className="flex justify-between items-center">
            <div id="logo" className="text-yellow text-[1.3rem] underline underline-offset-4">
          <NavLink to='/'>ShopAseZ</NavLink>
        </div>
        {
          user ? <div onClick={() => setToggle(!toggle)}>
          <img src={toggle ? close : menu} alt="" />
        </div>  :  <div><NavLink to='/login' className='text-yellow'><button>Login</button></NavLink></div>
        }
        
        </div>
        <div className="flex mt-4 items-center justify-center">
          <input
            type="text"
            placeholder="Search an Item"
            className="mr-2 outline-none py-[.3rem] px-[.8rem] text-yellow bg-secondary w-[70vw]"
           value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}/>
          <div
            className="bg-yellow-300 flex items-center justify-center p-[.3rem] cursor-pointer rounded-md hover:bg-secondary"
            id="searchIcon" onClick={() => {navigate(`/search/${searchQuery}`)}}
          >
            <img className="h-6 w-6" src={searchIcon} alt="" />
          </div>
        </div>
        <div className={`${toggle ? 'block' : 'hidden'} text-yellow bg-primary absolute top-[6rem] -right-[1rem] w-[10rem] p-3 rounded-lg border-yellow border-[2px] flex flex-col z-10 items-center justify-center`}>
          <NavLink to='/account' className='my-1' onClick={() => setToggle(false)}>My Account</NavLink>
          <NavLink to='/cart' className='my-1' onClick={() => setToggle(false)}>My Cart</NavLink>
          <button id="logout" className="hover:underline my-1" onClick={() => {logoutUser();setToggle(false)}}>
                Logout
              </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
