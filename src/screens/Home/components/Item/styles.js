import styled from 'styled-components';

import { IMAGE_RATIO } from '../../../../constants';
import { backgroundColor } from '../../../../styles';

import Text from '../../../../components/Text';

export const Wrapper = styled.View`
  width: 100%;
  padding-top: ${IMAGE_RATIO * 100}%;
  position: relative;
  background-color: ${backgroundColor};
  overflow: hidden;
`;

export const Header = styled.View`
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
`;

export const Footer = styled.View`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 17px;
`;

export const Title = Text.extend`
  text-align: right;
  font-size: 22px;
  font-weight: bold;
`;
