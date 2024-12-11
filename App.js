import React, { useState } from "react";
const api ={
  key:"970a9b8b5802fb46ad1a872e12d4bc0e",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key == "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result);
        console.log(result);
      });
    }
  }
  const dateBuilder = (d) => {
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
       ? ((weather.main.temp > 16)
        ? 'app warm'
         : 'app') 
        : 'app' }>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
        onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}
          {weather.sys.country && (
            <img
              src={`https://flagcdn.com/w40/${weather.sys.country.toLowerCase()}.png`}
              alt={`${weather.sys.country} flag`}
              style={{ marginLeft: '10px', height: '20px', verticalAlign: 'middle' }}
            />
          )}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
