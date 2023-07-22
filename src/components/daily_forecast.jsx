import React from "react";
import styled from "styled-components";

const DailyForecast = ({ dataWeather }) => {
  return (
    <Wrapper className="cont">
      <div>{dataWeather[0].dt_txt.slice(8, 10)}</div>
      <Container className="cont1">
        {dataWeather.map((data, i) => (
          <Item key={i}>
            <Block>
              <div>
                <span>{(data.main.temp - 273.15).toPrecision(2)} °C</span>
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt={data.weather[0].description}
                />
              </div>
            </Block>
            <Block>
              <div>
                Ощущается как {(data.main.feels_like - 273.15).toPrecision(2)}{" "}
                °C
              </div>
              <div>{data.weather[0].description}</div>
              <div>Влажность {data.main.humidity} %</div>
              <div>Облачность {data.clouds.all} %</div>
              <div>Скорость ветра {data.wind.speed.toPrecision(1)} м/с</div>
              <div>
                Давление {(data.main.pressure * 0.75).toPrecision(3)} мм рт.ст.
              </div>
            </Block>
          </Item>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 1280px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  span {
    font-size: 18px;
  }
`;

const Item = styled.div`
  display: flex;
  width: 150px;
  height: 100px;
  margin-top: 0px;
  padding-top: 0px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #a18a8a;
  border-radius: 5px;
  font-size: 9px;
`;

export default DailyForecast;
