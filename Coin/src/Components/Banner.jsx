import React from 'react'
import '../App.css';
import Carousel from './Carousel';
const Banner = () => {
  return (
      <div className="bannerbgimg w-full h-96 mt-3 flex-col">
        <div className='container font-bold flex justify-center pt-8 text-5xl items-center'>
          Coin Matrix 
        </div>
        <div className='pt-8 flex justify-center text-center container'>
          Get All The Info Regarding Your Favourite Crypto Currency
        </div>
        <Carousel/>
      </div>
  )
}

export default Banner
