import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/DataProvider";
import { useNavigate } from "react-router";
import {
  addToCart,
  checkCurrentUser,
  createOrder,
  emptyCart,
  fetchCart,
  fetchProduct,
  fetchUser,
  removeFromCart,
} from "../apis/api";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import deleteIcon from "../assets/delete.svg";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [cartValue, setCartValue] = useState(0);

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

  useEffect(() => {
    const getCart = async () => {
      let response = await fetchCart(user._id, localStorage.getItem("jwt"));
      setCart(response.data.sentCart);
      setCartValue(response.data.cartValue);
    };
    getCart();
  }, [user]);

  const addProductToCart = async (productId, token, userId) => {
    let response = await addToCart(productId, token, userId);
    if (response.data.message) {
      navigate("/login");
    } else {
      let responseCart = await fetchCart(user._id, localStorage.getItem("jwt"));
      setCart(responseCart.data.sentCart);
      setCartValue(responseCart.data.cartValue);
    }
  };

  const removeItemFromCart = async (productId, token, userId, removeAll) => {
    let response = await removeFromCart(productId, token, userId, removeAll);
    if (response.data.message) {
      navigate("/login");
    } else {
      let responseCart = await fetchCart(user._id, localStorage.getItem("jwt"));
      setCart(responseCart.data.sentCart);
      setCartValue(responseCart.data.cartValue);
    }
  };

  const placeOrder = async (userId, token, orderItems) => {
    let response = await createOrder(userId, token, orderItems);
    let deletedCart = await emptyCart(userId, token);
    setCart([]);
    setCartValue(0);
  };

  return (
    <>
      {!cart ? (
        <p className="text-center text-yellow text-[2rem] mt-2">
          Loading Cart ....{" "}
        </p>
      ) : (
        <section className="medium:flex bg-secondary justify-around p-2">
          <div className="flex flex-col medium:w-[85%] medium:mr-2">
            {Array.isArray(cart) && cart.length != 0 ? (
              cart.map((cartItem) => {
                return (
                  <div className=" bg-primary items-center p-5 my-1 border-[2px] border-yellow rounded-lg flex small:flex-row flex-col">
                    <img
                      src={cartItem.productImg}
                      alt=""
                      className="h-[10rem] w-[10rem] mr-3 mb-3"
                    />
                    <div className="flex flex-col items-center small:items-start">
                      <div className="text-[1.2rem] mb-2 text-yellow">
                        <NavLink to={`/product/${cartItem.productId}`}>
                          {cartItem.name}
                        </NavLink>
                      </div>
                      <div className="flex items-center w-[5rem] justify-between mb-1">
                        <img
                          src={plus}
                          alt=""
                          className="h-5 w-5 cursor-pointer"
                          onClick={() =>
                            addProductToCart(
                              cartItem.productId,
                              localStorage.getItem("jwt"),
                              user._id
                            )
                          }
                        />
                        <span>{cartItem.quantity}</span>
                        <span>
                          <img
                            src={minus}
                            className="h-5 w-5 cursor-pointer"
                            alt=""
                            onClick={() =>
                              removeItemFromCart(
                                cartItem.productId,
                                localStorage.getItem("jwt"),
                                user._id,
                                false
                              )
                            }
                          />
                        </span>
                      </div>
                      <span>
                        <img
                          src={deleteIcon}
                          alt=""
                          className="h-5 w-5 cursor-pointer"
                          onClick={() =>
                            removeItemFromCart(
                              cartItem.productId,
                              localStorage.getItem("jwt"),
                              user._id,
                              true
                            )
                          }
                        />
                      </span>
                      <span>Rs. {cartItem.price}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-green-500">You have no item in cart</div>
            )}
          </div>
          <div className="bg-primary border-yellow border-[2px] rounded-md medium:w-[14%] min-w-[10rem] text-center p-5">
            <span className="text-yellow block mb-5">
              Total Cart Value: Rs.{cartValue}
            </span>
            <button
              onClick={() =>
                placeOrder(user._id, localStorage.getItem("jwt"), cart)
              }
              className="bg-secondary text-yellow rounded-lg p-2"
            >
              Place Order
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
