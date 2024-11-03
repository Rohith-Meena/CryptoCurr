import React from 'react'
import { CryptoState } from './Cryptocontext'
const Currencyselect = () => {
  const {Currency,setCurrency}=CryptoState();
  return (
    <select className='bg-[#14161A]  p-2 border-slate-600 border-2 rounded-xl .icon-container absolute right-20' value={Currency} onChange={(e)=>{setCurrency(e.target.value);}}>
    <option value="USD" className='bg-[#14161A] active:border-none'>USD</option>
    <option value="INR" className='bg-[#14161A] active:border-none'>INR</option>
  </select>
  )
}

export default Currencyselect

