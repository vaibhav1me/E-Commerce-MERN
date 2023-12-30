import { useNavigate, useParams } from "react-router";
import {
  addToCart,
  checkCurrentUser,
  fetchProduct,
  fetchUser,
} from "../apis/api";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/DataProvider";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [message, setMessage] = useState("");

  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserStatus = async () => {
      var response = await checkCurrentUser();
      if (!response.data.message) {
        var response2 = await fetchUser(response.data.id);
        setUser(response2.data.user);
      }
    };
    checkUserStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchProduct(productId);
      setProduct(response.data);
      setDisplayImage(response.data.images[0]);
    };
    fetchData();
  }, []);

  const addProductToCart = async () => {
    let response = await addToCart(
      product._id,
      localStorage.getItem("jwt"),
      user._id
    );
    if (response.data.message) {
      navigate("/login");
    } else {
      setMessage("Product added to cart successfully");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      console.log(response.data);
    }
  };

  return (
    <section className="min-h-[40vw] flex justify-center items-center bg-tertiary border-[2px]">
      {product === "" ? (
        <h1 className="text-center text-yellow">Loading Product...</h1>
      ) : (
        <div className="w-[95%] flex flex-col medium:flex-row min-h-[25rem] items-center justify-between medium:p-8 p-3 rounded-lg bg-primary">
          <div className="medium:min-w-[18rem] medium:mr-5 flex flex-col medium:flex-row items-center">
            <div className="flex medium:flex-col mr-1">
              {product.images.map((image) => {
                return (
                  <img
                    src={image}
                    alt=""
                    className="medium:h-[4rem] medium:w-[4rem] w-[17vw] h-[17vw] cursor-pointer my-[1px] border-[3px] border-yellow"
                    onClick={() => setDisplayImage(image)}
                  />
                );
              })}
            </div>
            <div>
              <img
                src={displayImage}
                alt="ProductImage"
                className="medium:h-[15rem] medium:w-[15rem] w-[50vw] h-[50vw] border-[5px] border-tertiary"
              />
            </div>
          </div>
          <div className="large:pr-[15vw] medium:pr-[1rem]">
            <ul className="flex flex-col">
              <li className="text-yellow text-[1.5rem]">{product.title}</li>
              <li className="text-[.8rem]">{product.description}</li>
              <li className="text-[.9rem]">Rs. {product.price}</li>
              <li className="text-[.9rem]">
                <span className="text-yellow">Brand:</span> {product.brand}
              </li>
              <li className="text-[.8rem]">
                <span className="text-yellow">Seller:</span> {product.seller}
              </li>
              {product.stock <= 20 ? (
                <li className="text-[red]">
                  Hurry up! Only {product.stock} left.
                </li>
              ) : (
                <></>
              )}
            </ul>
            <button
              onClick={addProductToCart}
              className="bg-yellow m-auto block mt-2 text-primary px-2 py-1 rounded-md"
            >
              Add to Cart
            </button>
            <h1>{message}</h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductPage;
