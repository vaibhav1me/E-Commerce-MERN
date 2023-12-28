import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/DataProvider";
import { createProduct, fetchAllCategories } from "../apis/api";

const AddProduct = () => {
    const {user, setUser} = useContext(LoginContext)
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState("")
    const [brands, setBrands] = useState([])
    const [product, setProduct] = useState({title: "", price: "", stock: 0, seller: user.name, description: "", category: "", brand: "", images: []})
    const [images, setImages] = useState(["", "", "", ""])

    useEffect(() => {
        // console.log(user)
        setProduct({...product, seller: user.name})
    }, [user])

    useEffect(() => {
        const fetchCategories = async () => {
           const response = await fetchAllCategories()
        //    console.log(response.data)
           setCategories(response.data)
        }
        fetchCategories()
    }, [])

    const updateProduct = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const updateImages = (index, value) => {
        const updatedImages = [...images]
        updatedImages[index] = value;
        setImages(updatedImages)
    }

    const addProduct = async () => {
        const response = await createProduct(product)
        if (response.data.message) {
            setMessage(response.data.message)
            setTimeout(() => {
                setMessage("")
            }, 3000);
        }
        // console.log(response.data)
    }

    useEffect(() => {
        setProduct({...product, images: images})
    }, [images])

    useEffect(() => {
        // console.log(product)
    },[product])

    useEffect(() => {
        const category = categories.filter((category) => category.categoryName === product.category)
        // setBrands([])
        setProduct({...product, brand: ""})
        if (category[0]) {
        //   console.log(category[0].brands);
          setBrands(category[0].brands)
        }
    }, [product.category])

    // useEffect(() => {
    //     const fetch
    // }, [product.category])
    // useEffect(() =>{
    //     console.log(user)
    // }, [user])

  return (
    <div className="text-black">
      <label htmlFor="category">Category</label>
      <select name="category" id="category" value={product.category} onChange={(e) => {updateProduct(e)}}>
        <option value={''} className="text-black">Select a Category</option>
        {
            categories.map((category) => {
                return (<option value={category.categoryName} className="text-black">{category.categoryName}</option>)
            })
        }
      </select>

      <label htmlFor="brand">Brand</label>
      <select name="brand" id="brand" onChange={(e) => {updateProduct(e)}} value={product.brand}>
        {
            product.category === "" ? <option>Select a category first</option> : <>
            <option value={''} className="text-black">Select a brand</option>
            {Array.isArray(brands) && brands.map((brand) => {
                return (<option value={brand} className="text-black">{brand}</option>)
            })}</>
        }
      </select>

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" value={product.description} onChange={(e) => {updateProduct(e)}}/>

      <label htmlFor="price">Price</label>
      <input type="text" name="price" id="price" value={product.price} onChange={(e) => {updateProduct(e)}}/>

      <label htmlFor="seller">Seller</label>
      <input type="text" name="seller" id="seller"  value={user.name} readOnly/>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" value={product.title} onChange={(e) => {updateProduct(e)}}/>

      <label htmlFor="stock">Stock</label>
      <input type="text" name="stock" id="stock" value={product.stock} onChange={(e) => {updateProduct(e)}} placeholder="0"/>

      {/* brand, category, description, images, price, seller, stock, title, */}
      {
        images.map((image, index) => {
            return (
                <>
                    <label htmlFor={`image${index+1}`}>ImageUrl - {index+1}</label>
                    <input type="text" id={`image${index+1}`} onChange={(e) => {updateImages(index, e.target.value)}}/>
                </>
            )
        })
      }
      {/* <label htmlFor="image1">ImageUrl - 1</label>
    <input type="text" name="images" id="image1" value={product.images[0]}/>

      <label htmlFor="image2">ImageUrl - 2</label>
    <input type="text" name="images" id="image2" value={product.images[1]}/>

      <label htmlFor="image3">ImageUrl - 3</label>
    <input type="text" name="images" id="image3" value={product.images[2]}/>

      <label htmlFor="image4">ImageUrl - 4</label>
    <input type="text" name="images" id="image4" value={product.images[3]}/> */}
    <div><button onClick={() => {addProduct()}}>Confirm</button></div>
    <div className="text-black">{message != "" && message}</div>
    </div>
  );
};

export default AddProduct;
