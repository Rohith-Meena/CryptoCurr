import React from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from './Cryptocontext';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const Coinstable = () => {
  let arr=Array(10);
    for(let i=0;i<10;i++)
        arr[i]=i+1;
    const [Coins, setCoins] = useState([]);
    const [Loading, setLoading] = useState(false);
    const {Currency,Symbol}=CryptoState();
    const [Search, setSearch] = useState("");
    const [Page, setPage] = useState(1);
    const fetchcoins=async()=>{
        setLoading(true);
        const {data}=await axios.get(CoinList(Currency));
        setCoins(data);
        setLoading(false);
    };
    useEffect(() => {
      fetchcoins();
    }, [Currency])
    const handlesearch=()=>{
      const lst=[];
      for(let i=0;i<Coins.length;i++)
      { 
        if(Coins[i].name.toLowerCase().includes(Search)||Coins[i].id.toLowerCase().includes(Search)||Coins[i].symbol.toLowerCase().includes(Search))
          lst.push(Coins[i]);
      }
      return lst;
    }
    const navigate=useNavigate();
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
  const handlepagenation=(e)=>
  {
    setPage(e.currentTarget.value);
  };
      return (
    <>
    <div className='container mt-2 capitalize text-center text-3xl'>
      Cryptocurrency prices by market cap
    </div>
    <div className='flex justify-center items-center mt-3 '>
    <input name="searchCurrency" placeholder="Search for a Cryptocurrency..." onChange={(e)=>setSearch(e.target.value)} className='w-6/12 rounded-xl text-white border-slate-600 border-2 bg-[#14161A] px-2 h-12' ></input>
    </div>
   {Loading?
    <Box sx={{ display: 'flex' }} className='flex justify-center text-center mt-3'>
      <CircularProgress />
    </Box>
    : <table className='w-screen mt-4 container'>
  <thead className='bg-[#EEBC1D] w-full flex text-[#14161A]'>
    <tr className='flex w-full container'>
     <th className={'text-xl text-black text-center w-1/4 '} key={"Coin"}>Coin</th> 
     <th className={'text-xl text-black  w-1/4 text-center'} key={"Price"}>Price</th>
     <th className={'text-xl text-black  w-1/4 text-center'} key={"24h Change"}>24h Change</th>
     <th className={'text-xl text-black  w-1/4 text-center'} key={"Market Cap"}>Market Cap</th>
     </tr>
  </thead> 
  <tbody>
      {handlesearch().slice((Page-1)*10,Page*10).map((row)=>{
        const profit=row.price_change_percentage_24h>0;
        return(
          <tr key={row.name} className='flex h-20 mt-3 border-b-2 items-center container'>
            <td className='w-1/4 text-center flex items-center justify-center cursor-pointer' onClick={()=>navigate(`/Coins/${row.id}`)}>
              <img src={row?.image} className='h-10'></img>
              <span className='mx-2'>
              <span className=' font-bold '>{row?.symbol.toUpperCase()}</span>
              <br/>
              <span className='font-light'>{row?.name}</span>
              </span>
            </td>
            <td className='w-1/4 flex justify-center  text-center'>
              {Symbol}{numberwithcommas(row?.current_price)}
            </td>
            <td className='w-1/4 flex justify-center  text-center'>
             <span className={profit?'text-green-600':'text-red-600'}>{profit&&'+'}{row.price_change_percentage_24h.toFixed(2)}%</span> 
            </td>
            <td className='w-1/4 flex justify-center text-center'>{Symbol}{convertToMillion(row.market_cap)}</td>
          </tr>
        );
      })}
  </tbody>
  </table>}
  <div className='flex w-full justify-evenly items-center h-32 container'>
    <button className='bg-gray-800 h-6 w-6 sm:h-8 sm:w-8' onClick={()=>{
      if(Page==1) setPage(10);
      else  setPage(Page-1);
    }}>&lt;</button>
    {arr.map((element)=>{
      return <button value={element} key={element} className='bg-gray-800 h-6 w-6 sm:h-8 sm:w-8' onClick={handlepagenation}>{element}</button>
    })}
    <button className='bg-gray-800 h-6 w-6 sm:h-8 sm:w-8' onClick={()=>{
      if(Page==10) setPage(1);
      else  setPage(Page+1);
    }}>&gt;</button>
  </div>
    </>
    );
}

export default Coinstable
