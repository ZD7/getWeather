import styled from "styled-components";
import React, { useState } from "react";
import "./css/App.css";
import WeatherNow from "./components/weather_now";
// import dataWeather from "./data/weather.json";
// import dataForecast from "./data/forecast.json";
import WeatherForecast from "./components/weather_forecast";
import Header from "./components/header";

let isCity;

function App() {
  const [isData, setIsData] = useState("");

  const changeCity = (e) => {
    isCity = "q=" + e.target.value;
  };

  function getCityInfo(isData) {
    if (isData.cod === "400" || isData === "") {
      return "Введите название города";
    } else if (isData.cod === "404") {
      return "Город не найден, введите название еще раз";
    } else if (isData.hasOwnProperty("city")) {
      return isData.city.name;
    } else {
      return isData.name;
    }
  }

  const getPosition = () => {
    if (!navigator.geolocation) {
      alert("Geolocation не поддерживается вашим браузером");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  // Функция, выводящая текст об ошибке
  const error = () => {
    alert(
      "Запрещен доступ к геоданным. \nРазрешите доступ к вашему местоположению в браузере."
    );
  };
  // Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    isCity = `lat=${latitude}&lon=${longitude}`;
    document.getElementById("info").innerHTML = "Местоположение установлено";
  };

  const getWeather = (e) => {
    let timeInterval = e.target.value;

    return fetch(
      `https://api.openweathermap.org/data/2.5/${timeInterval}?${isCity}&appid=af229f75cd4e43435db57879af083d2c&lang=ru`
    )
      .then((response) => {
        // Объект ответа на запрос
        // Превращаем объект в JSON. Мы не можем его сразу прочитать,
        // надо отдать в следующий then
        const result = response.json();
        return result;
      })
      .then((data) => {
        setIsData(data);
        // Объект результата в формате JSON
      })
      .catch(() => {
        alert("Ошибка получения данных о погоде, попробуйте еще раз");
      });
  };

  return (
    <Wrapper className="App">
      <Container>
        <Header getWeather={getWeather} changeCity={changeCity} />

        <div id="info">{getCityInfo(isData)}</div>
        <button className="chat_output" onClick={getPosition}>
          Геолокация
        </button>
      </Container>
      {isData.cod === "200" && isData.hasOwnProperty("list") ? (
        <WeatherForecast dataWeather={isData} />
      ) : isData.cod === 200 ? (
        <WeatherNow dataWeather={isData} />
      ) : (
        ""
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  white-space: nowrap;

  button {
    background-color: #a18a8a;
    color: white;
    border-color: #a18a8a;
    border-radius: 4px;
    cursor: pointer;
    border: 0;
    font-size: 20px;
    height: 35px;
  }

  input {
    font-size: 20px;
    border: 0;
    border-radius: 4px;
  }

  #info {
    overflow-x: hidden;
  }
`;

export default App;
