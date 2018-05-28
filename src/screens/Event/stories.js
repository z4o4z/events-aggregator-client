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
            id: text('id', '5b0c13a146ea47001ada9c56'),
            src: text(
              'src',
              'https://picsum.photos/600/400?uri=/trening-professional-scrum-master--2?0'
            ),
            title: text('title', 'Обучение английскому в онлайн-школе Skyeng'),
            address: text('address', 'Минск.'),
            startDate: text('startDate', '2018-04-30T21:00:00.000Z'),
            finishDate: text('finishDate', '2018-05-30T21:00:00.000Z'),
          },
        },
        goBack: linkTo('screens/Home', 'base'),
      }}
    />
  ));
