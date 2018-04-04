/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Animated } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { text, number, withKnobs } from '@storybook/addon-knobs';

import { WINDOW_HEIGHT } from '../../../../constants';

import Item from './';

storiesOf('screens/Home/Item', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Item
      id={text('id', '123')}
      src={text('src', 'https://picsum.photos/600/400?uri=/trening-professional-scrum-master--2?0')}
      index={number('index', 0)}
      title={text('title', 'Тренинг Professional Scrum Master')}
      height={number('height', 300)}
      startTime={text('startTime', '10:00')}
      startDate={text('startDate', '2018-05-07T00:00:00.000Z')}
      finishTime={text('finishTime', '18:00')}
      finishDate={text('finishDate', '2018-05-08T00:00:00.000Z')}
      windowHeight={number('windowHeight', WINDOW_HEIGHT)}
      animatedScrollY={new Animated.Value(0)}
    />
  ));
