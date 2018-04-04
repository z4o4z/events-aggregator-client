import { Platform, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const IMAGE_RATIO = 9 / 16;

export const WINDOW_WIDTH = window.width;
export const WINDOW_HEIGHT = window.height;
