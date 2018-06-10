import styled from 'styled-components';
import { Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { header } from '../../../../styles';

import Button from '../../../../components/Button';

export const Wrapper = Animated.createAnimatedComponent(styled.View`
  width: 100%;
  padding: 16px 10px 0 20px;
  flex-direction: row;
  height: ${header.height}px;
  position: relative;
  background-color: ${header.backgroundColor};
`);

export const Input = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
})`
  flex: 1;
  height: 30px;
  padding: 5px 30px;
  color: rgb(51, 51, 51);
  background-color: #fff;
  font-size: 16px;
`;

export const IconClearButton = Button.extend`
  position: absolute;
  top: 17px;
  left: 20px;
`;

export const IconSearchButton = Button.extend`
  position: absolute;
  top: 17px;
  right: 50px;
`;

export const IconMoreButton = Button.extend`
  width: 34px;
  height: 32px;
  margin-left: 5px;
  margin-top: -2px;
`;

export const IconClear = styled(MaterialCommunityIcons).attrs({
  name: 'close',
  size: 24,
  color: 'rgb(51, 51, 51)',
})`
  padding: 3px;
`;

export const IconSearch = styled(MaterialCommunityIcons).attrs({
  name: 'magnify',
  size: 24,
  color: 'rgb(51, 51, 51)',
})`
  padding: 3px;
`;

export const IconMore = Animated.createAnimatedComponent(
  styled(MaterialCommunityIcons).attrs({
    name: 'chevron-down',
    size: 34,
    color: '#fff',
  })``
);
