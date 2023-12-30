import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/DataProvider";
import { fetchProductsBySeller } from "../apis/api";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const Products = () => {
  const { user, setUser } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      let response = await fetchProductsBySeller(user.name);
      setProducts(response.data);
    };
    getProducts();
  }, [user]);

  const editProduct = async () => {};

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/account/products/addProduct");
          }}
          className="block m-auto bg-secondary px-3 py-1 rounded-lg hover:bg-tertiary hover:text-primary"
        >
          Add Product
        </button>
      </div>
      <div>
        {products.length != 0 &&
          products.map((product) => {
            return (
              <div
                key={product._id}
                className="flex medium:flex-row flex-col bg-secondary items-center border-[2px] border-yellow m-2 rounded-md p-2"
              >
                <img
                  src={product.images[0]}
                  alt=""
                  className="medium:h-[10rem] medium:w-[10rem] h-[30vw] w-[30vw] medium:mr-4"
                />
                <div className="medium:max-w-[65%] p-2">
                  <div className="medium:text-[1.1rem] text-[4vw]">
                    {product.title}
                  </div>
                  <div className="medium:text-[.8rem] text-[2.5vw]">
                    <span className="text-yellow">Price: </span>
                    {product.price}
                  </div>
                  <div className="medium:text-[.8rem] text-[2.5vw]">
                    <span className="text-yellow">Details: </span>
                    {product.description}
                  </div>
                  <div className="medium:text-[.8rem] text-[2.5vw]">
                    <span className="text-yellow">Category: </span>
                    {product.category}
                  </div>
                  <div className="medium:text-[.8rem] text-[2.5vw]">
                    <span className="text-yellow">Brand: </span>
                    {product.brand}
                  </div>
                  <div className="medium:text-[.8rem] text-[2.5vw]">
                    <span className="text-yellow">Stock: </span>
                    {product.stock}
                  </div>
                  <button
                    onClick={() => editProduct(product._id)}
                    className="block m-auto bg-primary rounded-md hover:bg-tertiary hover:text-primary"
                  >
                    <NavLink
                      to={`/account/products/${product._id}`}
                      className="block px-3 py-1"
                    >
                      Edit
                    </NavLink>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
