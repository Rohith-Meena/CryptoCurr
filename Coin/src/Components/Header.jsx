import React from 'react'
import Currencyselect from './currencyselect'
import { CryptoState } from './Cryptocontext';
const Header = () => {
  return (
    <div className='static container-fluid bg-transparent p-3 inline'>
      <Currencyselect />
    </div>
  )
}

export default Header
