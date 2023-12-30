import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/DataProvider";
import { createProduct, fetchAllCategories } from "../apis/api";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const { user, setUser } = useContext(LoginContext);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    stock: 0,
    seller: user.name,
    description: "",
    category: "",
    brand: "",
    images: [],
  });
  const [images, setImages] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct({ ...product, seller: user.name });
  }, [user]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchAllCategories();
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const updateProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateImages = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const addProduct = async () => {
    const response = await createProduct(product);
    if (response.data.message) {
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      navigate("/account/products");
    }
  };

  useEffect(() => {
    setProduct({ ...product, images: images });
  }, [images]);

  useEffect(() => {
    const category = categories.filter(
      (category) => category.categoryName === product.category
    );
    setProduct({ ...product, brand: "" });
    if (category[0]) {
      setBrands(category[0].brands);
    }
  }, [product.category]);

  return (
    <section className="bg-secondary flex flex-col rounded-md text-center py-4">
      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="category" className="text-yellow medium:mx-3 mr-1">
          Category:{" "}
        </label>
        <select
          name="category"
          id="category"
          value={product.category}
          onChange={(e) => {
            updateProduct(e);
          }}
          className="bg-primary p-2 rounded-md "
        >
          <option value={""} >
            Select a Category
          </option>
          {categories.map((category) => {
            return (
              <option value={category.categoryName} className="text-yellow">
                {category.categoryName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="brand" className="text-yellow medium:mx-3 mr-1">
          Brand:{" "}
        </label>
        <select
          name="brand"
          id="brand"
          onChange={(e) => {
            updateProduct(e);
          }}
          value={product.brand}
          className="bg-primary p-2 rounded-md "
        >
          {product.category === "" ? (
            <option>Select a category first</option>
          ) : (
            <>
              <option value={""} className="">
                Select a brand
              </option>
              {Array.isArray(brands) &&
                brands.map((brand) => {
                  return (
                    <option value={brand} className="text-yellow">
                      {brand}
                    </option>
                  );
                })}
            </>
          )}
        </select>
      </div>

      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="description" className="text-yellow medium:mx-3 mr-1">
          Description:{" "}
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={product.description}
          onChange={(e) => {
            updateProduct(e);
          }}
          className="bg-primary p-2 rounded-md "
        />
      </div>

      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="price" className="text-yellow medium:mx-3 mr-1">
          Price:{" "}
        </label>
        <input
          type="text"
          name="price"
          id="price"
          value={product.price}
          onChange={(e) => {
            updateProduct(e);
          }}
          className="bg-primary p-2 rounded-md "
        />
      </div>

      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="seller" className="text-yellow medium:mx-3 mr-1">
          Seller:{" "}
        </label>
        <input
          type="text"
          name="seller"
          id="seller"
          value={user.name}
          readOnly
          className="bg-primary p-2 rounded-md "
        />
      </div>

      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="title" className="text-yellow medium:mx-3 mr-1">
          Title:{" "}
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={product.title}
          onChange={(e) => {
            updateProduct(e);
          }}
          className="bg-primary p-2 rounded-md "
        />
      </div>

      <div className="my-3 medium:text-[1.2rem] text-[4vw]">
        <label htmlFor="stock" className="text-yellow medium:mx-3 mr-1">
          Stock:{" "}
        </label>
        <input
          type="text"
          name="stock"
          id="stock"
          value={product.stock}
          onChange={(e) => {
            updateProduct(e);
          }}
          placeholder="0"
          className="bg-primary p-2 rounded-md "
        />
      </div>

      {/* brand, category, description, images, price, seller, stock, title, */}
      {images.map((image, index) => {
        return (
          <div className="my-3 medium:text-[1.2rem] text-[4vw]">
            <label
              htmlFor={`image${index + 1}`}
              className="text-yellow medium:mx-3 mr-1"
            >
              ImageUrl - {index + 1}:{" "}
            </label>
            <input
              type="text"
              id={`image${index + 1}`}
              onChange={(e) => {
                updateImages(index, e.target.value);
              }}
              placeholder={`${index != 0 ? 'optional' : ""}`}
              className="bg-primary p-2 rounded-md "
            />
          </div>
        );
      })}

      <div>
        <button
          onClick={() => {
            addProduct();
          }}
        className="bg-primary text-yellow hover:bg-tertiary hover:text-primary px-2 py-1 rounded-md">
          Confirm
        </button>
      </div>
      <div className="text-yellow">{message != "" && message}</div>
    </section>
  );
};

export default AddProduct;
