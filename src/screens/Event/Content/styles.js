import styled from 'styled-components';

import { IMAGE_RATIO } from '../../../constants';

import Text from '../../../components/Text';

export const Wrapper = styled.View`
  padding: 20px;
  margin: 0 5px 5px 5px;
  background-color: #fff;
`;

export const Div = styled.View`
  width: 100%;
`;

export const StyledText = Text.extend`
  color: rgb(51, 51, 51);
  font-size: 14px;
`;

export const Paragraph = styled.View`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

export const Blockquote = styled.View`
  padding: 20px;
  margin-bottom: 10px;
  background-color: #eeeeee;
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

export const Iframe = styled.WebView`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
