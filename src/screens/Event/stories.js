/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs } from '@storybook/addon-knobs';

import Event from './';

storiesOf('screens/Event', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Event
      id={text('id', '5ac372515bf284001a96eda9')}
      src={text('src', 'https://picsum.photos/600/400?uri=/trening-professional-scrum-master--2?0')}
      title={text('title', 'Тренинг Professional Scrum Master')}
      startTime={text('startTime', '10:00')}
      startDate={text('startDate', '2018-05-07T00:00:00.000Z')}
      finishTime={text('finishTime', '18:00')}
      finishDate={text('finishDate', '2018-05-08T00:00:00.000Z')}
    />
  ));
