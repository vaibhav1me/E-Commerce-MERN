import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { LoginContext } from "../context/DataProvider";
import { checkCurrentUser, fetchUser } from "../apis/api";
import { NavLink } from "react-router-dom";

const Account = () => {
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      var response = await checkCurrentUser();
      if (!response.data.message) {
        var response2 = await fetchUser(response.data.id);
        setUser(response2.data.user);
      } else {
        navigate("/login");
      }
    };
    checkUserStatus();
  }, []);

  return (
    <div className="flex medium:flex-row flex-col justify-between bg-secondary px-5 py-2">
      <section className="bg-primary medium:w-[20%] rounded-lg p-2 medium:max-h-[22rem] large:h-[15rem] mb-3">
        <div className="bg-secondary rounded-md p-1 flex flex-col mb-5">
          <div className="bg-yellow text-primary text-center large:text-[1.1rem] medium:text-[2.3vw] text-[1rem] mb-2">
            User Dashboard
          </div>
          <button className="mb-2">
            <NavLink to="/account">Profile</NavLink>
          </button>
          <button>
            <NavLink to="/account/orderHistory">Order History</NavLink>
          </button>
        </div>
        {user.role === "seller" && (
          <div className="bg-secondary rounded-md p-1 flex flex-col">
            <div className="bg-yellow text-primary text-center large:text-[1.1rem] medium:text-[2.3vw] text-[1rem] mb-2">
              Seller Dashboard
            </div>
            <button className="mb-2">
              <NavLink to="/account/products">Manage Products</NavLink>
            </button>
            <button>
              <NavLink to="/account/orders">Manage Orders</NavLink>
            </button>
          </div>
        )}
      </section>
      <section className="medium:w-[79%] bg-primary rounded-lg p-2">
        <Outlet />
      </section>
    </div>
  );
};

export default Account;
