import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import { bannerData } from '../constants/data'

const responsive = {
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 1},
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 1
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
  items: 1
  }
}


const Banner = () => {
  return (
    <div className='px-[.8rem] my-[1rem]'>
    <Carousel responsive={responsive} draggable={false} infinite={true} autoPlay={true} autoPlaySpeed={3000} showDots={true} dotListClass='custom-dot-list-style' itemClass='carousel-item-padding-40-px' containerClass='carousel-container' swipeable={false}>
        {
            bannerData.map((bannerItem) => {
                return (
                    <img src={bannerItem.url} alt="banner" className='w-[100%] h-[280px]'/>
                )
            })
        }
    </Carousel>
    </div>
  )
}

export default Banner