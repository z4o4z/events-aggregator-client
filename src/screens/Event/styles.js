import Expo from 'expo';
import styled from 'styled-components';
import { Animated } from 'react-native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { MaterialIcons } from '@expo/vector-icons';

import { backgroundColor } from '../../styles';

import Text from '../../components/Text';

export const Bacground = styled.View`
  background-color: ${backgroundColor};
  min-width: 100%;
  min-height: 100%;
`;

export const Scroll = styled(ParallaxScroll).attrs({
  contentContainerStyle: {
    minWidth: '100%',
    minHeight: '100%',
  },
})`
  margin-top: ${Expo.Constants.statusBarHeight}px;
  margin-bottom: -${Expo.Constants.statusBarHeight}px;
  background-color: ${backgroundColor};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

export const IconBack = styled(MaterialIcons).attrs({
  name: 'keyboard-arrow-left',
  size: 32,
  color: 'white',
})`
  top: 3px;
`;

export const HeaderBackground = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${backgroundColor};
`);

export const Foreground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 15px;
  bottom: 30;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: -1;
`;

export const Price = Text.extend`
  position: absolute;
  top: 45px;
  right: 0px;
  color: #fff;
  font-size: 16px;
`;

export const Address = Text.extend`
  color: #fff;
  font-size: 16px;
  text-align: right;
`;
