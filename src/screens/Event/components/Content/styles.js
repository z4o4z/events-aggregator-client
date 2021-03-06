import styled from 'styled-components';

import { IMAGE_RATIO } from '../../../../constants';

import Text from '../../../../components/Text';

export const Wrapper = styled.View`
  padding: 20px;
  margin: 0 5px 5px 5px;
  background-color: #fff;
  z-index: 2;
`;

export const Title = Text.extend`
  margin-bottom: 15px;
  color: rgb(51, 51, 51);
  font-size: 24px;
  font-weight: bold;
`;

export const RemovePadding = styled.View`
  padding-left: 100%;
  padding-right: 20px;
  padding-top: ${({ large }) => 100 * IMAGE_RATIO * (large ? 1.5 : 1)}%;
`;

export const ImageWrapper = styled.View`
  position: absolute;
  top: 0;
  left: -20px;
  right: 0;
  bottom: 0;
`;
