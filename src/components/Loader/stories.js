/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Loader from './';

storiesOf('components/Loader', module).add('base', () => <Loader />);
