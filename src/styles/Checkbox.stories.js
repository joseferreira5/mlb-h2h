import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './Checkbox';

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

const checkedStyle = {
  backgroundColor: theme.mainBrand
};

storiesOf('Checkbox', module).add('Unchecked', () => (
  <Checkbox style={checkedStyle} />
));

storiesOf('Checkbox', module).add('Checked', () => (
  <Checkbox style={checkedStyle} defaultChecked />
));
