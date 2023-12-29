import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../apis/api";
import { NavLink } from "react-router-dom";

const CategorySection = () => {
  const [categories, setCategories] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchAllCategories();
      setCategories(response.data);
    };
    fetchData();
  }, []);

  return (
    <section className="text-center px-3 min-h-[100%] bg-[#162e44]">
      <h1 className="py-3 text-[2rem] text-yellow">Shop by Category</h1>
      <div className="bg-yellow w-[90%] h-[2px] m-auto"></div>
      <div className="flex items-center justify-evenly flex-wrap">
        {categories === "" ? (
          <p className="text-yellow">Loading the categories...</p>
        ) : (
          categories.map((category) => {
            return (
              <div
                key={category._id}
                className="text-yellow mx-2 my-5 bg-secondary p-2 w-[20vw] rounded-lg content-center min-w-[10rem]"
              >
                <img
                  src={category.imageUrl}
                  alt={category.categoryName}
                  className="w-[16vw] h-[16vw] mb-2 border-[2px] min-w-[8rem] min-h-[8rem] border-yellow rounded-3xl m-auto"
                />
                <NavLink
                  to={`/category/${category.categoryName}`}
                  className=" font-bold hover:underline text-[1.2rem]"
                >
                  {category.categoryName}
                </NavLink>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default CategorySection;
