import React, { useState } from "react";
import styled from "styled-components";


const Header = ({ getWeather, changeCity}) => {
  const [value, setValue] = useState("");
  
  const onChange = (e) => {
    setValue(e.currentTarget.value);
    changeCity(e);
  };

  const onClick = (e) => {
    getWeather(e)
    setValue("");
  };

  return (
    <Block>
      <input
        id="city"
        value={value}
        onChange={onChange}
        placeholder=" название города..."
      />
      <button id="btn_send1" onClick={onClick} value="weather">
        погода сейчас
      </button>
      <button id="btn_send2" onClick={onClick} value="forecast">
        прогноз погоды на 5 дней
      </button>
    </Block>
  );
};

const Block = styled.div`
  display: flex;
  gap: 10px;
`;

export default Header;
