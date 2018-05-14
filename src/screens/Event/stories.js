/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs } from '@storybook/addon-knobs';

import Event from './';

storiesOf('screens/Event', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Event
      navigation={{
        state: {
          params: {
            id: text('id', '5af45b0999c724001a6757f9'),
            src: text(
              'src',
              'https://picsum.photos/600/400?uri=/trening-professional-scrum-master--2?0'
            ),
            title: text('title', 'Тренинг Professional Scrum Master'),
            address: text('address', 'Минск.'),
            startTime: text('startTime', '10:00'),
            startDate: text('startDate', '2018-05-07T00:00:00.000Z'),
            finishTime: text('finishTime', '18:00'),
            finishDate: text('finishDate', '2018-05-08T00:00:00.000Z'),
          },
        },
        goBack: linkTo('screens/Home', 'base'),
      }}
    />
  ));
