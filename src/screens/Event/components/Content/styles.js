import styled from 'styled-components';

import { IMAGE_RATIO } from '../../../../constants';

import Text from '../../../../components/Text';

export const Wrapper = styled.View`
  padding: 20px;
  margin: -15px 5px 5px 5px;
  background-color: #fff;
  z-index: 2;
`;

export const Title = Text.extend`
  margin-bottom: 15px;
  color: rgb(51, 51, 51);
  font-size: 24px;
  font-weight: bold;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const WebLink = Text.extend`
  color: rgb(51, 51, 51);
  font-size: 12px;
  font-weight: bold;
`;

export const Share = WebLink.extend`
  text-align: right;
`;

export const RemovePadding = styled.View`
  padding-left: 100%;
  padding-right: 20px;
  padding-top: ${100 * IMAGE_RATIO}%;
`;

export const ImageWrapper = styled.View`
  position: absolute;
  top: 0;
  left: -20px;
  right: 0;
  bottom: 0;
`;
