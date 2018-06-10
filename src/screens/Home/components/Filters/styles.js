import styled from 'styled-components';
import { Animated } from 'react-native';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../../../../components/Button';

import { header, filter, colorPrimary } from '../../../../styles';

export const Wrapper = styled.View`
  position: absolute;
  top: ${header.height + Constants.statusBarHeight}px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const FiltersWrapper = Animated.createAnimatedComponent(styled.View`
  width: 100%;
  padding: 0 9px 20px 20px;
  height: ${filter.height}px;
  position: relative;
  overflow: hidden;
  background-color: ${filter.backgroundColor};
  z-index: 1;
`);

export const Overlay = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(93, 83, 73, 0.7);
`);

export const FilterRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const FilterButton = Button.extend`
  flex: 1;
  padding: 10px;
  background-color: ${colorPrimary};
`;

export const IconClear = styled(MaterialCommunityIcons).attrs({
  name: 'close',
  size: 28,
  color: '#fff',
})`
  padding: 3px;
  margin-top: 3px;
  margin-left: 6px;
`;
