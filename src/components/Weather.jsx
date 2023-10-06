import React, { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("durgapur");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const api_key = "your-api-key";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setCity("");
  };

  useEffect(() => {
    fetchData();
    console.log(data);
    setCity("");
  }, []);

  return (
    <div className="container">
      <div className="information">
        <h1>Openweather </h1>
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            placeholder="search city"
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
        {data && (
          <div>
            <div className="location">
              <p>{data.name}</p>
              {/* <span>{data.dt * 1000}</span> */}
            </div>
            <div className="temp">
              <div className="current-temp">
                <img
                  src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt=""
                />
                <h2>{Math.ceil(data.main.temp)}°</h2>
              </div>
              <div className="feels-like">
                <span>
                  {Math.ceil(data.main.temp_min)}°/
                  {Math.ceil(data.main.temp_max)}°
                </span>
                <span>Feels Like {Math.ceil(data.main.feels_like)}°</span>
                <span>{data.weather[0].main}</span>
                <span>Wind: {Math.ceil(data.wind.speed * 1.6)} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
