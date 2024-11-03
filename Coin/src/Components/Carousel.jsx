import axios from 'axios'
import { useState,useEffect } from 'react';
import React from 'react'
import { CryptoState } from './Cryptocontext'
import {TrendingCoins} from '../config/api.jsx';
import AliceCarousel, { Link } from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom';
const Carousel = () => {
    const navigate=useNavigate();
    const [Trending, setTrending] = useState([]);
    const {Currency,Symbol}=CryptoState();
    
    const fetchtrendingcoins=async()=>{
        const {data}=await axios(TrendingCoins(Currency));
        setTrending(data);}
    useEffect(() => {
          fetchtrendingcoins();
        }, [Currency]);
    const itemsresponsive= {0: {items: 2,},512:{items: 3,}};
        const numberwithcommas=(givenNumber)=>{ 
            let nfObject = new Intl.NumberFormat('en-US'); 
            let output = nfObject.format(givenNumber); 
            return output;
        }
        const items=Trending.map((coin)=>{
            let profit=coin.price_change_percentage_24h>=0;
            return(
                
               <div onClick={()=>{navigate(`/Coins/${coin.id}`)}} className='flex-col items-center justify-center cursor-pointer uppercase text-center container '>
                <img src={coin.image} className='max-h-28 block ml-auto mr-auto' alt={coin.name}/>
                <span className='mt-7 pt-6'>{coin.symbol}&nbsp;<span className={profit?'text-green-600':'text-red-600'}>
                    {profit&&"+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span></span>
                    <br></br>
                    <span className='text-center text-xl'>{Symbol}{numberwithcommas(coin?.current_price)}</span>
               </div>
            );
        });
  return (
    <div className='container flex justify-center items-center pt-10'>
      <AliceCarousel mouseTracking autoPlayInterval={100} autoPlay  infinite animationDuration={1500} disableDotsControls disableButtonsControls responsive={itemsresponsive} items={items} />
    </div>
  )
}

export default Carousel
