/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import Image from '../Image';

import Button from './';

storiesOf('components/Button', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Button
      onPress={action('onPress')}
      disabled={boolean('disabled')}
      touchedScale={number('touchedScale')}
      opacityDisabled={number('opacityDisabled')}
    >
      <Image src="https://picsum.photos/50/50?1" width={50} height={50} radius={50} />
    </Button>
  ));
