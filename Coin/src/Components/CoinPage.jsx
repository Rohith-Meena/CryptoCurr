import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { CryptoState } from './Cryptocontext';
import { SingleCoin } from '../config/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import HtmlParser from 'react-html-parser';
import Coinchart from './Coinchart';
const CoinPage = () => {
  const {id}=useParams();
  const [Coins, setCoins] = useState([null]);
  const {Currency,Symbol}=CryptoState();
  const fetchcoin=async()=>{
    const {data}=await axios.get(SingleCoin(id));
    
    setCoins(data);
  };
  const numberwithcommas=(givenNumber)=>{ 
    let nfObject = new Intl.NumberFormat('en-US'); 
    let output = nfObject.format(givenNumber); 
    return output;
}
function convertToMillion(numberString) {
  const number = parseFloat(numberString);
  const million = number / 1000000;
  return `${million.toFixed(1)}M`;
}
useEffect(() => {
  
      window.scrollTo(0, 0);
}, []);
  useEffect(() => {
    fetchcoin();
  }, []);
  if(!(Coins&&Coins.description&&Coins.description.en))
   return <Box sx={{ display: 'flex' }} className='flex justify-center  h-screen text-center items-center'>
      <CircularProgress />
    </Box>
  else
  return (
    <div>
    <div className=' w-full h-screen xl:flex mt-5'>
      <div className='flex-col justify-center items-center xl:w-2/5 w-full xl:border-r-2'>
      <img src={Coins.image?.large} alt={Coins?.name} className='h-2/6 ml-auto mr-auto mt-4'></img>
      <div className='text-center mt-3 font-bold text-2xl font-serif'>{Coins?.name}</div>
      <div className='text-center mt-2 container'>{HtmlParser(Coins.description['en'].split('. ')[0])}.{HtmlParser(Coins.description.en.split('. ')[1])}</div>
        <div className='mt-3 text-center font-bold font-sans text-2xl'>Rank:&nbsp;<span className='font-normal font-sans'>{Coins.market_cap_rank}</span></div>
        <div className='mt-3 text-center font-bold font-sans text-2xl'>Current Price:&nbsp;<span className='font-normal font-sans'>{Symbol}{numberwithcommas(Coins.market_data.current_price[Currency.toLowerCase()])}</span></div>
        <div className='mt-3 text-center font-bold font-sans text-2xl'>Market Cap:&nbsp;<span className='font-normal font-sans'>{Symbol}{convertToMillion(Coins.market_data.market_cap[Currency.toLowerCase()])}</span></div>
      </div>
      <Coinchart className='w-auto h-auto' id={id}/>
      </div>
      </div>
  

  )
}

export default CoinPage
