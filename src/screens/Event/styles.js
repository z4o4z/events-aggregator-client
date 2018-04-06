import styled from 'styled-components';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import { backgroundColor } from '../../styles';

export const Scroll = styled(ParallaxScroll).attrs({
  contentContainerStyle: {
    minWidth: '100%',
    minHeight: '100%',
  },
})`
  background-color: ${backgroundColor};
`;

export const Header = styled.View`
  padding: 20px;
`;
