/* eslint-disable global-require */

export default (process.env.REACT_NATIVE_STORYBOOK
  ? require('./storybook').default
  : require('./src').default);
