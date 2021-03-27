import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';
import theme from './theme';

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
