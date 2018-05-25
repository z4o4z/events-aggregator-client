import Expo from 'expo';
import styled from 'styled-components';
import { Animated } from 'react-native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { MaterialIcons } from '@expo/vector-icons';

import { backgroundColor } from '../../styles';

import Text from '../../components/Text';

export const Background = styled.View`
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

export const Price = Animated.createAnimatedComponent(Text.extend`
  position: absolute;
  top: 70px;
  right: 15px;
  color: #fff;
  font-size: 16px;
`);

export const Address = Animated.createAnimatedComponent(Text.extend`
  position: absolute;
  bottom: 30px;
  right: 15px;
  color: #fff;
  font-size: 16px;
  text-align: right;
`);

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
  margin: -15px 5px 0 5px;
  background-color: #fff;
  z-index: 2;
`;

export const StyledText = Text.extend`
  color: rgb(51, 51, 51);
  font-size: 12px;
  font-weight: bold;
`;
