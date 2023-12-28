import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deleteProduct, fetchAllCategories, fetchProduct, updateProduct } from '../apis/api'
import { LoginContext } from '../context/DataProvider'




const EditProduct = () => {
  const navigate = useNavigate()
  const {productId} = useParams()
  const { user, setUser } = useContext(LoginContext);
  const [product, setProduct] = useState({title: "", price: "", stock: 0, seller: user.name, description: "", category: "", brand: "", images: []})
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState(["", "", "", ""])

  useEffect(() => {
    const getProduct = async () => {
      let response = await fetchProduct(productId)
      console.log(response.data)
      setProduct(response.data)
      setImages(response.data.images)
    }
    getProduct()
  }, [])

  const editProduct = async () => {
    let response = await updateProduct(productId, product)
    navigate('/account/products')
    // console.log(response.data)
    
  }

  useEffect(() => {
        const fetchCategories = async () => {
           const response = await fetchAllCategories()
        //    console.log(response.data)
           setCategories(response.data)
        }
        fetchCategories()
        console.log(product)
    }, [product])

    useEffect(() => {
        const category = categories.filter((category) => category.categoryName === product.category)
        // setBrands([])
        // setProduct({...product, brand: ""})
        if (category[0]) {
        //   console.log(category[0].brands);
          setBrands(category[0].brands)
        }
        console.log(categories, category)
    }, [categories])

    const updateProductDetails = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }


    useEffect(() => {
      console.log(brands)
    }, [brands])

    useEffect(() => {
      setProduct({ ...product, images: images });
    }, [images]);

    const updateImages = (index, value) => {
        const updatedImages = [...images]
        updatedImages[index] = value;
        setImages(updatedImages)
    }

    const removeProduct = async () => {
        var response = await deleteProduct(productId)
        navigate('/account/products')
        // console.log(response.data)
    }

  return (
    <div className="text-black">
      <label htmlFor="category">Category</label>
      <select name="category" id="category" value={product.category} onChange={(e) => {updateProductDetails(e)}}>
        <option value={''} className="text-black">Select a Category</option>
        {
            categories.map((category) => {
                return (<option value={category.categoryName} className="text-black">{category.categoryName}</option>)
            })
        }
      </select>

      <label htmlFor="brand">Brand</label>
      <select name="brand" id="brand" onChange={(e) => {updateProductDetails(e)}} value={product.brand}>
        {
            product.category === "" ? <option>Select a category first</option> : <>
            <option value={''} className="text-black">Select a brand</option>
            {Array.isArray(brands) && brands.map((brand) => {
                return (<option value={brand} className="text-black" >{brand}</option>)
            })}</>
        }
      </select>

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" value={product.description} onChange={(e) => {updateProductDetails(e)}}/>

      <label htmlFor="price">Price</label>
      <input type="text" name="price" id="price" value={product.price} onChange={(e) => {updateProductDetails(e)}}/>

      <label htmlFor="seller">Seller</label>
      <input type="text" name="seller" id="seller"  value={user.name} readOnly/>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" value={product.title} onChange={(e) => {updateProductDetails(e)}}/>

      <label htmlFor="stock">Stock</label>
      <input type="text" name="stock" id="stock" value={product.stock} onChange={(e) => {updateProductDetails(e)}} placeholder="0"/>

      {/* brand, category, description, images, price, seller, stock, title, */}
      {
        images.map((image, index) => {
            return (
                <>
                    <label htmlFor={`image${index+1}`}>ImageUrl - {index+1}</label>
                    <input type="text" id={`image${index+1}`} onChange={(e) => {updateImages(index, e.target.value)}} value={product.images[index]}/>
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
    <div><button onClick={() => {editProduct()}}>Confirm</button></div>
    <div><button onClick={() => {removeProduct()}}>Delete Product</button>
    </div>
    <div className="text-black">{message != "" && message}</div>
    </div>
  )
}

export default EditProduct