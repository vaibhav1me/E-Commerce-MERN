import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/DataProvider'
import { fetchOrders } from '../apis/api'

const OrderHistory = () => {
  const {user, setUser} = useContext(LoginContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders =async () => {
      let response = await fetchOrders(user._id, localStorage.getItem("jwt"))
      setOrders(response.data)
      console.log(response)
    }
    getOrders()
  }, [user])

  return (
    <div>
      {
        orders.length != 0 ? 
        orders.map((order) => {
          return (
            <div>
              <img src={order.productImg} alt="" className='h-[5rem] w-[5rem]'/>
              <span>{order.price}</span>
              <span>{order.placedAt}</span>
              <span>{order.name}</span>
              <span>{order.quantity}</span>
              <span>{order.seller}</span>
            </div>
          )
        })
        : <div>loading</div>
      }
    </div>
  )
}

export default OrderHistory