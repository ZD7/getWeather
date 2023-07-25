import React, { useMemo }  from "react";
import styled from "styled-components";
import DailyForecast from "./daily_forecast";

const WeatherForecast = ({ dataWeather }) => {
  // let newDay = dataWeather.list[0].dt_txt.slice(8, 10);
  // let arrayDays = [];
  // let arrayDay = [];
  // dataWeather.list.map((data, i) => {
  //   if (data.dt_txt.slice(8, 10) === newDay) {
  //     arrayDay.push(data);
  //   } else {
  //     arrayDays.push(arrayDay);
  //     arrayDay = [];
  //     newDay = data.dt_txt.slice(8, 10);
  //     arrayDay.push(data);
  //   }
  //   if (i === dataWeather.list.length - 1) {
  //     arrayDays.push(arrayDay);
  //   }
  // });

  const arrayDays = useMemo(() => {
    return dataWeather.list.reduce((acc, data) => {
      const day = data.dt_txt.slice(8, 10);
      const time = data.dt_txt.slice(11, 16);
      const lastDayArray = acc[acc.length - 1];
      if (lastDayArray && lastDayArray[0]?.day === day) {
        lastDayArray.push({ ...data, time });
      } else {
        acc.push([{ ...data, time, day}]);
        console.log("else", [{ ...data, time, day }])
      }
      return acc;
    }, []);
  }, [dataWeather.list]);

  console.log("arrayDays", arrayDays)
  return (
    <Wrapper>
      <TimeLabel>
        {arrayDays[2].map((dataWeather, i) => (
          <div key={i}>{dataWeather.dt_txt.slice(11, 16)}</div>
        ))}
      </TimeLabel>
      {arrayDays.map((dataWeather, i) => (
        <DailyForecast dataWeather={dataWeather} key={i} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  /* flex: 0 0 auto; */
  flex-direction: column;
  gap: 10px;

  .cont:nth-child(2) .cont1:nth-child(2) {
    justify-content: flex-end;
  }

  .cont:last-child .cont1:last-child {
    justify-content: flex-start;
  }
`;

const TimeLabel = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 5px;
  padding-left: 120px;
`;

export default WeatherForecast;
