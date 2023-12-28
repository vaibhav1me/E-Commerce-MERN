import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { findProducts } from '../apis/api'
import { Link } from 'react-router-dom'


const SearchPage = () => {
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('Loading...')
    const {searchQuery} = useParams()

   useEffect(() => {
    const searchProducts = async () => {
        setProducts([])
        setMessage('Loading....')
        let response = await findProducts(searchQuery)
         if (response.data.length == 0) {
            setMessage('No such products')
        }
        else {
            setMessage(`showing results for "${searchQuery}"`)
        }
        setProducts(response.data)
    }
    searchProducts()
   }, [searchQuery])

   useEffect(() => {
     console.log(products)
   }, [products])
   
  return (
    <div>
        <p>{message}</p>

        <div>
            {
                products.map((product) => {
                    return (
                        <div key={product._id}>
                            <Link to={`/product/${product._id}`}>{product.title}</Link>
                            <span>{product.brand}</span>
                            <span><img src={product.images[0]} alt="" className='h-[8rem] w-[8rem]'/></span>
                            <span>{product.description}</span>
                            <span>{product.price}</span>
                            <span>{product.stock}</span>
                            <span></span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default SearchPage