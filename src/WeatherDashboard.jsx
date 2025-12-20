import { use, useEffect, useState } from 'react';
import './styles/index.css'

const API_KEY = import.meta.env.VITE_API_KEY;

export const WeatherDashboard = () => {

  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  let [units, setUnits] = useState('imperial');
  let [showCityName, setShowCityName] = useState();
  let [cityTemp, setCityTemp] = useState('');
  let [feelsLikeTemp, setFeelsLikeTemp] = useState('');
  let [humidity, sethumidity] = useState('');
  let [windSpeed, setWindSpeed] = useState('');
  //Finish this up
  const [weatherState, setWeatherState] = useState();

  const onInputChange = (event) => {
    event.preventDefault();
    setCityName(event.target.value);
  };

  const fetchData = async() => {
    const currentDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`);

    if(!cityName) {
      alert("Error: city not found");
      return
    }

    const currentData = await currentDataResponse.json();
    const forecastData = await forecastResponse.json();

    setWeatherState(currentData.weather[0].main);
    setCountryName(currentData.sys.country);
    sethumidity(`Humidity: ${currentData.main.humidity}%`)
    

    if(units == "metric"){
      setCityTemp(`${Math.ceil(currentData.main.temp)}˚C`);
      setFeelsLikeTemp(`(Feels like: ${Math.ceil(currentData.main.feels_like)}˚C)`)
      setWindSpeed(`Wind Speed: ${currentData.wind.speed}m/s`)
    } else if (units == "imperial") {
      setCityTemp(`${Math.ceil(currentData.main.temp)}˚F`)
      setFeelsLikeTemp(`(Feels like: ${Math.ceil(currentData.main.feels_like)}˚F)`);
      setWindSpeed(`Wind Speed: ${currentData.wind.speed}mph`)
    }

    console.log(currentData);
    console.log(forecastData);
  };

  const changeToMetric = () => {
    if (units == 'metric'){
      return
    }
    else{
      setUnits("metric");
      alert("Units successfully changed to Celcius!, Search city to view changes");
    }
  }

  const changeToImperial = () => {
    if (units == 'imperial'){
      return
    }
    else{
      setUnits("imperial");
      alert("Units successfully changed to Fahrenheit!, Search city to view changes");
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(cityName == ""){
      alert("Please enter the name of a city");
      return;
    }

    fetchData();

    setShowCityName(cityName)
    
    console.log(cityName);
  }

  return (
    <>
      <div id='content-container' className='flex h-dvh'>
        <div id="left-container" className='bg-[#555555] h-[96%] w-[48%] rounded-lg m-5'>
          { cityName ? (
            <span className='flex gap-3 m-6 h-7 align-text-top'>
              <i className='fa-solid fa-location-dot relative top-1'></i>
              {showCityName}, {countryName} 
            </span>
          ) : "" }
          <div id='main-info' className='text-center '>
          { cityTemp ? (
            <p className='text-5xl'>☀️</p>
          ) : ""}
            <p className='text-3xl mt-1'>{cityTemp}</p>
            <p className='text-xl mt-1'>{feelsLikeTemp}</p>
          </div>

          <div id='info-containers'>
            { }
            <div className='bg-[#373535]'>{humidity}</div>
            <div className='bg-[#373535]'>{windSpeed}</div>
            <div className='bg-[#373535]'>
              5-Day-Forecast
            </div>
          </div>
        </div>

        

        <div id='right-container'>
          <form action="get-city-name" onSubmit={onSubmit} className='flex gap-5 ml-5 mt-5'>
            <input type="text" value={cityName} onChange={onInputChange} placeholder='London' className='bg-gray-600 p-2 rounded-md w-2xl'/>
            <button type='submit' onClick={onSubmit} className='bg-gray-700 p-2 rounded-md w-[100px] mr-3 cursor-pointer'>
              <i className='fa-solid fa-arrow-right'></i>
            </button>
          </form>
          <div className='flex justify-center gap-10 mt-10'>
            <button onClick={changeToImperial} className='bg-gray-700 p-2 rounded-md cursor-pointer'>
              Prefer Fahrenheit?
            </button>
            <button onClick={changeToMetric} className='bg-gray-700 p-2 rounded-md cursor-pointer'>
              Prefer Celcius?
            </button>
          </div>
        </div>
      </div>
    </>
  )
}