import React, { createContext, useContext, useEffect, useState } from 'react';
const Crypto = createContext();

const Cryptocontext = ({ children }) => {
   const [Currency, setCurrency] = useState("INR");
   const [Symbol, setSymbol] = useState("₹");
   useEffect(() => {
       if(Currency=="INR")
         setSymbol("₹");
       else if(Currency=="USD")
         setSymbol("$");
      }, [Currency]);
  return (<Crypto.Provider value={{Currency,Symbol,setCurrency}}>{children}</Crypto.Provider>);
};

export default Cryptocontext;

export const CryptoState = () => {
  return useContext(Crypto);
};