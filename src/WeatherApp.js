// WeatherApp

/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';

import {
  WeatherAPI,
  prettyTime,
} from './utils/weather-api.js';

function WeatherApp() {
  const localStorage = window.localStorage;
  const [weatherApi] = useState(new WeatherAPI('a76a06211fa14de22228d74eda2fa7bc'));

  const [location, setLocation] = useState(localStorage.getItem('location'));
  const [weather, setWeather] = useState(null);

  // Get location from local storage (default is SF)
  if (!location) {
    setLocation('san francisco');
  }

  useEffect(() => {
    weatherApi.getWeatherByCity(location)
    .then( (weatherObj) => {
      setWeather(weatherObj);
    })
    .catch( (err) => console.log(err) );
  }, [location, weatherApi]);

  return (
    <div className="WeatherApp">
      {weather && (
        <div id='results'>
          <h1 id='title'>
            <img className='icon' src={weather.iconUrl}></img>
            <span id='city'>{weather.locationName}, {weather.country}</span>
            <img className='icon' src={weather.iconUrl}></img>
          </h1>
          <p>
            <b>Weather:</b> {weather.weather} ({weather.desc})
          </p>
          <p>
            <b>Temp:</b> {Math.floor(weather.temp)} {weather.tempUnit}
          </p>
          <p>
            <b>Feels Like:</b> {Math.floor(weather.tempFeelsLike)} {weather.tempUnit}
          </p>
          <p>
            <b>Today's Temps:</b> {Math.floor(weather.tempMin)} {weather.tempUnit} - {Math.floor(weather.tempMax)} {weather.tempUnit}
          </p>
          <p>
            <b>Pressure:</b> {weather.pressure} hPa
          </p>
          <p>
            <b>Humidity:</b> {weather.humidity}%
          </p>
          <p>
            <b>Visibility:</b> {(weather.visibility / 1000).toFixed(1)} km
          </p>
          <p>
            {weather.sunrise < new Date() ? (
              <b>Sunrise was at:</b>
            ) : (
              <b>Sunrise is at:</b>
            )} {prettyTime(weather.sunrise)}
          </p>
          <p>
            {weather.sunset < new Date() ? (
              <b>Sunset was at:</b>
            ) : (
              <b>Sunset is at:</b>
            )} {prettyTime(weather.sunset)}
          </p>
          <p>
            <b>Lon, Lat:</b> {weather.lon.toFixed(3)}, {weather.lat.toFixed(3)}
          </p>
          <p>
            <b>Last Updated:</b> {new Date(weather.datetime * 1000).toLocaleDateString([], {weekday: 'short', month: 'short', day: 'numeric'})} at {prettyTime(weather.datetime)}
          </p>
        </div>
      )}


      <form className='form' id='cityForm' onSubmit={(e) => {
        e.preventDefault();
        const city = e.target.elements.cityInput.value;

        weatherApi.getWeatherByCity(city)
        .then( (weatherObj) => {
          setWeather(weatherObj);
          localStorage.setItem('location', weatherObj.locationName);
          setLocation(localStorage.getItem('location'));
          e.target.elements.cityInput.value = '';
        })
        .catch( (err) => console.log(err) )}
        }>
        <input 
          name='cityInput' 
          type='text' 
          placeholder='City, State, Country'
          title='Please enter a valid city'
        />
        <button type='submit'>Search</button>
      </form>
      <form className='form' id='zipForm' onSubmit={(e) => {
        e.preventDefault();
        const zipCode = e.target.elements.zipInput.value;

        weatherApi.getWeatherByZip(zipCode)
        .then( (weatherObj) => {
          setWeather(weatherObj);
          localStorage.setItem('location', weatherObj.locationName);
          setLocation(localStorage.getItem('location'));
          e.target.elements.zipInput.value = '';
        })
        .catch( (err) => console.log(err) )}
        }>
        <input 
          name='zipInput' 
          type='number' 
          placeholder='Zip Code'
          title='Please enter a valid Zip Code'
          pattern='^\d{5}(?:[-\s]\d{4})?$'
        />
        <button type='submit'>Search</button>
      </form>
      <form className='form' id='coordsForm' onSubmit={(e) => {
        e.preventDefault();
        const coords = e.target.elements.coordsInput.value;

        weatherApi.getWeatherByZip(coords)
        .then( (weatherObj) => {
          setWeather(weatherObj);
          localStorage.setItem('location', weatherObj.locationName);
          setLocation(localStorage.getItem('location'));
          e.target.elements.coordsInput.value = '';
        })
        .catch( (err) => console.log(err) )}
        }>
        <input 
          name='coordsInput' 
          type='text' 
          placeholder='Lon, Lat'
          title='Please enter a valid longitude, latitude pair'
          pattern='^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$'
        />
        <button type='submit'>Search</button>
      </form>
      <form className='form' id='cityIdForm' onSubmit={(e) => {
        e.preventDefault();
        const cityId = e.target.elements.cityIdInput.value;

        weatherApi.getWeatherById(cityId)
        .then( (weatherObj) => {
          setWeather(weatherObj);
          localStorage.setItem('location', weatherObj.locationName);
          setLocation(localStorage.getItem('location'));
          e.target.elements.cityIdInput.value = '';
        })
        .catch( (err) => console.log(err) )}
        }>
        <input 
          name='cityIdInput' 
          type='number' 
          placeholder='City Id'
          title='Please enter a valid City Id'
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default WeatherApp;
