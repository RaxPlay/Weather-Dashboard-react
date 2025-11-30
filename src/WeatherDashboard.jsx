import { useEffect, useState } from 'react';
import './styles/index.css'

/* 
  5-day forecast
  https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API_KEY}
*/ 
/*
  Current weather
  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${API_KEY}
*/

const API_KEY = import.meta.env.VITE_API_KEY;

export const WeatherDashboard = () => {

  const [cityName, setCityName] = useState('');

  const fetchData = async() => {
    const currentDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}`);
    const currentData = await currentDataResponse.json();
    const forecastData = await forecastResponse.json();

    console.log(currentData);
    console.log(forecastData);
  }

  useEffect(()=>{
    fetchData();
  },[])


  return (
    <>
      <div id="left-container" className='bg-[#555555] h-full w-[50%]'>
        hi
      </div>
    </>
  )
}
