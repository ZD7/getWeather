import React from "react";
const WeatherNow = ({ dataWeather }) => {
  const sunrise = new Date(dataWeather.sys.sunrise * 1000).toLocaleString();
  const sunset = new Date(dataWeather.sys.sunset * 1000).toLocaleString();

  return (
    <div>
      <div>{`Название города: ${dataWeather.name}`}</div>
      <div>{dataWeather.weather[0].description}</div>
      <div>Время восхода солнца {sunrise}</div>
      <div>Время заката {sunset}</div>
      <div>Облачность {dataWeather.clouds.all} %</div>
      <div>Скорость ветра {dataWeather.wind.speed} м/с</div>
      <div>Давление {(dataWeather.main.pressure * 0.75).toPrecision(3)} мм рт. ст.</div>
      <div>
        Температура {(dataWeather.main.temp - 273.15).toPrecision(3)} °C
      </div>
      <div>
        Ощущается как {(dataWeather.main.feels_like - 273.15).toPrecision(3)} °C
      </div>
      <div>Влажность {dataWeather.main.humidity} %</div>
      <img src={`http://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png`} alt={dataWeather.weather[0].description}/>
      <div className="chat_output"></div>
    </div>
  );
};

export default WeatherNow;
