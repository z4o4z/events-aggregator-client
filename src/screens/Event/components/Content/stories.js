/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { text, withKnobs } from '@storybook/addon-knobs';

import Content from './';

storiesOf('screens/Event/Content', module)
  .addDecorator(withKnobs)
  .add('base', () => (
    <Content
      html={text('html', '<p>some content</p>')}
      title={text('title', 'Тренинг Professional Scrum Master')}
      onShare={action('onShare')}
      onOpenLink={action('onOpenLink')}
      onOpenInBrowser={action('onOpenInBrowser')}
    />
  ));
