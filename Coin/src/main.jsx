import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Cryptocontext from './Components/Cryptocontext.jsx'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


ReactDOM.createRoot(document.getElementById('root')).render(
 
    <div className='defaultcolor pt-4' >
    <Cryptocontext>
    <App/>
    </Cryptocontext>
    </div>
   
)
