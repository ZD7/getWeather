import React from "react";
import styled from "styled-components";

const WeatherNow = ({ dataWeather }) => {
  const sunrise = new Date(dataWeather.sys.sunrise * 1000).toLocaleString();
  const sunset = new Date(dataWeather.sys.sunset * 1000).toLocaleString();
  console.log("dataWeather.weather[0].icon", dataWeather.weather[0].icon);

  return (
    <Wrapper>
      <Block>
        <div>
          Сейчас {(dataWeather.main.temp - 273.15).toPrecision(2)} °C
        </div>
        <img
          src={`http://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png`}
          alt={dataWeather.weather[0].description}
        />
      </Block>
      <Block>
        <div>
          Ощущается как {(dataWeather.main.feels_like - 273.15).toPrecision(2)}{" "}
          °C
        </div>
        <div>{dataWeather.weather[0].description}</div>
        <div>Влажность {dataWeather.main.humidity} %</div>
        <div>Облачность {dataWeather.clouds.all} %</div>
        <div>Скорость ветра {dataWeather.wind.speed} м/с</div>
        <div>
          Давление {(dataWeather.main.pressure * 0.75).toPrecision(3)} мм рт.
          ст.
        </div>
        <div>Время восхода солнца {sunrise.slice(12, 20)}</div>
        <div>Время заката {sunset.slice(12, 20)}</div>
      </Block>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #a18a8a;
  margin: 50px;
  padding: 50px;
  border-radius: 10px;

  img {
    width: 500px;
    height: 500px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default WeatherNow;
