import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/DataProvider";
import { fetchOrders } from "../apis/api";

const OrderHistory = () => {
  const { user, setUser } = useContext(LoginContext);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("Loading your orders...");

  useEffect(() => {
    const getOrders = async () => {
      let response = await fetchOrders(user._id, localStorage.getItem("jwt"));
      setOrders(response.data);
      if (response.data.length === 0) {
        setMessage(
          "Seems you have not order anything. What are you waiting for? Add items to cart and place order now!!"
        );
      }
    };
    getOrders();
  }, [user]);

  return (
    <section>
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
                <div className="medium:text-[.9rem] text-[3vw]">
                  <span className="text-yellow">Seller: </span>
                  {order.seller}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-yellow text-center">{message}</div>
      )}
    </section>
  );
};

export default OrderHistory;
