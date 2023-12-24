import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { checkCurrentUser, fetchCategory, fetchUser } from "../apis/api";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/DataProvider";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([])
  const [filteredBrands, setFilteredBrands] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)

  const { user, setUser } = useContext(LoginContext);

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
      let response = await fetchCategory(categoryName);
      setFilteredProducts(response.data.products)
      setProducts(response.data.products);
      setBrands(response.data.brands)
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //    console.log(filteredBrands)
  //   let filteredProducts = [];
  //   filteredBrands.forEach((brand) => {
  //     filteredProducts = [
  //       ...filteredProducts,
  //       ...products.filter((product) => product.brand == brand),
  //     ];
  //     console.log(filteredProducts);
  //   });
  //   setProducts(filteredProducts)
  //   console.log(filteredProducts);
  //   return;
  // }, [filteredBrands]);

  useEffect(() => {
    // setProducts(response.data.products)
    // console.log(filteredBrands)
    // console.log(products)
    // console.log(filteredProducts)
    const filteredNewProducts = filteredBrands.length
      ? products.filter((product) => filteredBrands.includes(product.brand))
      :products;
      // console.log(filteredNewProducts)
    setFilteredProducts(filteredNewProducts);
  }, [filteredBrands]);


  const filterBrands = (e) => {
    if (e.target.checked) {
      setFilteredBrands([...filteredBrands, e.target.value])
    }
    else {
      setFilteredBrands(filteredBrands.filter((brand) => brand!=e.target.value))
    }    
  }

  return (
    <div className="bg-[#a2b8cd]">
      <div className="header">
        <Header />
      </div>
      <section>
        <div className="filter">
          <h1>Filter by Brand</h1>
          <div className="flex flex-col ">
            {brands.length!=0 && brands.map((brand) => {
              return <div>
                <input type="checkbox" value={brand} id={brand} onChange={(e) => {filterBrands(e)}}/>
                <label htmlFor={brand}>{brand}</label>
                </div>
            })}
          </div>
          <div className="products flex ">
            {filteredProducts.length!=0 && filteredProducts.map((product) => {
              return <div key={product._id} className="w-[15rem] ">
                <img src={product.images[0]} alt={product.title} className="h-[10rem] w-[10rem]"/>
                <Link to={`/product/${product._id}`}>{product.title}</Link>
                {/* <p>{product.title}</p> */}
                <p>Rs. {product.price}</p>
              </div>
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
