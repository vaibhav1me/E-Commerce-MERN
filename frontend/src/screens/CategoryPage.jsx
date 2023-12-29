import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { checkCurrentUser, fetchCategory, fetchUser } from "../apis/api";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/DataProvider";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const { user, setUser } = useContext(LoginContext);

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
      let response = await fetchCategory(categoryName);
      setFilteredProducts(response.data.products);
      setProducts(response.data.products);
      setBrands(response.data.brands);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredNewProducts = filteredBrands.length
      ? products.filter((product) => filteredBrands.includes(product.brand))
      : products;
    setFilteredProducts(filteredNewProducts);
  }, [filteredBrands]);

  const filterBrands = (e) => {
    if (e.target.checked) {
      setFilteredBrands([...filteredBrands, e.target.value]);
    } else {
      setFilteredBrands(
        filteredBrands.filter((brand) => brand != e.target.value)
      );
    }
  };

  return (
    <div className="bg-secondary text-center min-h-[100%] text-yellow">
      {products.length == 0 ? (
        <p className="text-yellow">Loading Products....</p>
      ) : (
        <section>
          <div className="px-[.5rem] py-2 flex justify-between bg-yellow">
            <h1 className="text-[1.2rem] text-primary">Filter by Brand</h1>
            <div className="flex justify-between items-center flex-wrap w-[100%]">
              {brands.length != 0 &&
                brands.map((brand) => {
                  return (
                    <div className="mx-[.5rem]">
                      <input
                        type="checkbox"
                        className="mx-1 border-solid-[2px] border-yellow"
                        value={brand}
                        id={brand}
                        onChange={(e) => {
                          filterBrands(e);
                        }}
                      />
                      <label htmlFor={brand} className="text-primary">
                        {brand}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col justify-evenly bg-tertiary p-2">
            {filteredProducts.length != 0 &&
              filteredProducts.map((product) => {
                return (
                  <div
                    key={product._id}
                    className="w-full flex-row  bg-primary flex justify-around items-center my-1 px-[1rem] py-[.5rem] rounded-lg"
                  >
                    <div className="border-yellow border-[5px] rounded-lg mr-4 ">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="large:h-[15vw] large:w-[15vw] h-[10rem] w-[10rem] m-auto object-fill"
                      />
                    </div>
                    <div className="medium:w-[80vw] text-left w-[100%]">
                      <NavLink
                        to={`/product/${product._id}`}
                        className="small:text-[1.3rem] text-[4vw] text-yellow"
                      >
                        {product.title}
                      </NavLink>
                      {/* <p>{product.title}</p> */}
                      <p className="text-[.8rem] hidden medium:block">
                        <span className="text-yellow">Details:</span>{" "}
                        {product.description}
                      </p>
                      <p className="text-[4vw] small:text-[1rem]">
                        <span className="text-yellow">Brand:</span>{" "}
                        {product.brand}
                      </p>
                      <p>Rs. {product.price}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoryPage;
