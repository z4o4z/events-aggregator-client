/* eslint-disable global-require */
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default (process.env.REACT_NATIVE_STORYBOOK
  ? require('./storybook').default
  : require('./src').default);
