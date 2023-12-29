import {  useNavigate, useParams } from "react-router";
import { addToCart, checkCurrentUser, fetchProduct, fetchUser } from "../apis/api";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/DataProvider";


const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState("");
  const [displayImage, setDisplayImage] = useState("")
  const [message, setMessage] = useState("")

  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate()
  useEffect(() => {
    const checkUserStatus = async () => {
      var response = await checkCurrentUser();
      if (!response.data.message) {
        var response2 = await fetchUser(response.data.id);
        // console.log(response);
        // console.log(response2.data.user);
        setUser(response2.data.user);
      }
    };
    checkUserStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchProduct(productId);
      // console.log(response.data);
      setProduct(response.data);
      setDisplayImage(response.data.images[0])
    };
    fetchData();
  }, []);

  const addProductToCart = async () => {
    let response = await addToCart(product._id, localStorage.getItem("jwt"), user._id )
    if (response.data.message) {
      navigate('/login')
    }
    else {
      setMessage("Product added to cart successfully")
      setTimeout(() => {
        setMessage("")
      }, 1500);
      console.log(response.data)
    }
  }

  // const addProductToCart = async ()
  return (
    <div className="h-[100%] bg-secondary border-[2px]">
      {/* <div className="header">
        <Header />
      </div> */}
      <section>
        {product === "" ? (
          <h1>Loading Product...</h1>
        ) : (
          <div className="flex">
            <div className="productImages flex items-center">
              <div className="flex flex-col">
                {product.images.map((image) => {
                  return (
                    <img
                      src={image}
                      alt=""
                      className="h-[5rem] w-[5rem]"
                      onClick={() => setDisplayImage(image)}
                    />
                  );
                })}
              </div>
              <div>
                <img
                  src={displayImage}
                  alt="ProductImage"
                  className="h-[20rem] w-[20rem]"
                />
              </div>
            </div>
            <div className="productDetails">
              <ul>
              <li>{product.title}</li>
              <li>{product.description}</li>
              <li>{product.price}</li>
              <li>{product.brand}</li>
              <li>{product.category}</li>
              <li>{product.seller}</li>
              {
                product.stock <= 20 ? <li>Hurry up! Only {product.stock} left.</li> : <></>
              }
              </ul>
              {/* <button onClick={addProductToCart(product._id)}>Add to Cart</button> */}
              <button onClick={addProductToCart}>Add to Cart</button>
              <h1>{message}</h1>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;
