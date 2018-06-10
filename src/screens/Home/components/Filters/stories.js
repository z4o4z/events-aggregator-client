/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Animated } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import Filter from './';

storiesOf('screens/Home/Filter', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Filter
      opened={boolean('opened', false)}
      openedAnimatedValue={new Animated.Value(number('openedAnimatedValue', 0))}
    />
  ));
