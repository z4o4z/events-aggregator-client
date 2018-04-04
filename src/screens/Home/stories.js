/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs } from '@storybook/addon-knobs';

import Home from './';

storiesOf('screens/Home', module)
  .addDecorator(withKnobs)
  .add('base', () => <Home />);
