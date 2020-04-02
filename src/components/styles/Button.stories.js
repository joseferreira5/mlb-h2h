import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';

const theme = {
  lightShade: '#D4D7DE',
  lightAccent: '#654BBF',
  mainBrand: '#4960C8',
  darkAccent: '#5A389D',
  darkShade: '#181C43',
  bigStone: '#181c43',
  fruitSalad: '#4b9774',
  rawSienna: '#c8873c',
  pomegranate: '#f44336'
};

const fontStyle = {
  color: theme.lightShade
};

storiesOf('Button', module).add('Primary', () => (
  <Button backgroundColor={theme.mainBrand} style={fontStyle}>
    Primary
  </Button>
));

storiesOf('Button', module).add('Info', () => (
  <Button backgroundColor={theme.bigStone} style={fontStyle}>
    Info
  </Button>
));

storiesOf('Button', module).add('Success', () => (
  <Button backgroundColor={theme.fruitSalad} style={fontStyle}>
    Success
  </Button>
));

storiesOf('Button', module).add('Warning', () => (
  <Button backgroundColor={theme.rawSienna} style={fontStyle}>
    Warning
  </Button>
));

storiesOf('Button', module).add('Danger', () => (
  <Button backgroundColor={theme.pomegranate} style={fontStyle}>
    Danger
  </Button>
));
