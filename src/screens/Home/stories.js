/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';

import Home from './';

storiesOf('screens/Home', module).add('base', () => (
  <Home
    navigation={{
      navigate: linkTo('screens/Event', 'base'),
    }}
  />
));
