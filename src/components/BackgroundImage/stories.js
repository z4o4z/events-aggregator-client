/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, object, withKnobs } from '@storybook/addon-knobs';

import BackgroundImage from './';

storiesOf('components/BackgroundImage', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <BackgroundImage
      src={text('url', 'https://picsum.photos/200/400')}
      style={object('style', {})}
    />
  ));
