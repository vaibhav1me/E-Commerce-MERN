import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/DataProvider';
import { useNavigate } from 'react-router';
import { addToCart, checkCurrentUser, createOrder, emptyCart, fetchCart, fetchProduct, fetchUser, removeFromCart } from '../apis/api';
import Header from '../components/Header';
import plus from '../assets/plus.svg'
import minus from '../assets/minus.png'
import deleteIcon from '../assets/delete.svg'



const Cart = () => {
    const { user, setUser } = useContext(LoginContext);
    const navigate = useNavigate();
    const [cart, setCart] = useState([])
    const[cartValue, setCartValue] = useState(0)

    useEffect(() => {
      const checkUserStatus = async () => {
        var response = await checkCurrentUser();
        if (!response.data.message) {
          var response2 = await fetchUser(response.data.id);
          // console.log(response);
          // console.log(response2.data.user);
          setUser(response2.data.user);
        } else {
          navigate("/login");
        }
      };
      checkUserStatus();
    }, []);

    useEffect (() => {
      const getCart = async () => {
        // console.log(localStorage.getItem('jwt'))
        let response = await fetchCart(user._id, localStorage.getItem("jwt"))
        console.log(response.data)
        setCart(response.data.sentCart)
        setCartValue(response.data.cartValue)
      }
      getCart()
    }, [user])

     const addProductToCart = async (productId, token, userId) => {
    let response = await addToCart(productId, token, userId);
    if (response.data.message) {
      navigate('/login')
    }
    else {
      // console.log(response.data)
      let responseCart = await fetchCart(user._id, localStorage.getItem("jwt"));
      setCart(responseCart.data.sentCart);
      setCartValue(responseCart.data.cartValue);
    }
  }

    const removeItemFromCart = async (productId, token, userId, removeAll) => {
      let response = await removeFromCart(productId, token, userId, removeAll)
      console.log(response)
      if (response.data.message) {
      navigate('/login')
    }
    else {
      // console.log(response.data)
      let responseCart = await fetchCart(user._id, localStorage.getItem("jwt"));
      setCart(responseCart.data.sentCart);
        setCartValue(responseCart.data.cartValue);
    }
    }

    const placeOrder = async (userId, token, orderItems) => {
      let response = await createOrder(userId, token, orderItems);
      console.log(response)
      let deletedCart = await emptyCart(userId, token);
      console.log(deletedCart)
      setCart([])
    }


  return (
    <div>
      <div>
        <Header />
      </div>
      <section>
        <div className="flex">
          {Array.isArray(cart) &&
            cart.length != 0 ?
            cart.map((cartItem) => {
              // let product = (await fetchProduct(cartItem.productId)).data
              console.log(cartItem);
              return (
                <div className=" bg-green-600 m-2">
                  <img
                    src={cartItem.productImg}
                    alt=""
                    className="h-[10rem] w-[10rem]"
                  />
                  <div>{cartItem.name}</div>
                  <div className="flex items-center">
                    <span>
                      <img
                        src={plus}
                        alt=""
                        onClick={() =>
                          addProductToCart(
                            cartItem.productId,
                            localStorage.getItem("jwt"),
                            user._id
                          )
                        }
                      />
                    </span>
                    <span>{cartItem.quantity}</span>
                    <span>
                      <img src={minus} alt="" onClick={() => removeItemFromCart(cartItem.productId, localStorage.getItem('jwt'),user._id, false)} />
                    </span>
                    <span>
                      <img
                        src={deleteIcon}
                        alt=""
                        onClick={() => removeItemFromCart(cartItem.productId, localStorage.getItem('jwt'),user._id, true)}
                      />
                    </span>
                  </div>
                  <span>Rs. {cartItem.price}</span>
                </div>
              );
            }) : <div className='bg-green-500'>You have no item in cart</div>}
        </div>
        <div className="bg-green-500">
        <div>TotalcartValue: {cartValue}</div>
        <button onClick={() => placeOrder(user._id, localStorage.getItem('jwt'), cart)}>Place Order</button>
        </div>
      </section>
    </div>
  );
}

export default Cart