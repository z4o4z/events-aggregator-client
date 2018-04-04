/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, number, object } from '@storybook/addon-knobs';

import Image from './';

storiesOf('components/Image', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Image
      src={text('url', 'https://picsum.photos/200/200?1')}
      style={object('style', {})}
      width={number('width', 300)}
      height={number('height', 200)}
      radius={number('radius', 0)}
    />
  ));
