import styled from "styled-components";
import React, { useState } from "react";
import "./css/App.css";
import WeatherNow from "./components/weather_now";
// import dataWeather from "./data/weather.json";
// import dataForecast from "./data/forecast.json";
import WeatherForecast from "./components/weather_forecast";

function App() {
  const [isData, setIsData] = useState("");
  const [isCity, setIsCity] = useState("");

  const changeCity = (e) => {
    setIsCity("q=" + e.target.value);
  };

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
    setIsCity(`lat=${latitude}&lon=${longitude}`);
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
        document.getElementById("city").value = "";
        // Объект результата в формате JSON
      })
      .catch(() => {
        alert("Ошибка получения данных о погоде, попробуйте еще раз");
      });
  };
  return (
    <Wrapper className="App">
      <Container>
        <Block>
          <input id="city" onChange={changeCity} placeholder="название города"/>
          <button id="btn_send1" onClick={getWeather} value="weather">
            погода сейчас
          </button>
          <button id="btn_send2" onClick={getWeather} value="forecast">
            прогноз погоды на 5 дней
          </button>
        </Block>

        <div id="info">
          {isData.cod === "400" || isData === ""
            ? "Введите название города"
            : isData.cod === "404"
            ? "Город не найден, введите название еще раз"
            : isData.hasOwnProperty("city")
            ? isData.city.name
            : isData.name}
        </div>

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
`;

const Block = styled.div`
  display: flex;
`;

export default App;
