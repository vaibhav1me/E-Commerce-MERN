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
    <section className="bg-secondary flex flex-col rounded-md text-center py-4">
        
      <div className='my-3 medium:text-[1.2rem] text-[4vw]'>
      <label htmlFor="category" className='text-yellow medium:mx-3 mr-1'>Category: </label>
      <select name="category" id="category" className='bg-primary p-2 rounded-md ' value={product.category} onChange={(e) => {updateProductDetails(e)}}>
        <option value={''} >Select a Category</option>
        {
          categories.map((category) => {
            return (<option value={category.categoryName} className="text-yellow">{category.categoryName}</option>)
          })
        }
      </select>
        </div>

<div className="my-3 medium:text-[1.2rem] text-[4vw]">
      <label htmlFor="brand" className="text-yellow medium:mx-3 mr-1">Brand: </label>
      <select name="brand" id="brand" className="bg-primary p-2 rounded-md " onChange={(e) => {updateProductDetails(e)}} value={product.brand}>
        {
          product.category === "" ? <option>Select a category first</option> : <>
            <option value={''} className="text-black">Select a brand</option>
            {Array.isArray(brands) && brands.map((brand) => {
              return (<option value={brand} className="text-yellow" >{brand}</option>)
            })}</>
          }
      </select>
          </div>

        <div className="my-3 medium:text-[1.2rem] text-[4vw]">
      <label htmlFor="description" className="text-yellow medium:mx-3 mr-1">Description: </label>
      <input type="text" name="description" id="description" className="bg-primary p-2 rounded-md " value={product.description} onChange={(e) => {updateProductDetails(e)}}/>
        </div>

<div className="my-3 medium:text-[1.2rem] text-[4vw]">
      <label htmlFor="price" className="text-yellow medium:mx-3 mr-1">Price: </label>
      <input type="text" name="price" id="price" className="bg-primary p-2 rounded-md " value={product.price} onChange={(e) => {updateProductDetails(e)}}/>
</div>

<div className="my-3 medium:text-[1.2rem] text-[4vw]">
      <label htmlFor="seller" className="text-yellow medium:mx-3 mr-1">Seller: </label>
      <input type="text" name="seller" id="seller" className="bg-primary p-2 rounded-md "  value={user.name} readOnly/>
</div>

<div className="my-3 medium:text-[1.2rem] text-[4vw]">
      <label htmlFor="title" className="text-yellow medium:mx-3 mr-1">Title: </label>
      <input type="text" name="title" id="title" className="bg-primary p-2 rounded-md " value={product.title} onChange={(e) => {updateProductDetails(e)}}/>
</div>

<div className="my-3 medium:text-[1.2rem] text-[4vw]">
      <label htmlFor="stock" className="text-yellow medium:mx-3 mr-1">Stock: </label>
      <input type="text" name="stock" id="stock" className="bg-primary p-2 rounded-md " value={product.stock} onChange={(e) => {updateProductDetails(e)}} placeholder="0"/>
</div>

      {/* brand, category, description, images, price, seller, stock, title, */}
      {
        images.map((image, index) => {
            return (
                <div className="my-3 medium:text-[1.2rem] text-[4vw]">
                    <label htmlFor={`image${index+1}`} className="text-yellow medium:mx-3 mr-1">ImageUrl - {index+1}: </label>
                    <input type="text" id={`image${index+1}`} onChange={(e) => {updateImages(index, e.target.value)}} className="bg-primary p-2 rounded-md " value={product.images[index]}/>
                </div>
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
    <div><button className="bg-primary text-yellow hover:bg-tertiary hover:text-primary px-2 py-1 rounded-md mb-2" onClick={() => {editProduct()}}>Confirm</button></div>
    <div><button className="bg-primary text-yellow hover:bg-tertiary hover:text-primary px-2 py-1 rounded-md mb-2" onClick={() => {removeProduct()}}>Delete Product</button>
    </div>
    <div className="text-black">{message != "" && message}</div>
    </section>
  )
}

export default EditProduct