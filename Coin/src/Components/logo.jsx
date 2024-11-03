import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div 
      className='text-[#EEBC1D] font-bold text-2xl inline cursor-pointer m-3 p-3'
      onClick={handleClick}
    >
      Coin Matrix
    </div>
  );
}

export default Logo;
