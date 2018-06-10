/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Animated } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { number, withKnobs } from '@storybook/addon-knobs';

import Header from './';

storiesOf('screens/Home/Header', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Header
      onSearch={action('onSearch')}
      onToggleFilter={action('onToggleFilter')}
      animatedScrollY={new Animated.Value(number('animatedScrollY', 0))}
      filterOpenedAnimatedValue={new Animated.Value(number('filterOpenedAnimatedValue', 0))}
    />
  ));
