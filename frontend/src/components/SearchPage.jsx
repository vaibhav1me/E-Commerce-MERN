import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { findProducts } from "../apis/api";
import { NavLink } from "react-router-dom";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const { searchQuery } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const searchProducts = async () => {
      setProducts([]);
      setMessage(`Finding results for "${searchQuery}"...`);
      let response = await findProducts(searchQuery);
      if (response.data.length == 0) {
        setMessage(`No results for "${searchQuery}"`);
      } else {
        setMessage(`Showing results for "${searchQuery}"`);
      }
      setProducts(response.data);
    };
    searchProducts();
  }, [searchQuery]);

  return (
    <section className="bg-secondary p-2 min-h-[90%]">
      <p className="text-yellow text-center mb-1">{message}</p>
      <div>
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="bg-primary flex medium:flex-row flex-col items-center p-4 rounded-lg m-2"
            >
              <div className="w-[10rem] min-w-[10rem] mb-2">
                <img
                  src={product.images[0]}
                  alt=""
                  className="h-[8rem] w-[8rem] block m-auto"
                />
              </div>
              <div className="flex flex-col justify-center medium:items-start items-center">
                <NavLink
                  to={`/product/${product._id}`}
                  className="text-yellow text-[1.2rem] text-center"
                >
                  {product.title}
                </NavLink>
                <div className="mb-1">
                  <span className="text-yellow">Brand: </span>
                  {product.brand}
                </div>
                <div className="text-[.9rem] text-center mb-1">
                  <span className="text-yellow">Details: </span>
                  {product.description}
                </div>
                <div>Rs. {product.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SearchPage;
