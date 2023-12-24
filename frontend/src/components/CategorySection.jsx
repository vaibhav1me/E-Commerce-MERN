import React, { useEffect, useState } from 'react'
import { fetchAllCategories } from '../apis/api';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const [categories, setCategories] = useState('')
    useEffect(() => {
      const fetchData = async () => {
      let response = await fetchAllCategories()
      // console.log(response.data)
      setCategories(response.data)
      }
      fetchData()
    }, [])
    
  return (
    <section className='categorySection text-center px-3 bg-[#162e44]'>
      <h1 className='py-3 text-[2rem]'>Shop by Category</h1>
      <div className='flex items-center justify-evenly flex-wrap'>
        {categories === '' ? 'Loading the categories...' : categories.map((category) => {
          return <div key={category._id} className='mx-2 my-5 bg-[#a2b8cd] p-6 rounded-lg content-center'>
            <img src={category.imageUrl} alt={category.categoryName} className='w-[20rem] h-[20rem] mb-2 rotate-3 border-[2px] border-black rounded-3xl m-auto'/>
            <Link to={`/category/${category.categoryName}`} className='text-black font-bold hover:underline text-[1.2rem]'>{category.categoryName}</Link>
          </div>
        })}
      </div>
    </section>
  )
}

export default CategorySection