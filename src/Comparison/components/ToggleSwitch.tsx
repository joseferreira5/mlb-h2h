import React from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 0.2em;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + span {
    background-color: ${props => props.theme.mainBrand};
  }

  input:focus + span {
    box-shadow: 0 0 1px ${props => props.theme.mainBrand};
  }

  input:checked + span::before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #999999;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

type ToggleSwitchProps = {
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ToggleSwitch({ onToggle }: ToggleSwitchProps) {
  return (
    <Switch>
      <input type="checkbox" onChange={e => onToggle(e)} />
      <Slider></Slider>
    </Switch>
  );
}