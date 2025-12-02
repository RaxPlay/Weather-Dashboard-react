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
  let [showCityName, setShowCityName] = useState();
  const [weatherState, setWeatherState] = useState();

  const onInputChange = (event) => {
    event.preventDefault();
    setCityName(event.target.value);
  };

  const fetchData = async() => {
    const currentDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`);

    const currentData = await currentDataResponse.json();
    const forecastData = await forecastResponse.json();

    setWeatherState(currentData.weather[0].main)

    console.log(currentData);
    console.log(forecastData);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetchData();

    setShowCityName(cityName)
    
    console.log(cityName);
  }

  return (
    <>
      <div id='content-container' className='flex h-dvh'>
        <div id="left-container" className='bg-[#555555] h-full w-[50%] rounded-r-md'>
          { cityName ? (
            <span className='flex gap-3 m-6 h-7 align-text-top'>
              <i className='fa-solid fa-location-dot relative top-1'></i>
              {showCityName}
            </span>
          ) : "" }
          <div id='main-info'>
            <p>{weatherState}</p>
            <span id='city-name-display'>{showCityName}</span>
          </div>
        </div>
        <div id='right-container'>
          <form action="get-city-name" onSubmit={onSubmit} className='flex gap-10 ml-5 mt-5'>
            <input type="text" value={cityName} onChange={onInputChange} placeholder='London' className='bg-gray-600 p-2 rounded-md w-2xl'/>
            <button type='submit' onClick={onSubmit} className='bg-gray-700 p-2 rounded-md w-[100px]'>
              <i className='fa-solid fa-arrow-right'></i>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
