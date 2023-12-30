import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/DataProvider";
import { fetchOrdersBySeller } from "../apis/api";

const Orders = () => {
  const { user, setUser } = useContext(LoginContext);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const getOrders = async () => {
      let response = await fetchOrdersBySeller(
        user.name,
        localStorage.getItem("jwt")
      );
      if (response.data.length === 0) {
        setMessage("Looks like nobody has ordered your items.");
      }
      setOrders(response.data);
      console.log(response);
    };
    getOrders();
  }, [user]);

  return (
    <div>
      {orders.length != 0 ? (
        orders.map((order) => {
          return (
            <div className="flex bg-secondary items-center border-[2px] border-yellow m-2 rounded-md p-2">
              <img
                src={order.productImg}
                alt=""
                className="medium:h-[7rem] medium:w-[7rem] h-[15vw] w-[15vw] mr-4"
              />
              <div>
                <div className="medium:text-[1.1rem] text-[4.5vw]">
                  {order.name}
                </div>
                <div className="medium:text-[.9rem] text-[3vw]">
                  <span className="text-yellow">Price: </span>
                  {order.price}
                </div>
                <div className="medium:text-[.9rem] text-[3vw]">
                  <span className="text-yellow">Ordered On: </span>
                  {order.placedAt}
                </div>
                <div className="medium:text-[.9rem] text-[3vw]">
                  <span className="text-yellow">Quantity: </span>
                  {order.quantity}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-[1.5rem] text-center text-yellow">{message}</div>
      )}
    </div>
  );
};

export default Orders;
