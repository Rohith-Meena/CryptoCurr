import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import { CryptoState } from './Cryptocontext';
import { HistoricalChart } from '../config/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { chartDays } from './data';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const Coinchart = (props) => {
    const [Historicaldata, setHistoricaldata] = useState([]);
    const [Days, setDays] = useState(1);
    const {Currency}=CryptoState();
    const fetchHistoricalData=async()=>{
        const {data}=await axios.get(HistoricalChart(props.id.toLowerCase(),Days,Currency.toLowerCase()));
        
        setHistoricaldata(data.prices);
    };
    useEffect(() => {
      fetchHistoricalData();
    }, [Currency,Days])
    useEffect(() => {
        fetchHistoricalData();
      }, [])
  return (
    <div className='p-2 mt-5 h-5/6  container  '>
        {
            (Historicaldata.length === 0 )?
            (<Box sx={{ display: 'flex' }} className='flex justify-center h-full text-center items-center'>
            <CircularProgress />
          </Box>):<>
          <Line  data={{labels: Historicaldata.map((coin)=>{
            let date=new Date(coin[0]);
            let time=date.getHours()>=12?`${date.getHours()-12}:${date.getMinutes()} PM`:`${date.getHours()}:${date.getMinutes()} AM`;
            if(Days===1)    return time;
            else return date.toLocaleDateString();
          })
            ,datasets:[
                {data:Historicaldata.map((coin)=>coin[1])
                ,label:`Price (Past ${Days} ${Days>1?'days':'day'}) in ${Currency}`,
                borderColor:"#EEBC1D",
            }]}} options={{elements:{point:{radius:1}}}} />
          </>  
        }
    
    <div className='flex justify-evenly mt-4'>
            {chartDays.map((day)=>{
              return <button key={day.value} onClick={()=>{setDays(day.value)}} className={day.value==Days?'text-[#14161A] font-semibold rounded-lg border-[#14161A] bg-[#EEBC1D] border-2 p-2  ':'text-white font-semibold rounded-lg border-[#EEBC1D] border-2 p-2 '}>{day.label}</button>
            })}
        </div>
    </div>
  )
}

export default Coinchart
