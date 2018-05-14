import Expo from 'expo';
import styled from 'styled-components';
import { Animated, FlatList } from 'react-native';

import { backgroundColor } from '../../styles';

import Loader from '../../components/Loader';

export const Background = styled.View`
  background-color: ${backgroundColor};
  min-width: 100%;
  min-height: 100%;
`;

export const Scroll = styled(Animated.createAnimatedComponent(FlatList)).attrs({
  contentContainerStyle: {
    minWidth: '100%',
    minHeight: '100%',
  },
})`
  margin-top: ${Expo.Constants.statusBarHeight}px;
`;

export const FooterLoader = Loader.extend`
  height: 100px;
`;
