/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs } from '@storybook/addon-knobs';

import DateTime from './';

storiesOf('components/DateTime', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgb(51, 51, 51)',
      }}
    >
      <DateTime
        startTime={text('startTime', '10:00')}
        startDate={text('startDate', '2018-05-07T00:00:00.000Z')}
        finishTime={text('finishTime', '18:00')}
        finishDate={text('finishDate', '2018-05-08T00:00:00.000Z')}
      />
    </View>
  ));
