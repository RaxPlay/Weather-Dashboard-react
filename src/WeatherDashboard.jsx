import { useState } from 'react';
import './styles/index.css'

const API_KEY = import.meta.env.VITE_API_KEY;

export const WeatherDashboard = () => {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  let [units, setUnits] = useState('imperial');
  //Current Data variables.
  let [showCityName, setShowCityName] = useState();
  let [cityTemp, setCityTemp] = useState('');
  let [feelsLikeTemp, setFeelsLikeTemp] = useState('');
  let [humidity, sethumidity] = useState('');
  let [windSpeed, setWindSpeed] = useState('');
  let [weatherState, setWeatherState] = useState('');
  //5-day Forecast Data variables.
  let [day1Temp, setDay1Temp] = useState('')
  let [day2Temp, setDay2Temp] = useState('')
  let [day3Temp, setDay3Temp] = useState('')
  let [day4Temp, setDay4Temp] = useState('')
  let [day5Temp, setDay5Temp] = useState('')
  let [day1WeatherState, setDay1WeatherState] = useState('');
  let [day2WeatherState, setDay2WeatherState] = useState('');
  let [day3WeatherState, setDay3WeatherState] = useState('');
  let [day4WeatherState, setDay4WeatherState] = useState('');
  let [day5WeatherState, setDay5WeatherState] = useState('');

  const onInputChange = (event) => {
    event.preventDefault();
    setCityName(event.target.value);
  };

  const fetchData = async() => {
    const currentDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${units}`);

    if(!cityName) {
      alert("Error: city not found");
      return
    }
    //Current data code.
    const currentData = await currentDataResponse.json();
    const forecastData = await forecastResponse.json();

    setWeatherState(currentData.weather[0].main);
    setCountryName(currentData.sys.country);
    sethumidity(`Humidity: ${currentData.main.humidity}%`);

    if(units == "metric"){
      setCityTemp(`${Math.ceil(currentData.main.temp)}˚C`);
      setFeelsLikeTemp(`(Feels like: ${Math.ceil(currentData.main.feels_like)}˚C)`);
      setWindSpeed(`Wind Speed: ${currentData.wind.speed}m/s`);
      //5-day forecast code.
      setDay1Temp(`${Math.ceil(forecastData.list[1].main.temp)}˚C`);
      setDay2Temp(`${Math.ceil(forecastData.list[9].main.temp)}˚C`);
      setDay3Temp(`${Math.ceil(forecastData.list[17].main.temp)}˚C`);
      setDay4Temp(`${Math.ceil(forecastData.list[25].main.temp)}˚C`);
      setDay5Temp(`${Math.ceil(forecastData.list[33].main.temp)}˚C`);
    } else if (units == "imperial") {
      setCityTemp(`${Math.ceil(currentData.main.temp)}˚F`);
      setFeelsLikeTemp(`(Feels like: ${Math.ceil(currentData.main.feels_like)}˚F)`);
      setWindSpeed(`Wind Speed: ${currentData.wind.speed}mph`);
      //5-day forecast code.
      setDay1Temp(`${Math.ceil(forecastData.list[1].main.temp)}˚F`);
      setDay2Temp(`${Math.ceil(forecastData.list[9].main.temp)}˚F`);
      setDay3Temp(`${Math.ceil(forecastData.list[17].main.temp)}˚F`);
      setDay4Temp(`${Math.ceil(forecastData.list[25].main.temp)}˚F`);
      setDay5Temp(`${Math.ceil(forecastData.list[33].main.temp)}˚F`);  
    }
    //5-day forecast code.
    // 1, 9, 17, 25, 33
    setDay1WeatherState(forecastData.list[1].weather[0].main);
    setDay2WeatherState(forecastData.list[9].weather[0].main);
    setDay3WeatherState(forecastData.list[17].weather[0].main);
    setDay4WeatherState(forecastData.list[25].weather[0].main);
    setDay5WeatherState(forecastData.list[33].weather[0].main);

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

    setShowCityName(cityName);
    show5DayForecast = 'true';
    
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
            <div className='relative top-10 left-82 text-center rounded-md'>
              { humidity ? (
                <div className='bg-[#373535] h-[60px] w-[161px] rounded-t-md p-1'>{humidity}</div>
              ) : ""}

              { windSpeed ? (
                <div className='bg-[#373535] h-[60px] w-[161px] rounded-b-md p-1'>{windSpeed}</div>
              ) : ""}
            </div>
            
            <div className='absolute top-119 w-203.5' id='5-day-forecast-container'>
                <div className='bg-[#373535] rounded-md'>
                  <h1 className='text-center text-2xl p-2'>5-Day-Forecast</h1>
                  
                  <hr className='text-[#67676755]'/>
                  
                  <div className='h-100 p-7 text-2xl grid grid-cols-5 gap-6'>
                    <div className="bg-[#222121] relative p-2 top-2.5 rounded-md h-30 w-30 text-center" id='day-1'>
                      {day1Temp}
                      <div>
                        {day1WeatherState}
                      </div>
                    </div>
                    <div className="bg-[#222121] relative p-2 top-2.5 rounded-md h-30 w-30 text-center" id='day-2'>
                      {day2Temp}
                      <div>
                        {day2WeatherState}
                      </div>
                    </div>  
                    <div className="bg-[#222121] relative p-2 top-2.5 rounded-md h-30 w-30 text-center" id='day-3'>
                      {day3Temp}
                      <div>
                        {day3WeatherState}
                      </div>
                    </div>
                    <div className="bg-[#222121] relative p-2 top-2.5 rounded-md h-30 w-30 text-center " id='day-4'>
                      {day4Temp}
                      <div>
                        {day4WeatherState}
                      </div>
                    </div>
                    <div className="bg-[#222121] relative p-2 top-2.5 rounded-md h-30 w-30 text-center" id='day-5'>
                      {day5Temp}
                      <div>
                        {day5WeatherState}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div id='right-container'>
          <form action="get-city-info" onSubmit={onSubmit} className='flex gap-5 ml-5 mt-5'>
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