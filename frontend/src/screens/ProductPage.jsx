import { useParams } from "react-router";
import { addToCart, fetchProduct } from "../apis/api";
import { useState, useEffect } from "react";
import Header from "../components/Header";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState("");
  const [displayImage, setDisplayImage] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchProduct(productId);
      console.log(response.data);
      setProduct(response.data);
      setDisplayImage(response.data.images[0])
    };
    fetchData();
  }, []);

  // const addProductToCart = async ()
  return (
    <div className="bg-[#a2b8cd]">
      <div className="header">
        <Header />
      </div>
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
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;
