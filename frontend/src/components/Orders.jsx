import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/DataProvider';
import { fetchOrdersBySeller } from '../apis/api';


const Orders = () => {
  const { user, setUser } = useContext(LoginContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      let response = await fetchOrdersBySeller(user.name, localStorage.getItem("jwt"));
      setOrders(response.data);
      console.log(response);
    };
    getOrders();
    // console.log(user)
  }, [user]);

  return (
    <div>
      {orders.length != 0 ? (
        orders.map((order) => {
          return (
            <div>
              <img
                src={order.productImg}
                alt=""
                className="h-[5rem] w-[5rem]"
              />
              <span>{order.price}</span>
              <span>{order.placedAt}</span>
              <span>{order.name}</span>
              <span>{order.quantity}</span>
              <span>{order.seller}</span>
            </div>
          );
        })
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Orders