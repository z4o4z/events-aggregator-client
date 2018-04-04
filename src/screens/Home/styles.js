import styled from 'styled-components';
import { Animated, FlatList } from 'react-native';

import { backgroundColor } from '../../styles';

import Loader from '../../components/Loader';

export const Scroll = styled(Animated.createAnimatedComponent(FlatList)).attrs({
  contentContainerStyle: {
    minWidth: '100%',
    minHeight: '100%',
  },
})`
  background-color: ${backgroundColor};
`;

export const FooterLoader = Loader.extend`
  height: 100px;
`;
