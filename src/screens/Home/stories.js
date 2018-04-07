/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

import Home from './';

storiesOf('screens/Home', module).add('base', () => (
  <Home
    navigation={{
      navigate: action('navigate'),
    }}
  />
));
