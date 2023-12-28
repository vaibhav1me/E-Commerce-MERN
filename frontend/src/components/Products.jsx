import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/DataProvider'
import { fetchProductsBySeller } from '../apis/api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const Products = () => {
  const {user, setUser} = useContext(LoginContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const getProducts = async () => {
      let response = await fetchProductsBySeller(user.name)
      console.log(response.data)
      setProducts(response.data)
    }
    getProducts()
  }, [user])

  const editProduct = async () => {

  }

  return (
    <div>
      <div><button onClick={() => {navigate('/account/products/addProduct')}}>Add Product</button></div>

      <div>
        {
          products.length != 0 && products.map((product) => {
            return (<div key={product._id} className='bg-black'>
                <span>{product.title}</span>
                <span>{product.category}</span>
                <span>{product.brand}</span>
                <span>{product.description}</span>
                <img src={product.images[0]} alt="" className='h-[5rem] w-[5rem]'/>
                <span>{product.price}</span>
                <span>{product.stock}</span>
                <button onClick={() => editProduct(product._id)}><Link to={`/account/products/${product._id}`}>Edit</Link></button>
            </div>)
          })
        }
      </div>
    </div>
  )
}

export default Products