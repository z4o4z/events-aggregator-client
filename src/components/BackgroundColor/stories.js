/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { object, withKnobs } from '@storybook/addon-knobs';

import BackgroundColor from './';

storiesOf('components/BackgroundColor', module)
  .addDecorator(withKnobs)
  .add('base', () => <BackgroundColor style={object('style', {})} />);
