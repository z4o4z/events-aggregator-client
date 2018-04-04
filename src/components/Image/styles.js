import styled from 'styled-components';

import { borderRadius } from '../../styles/helpers';

export const StyledImage = styled.Image`
  ${({ radius }) => borderRadius(radius)};
  ${({ wdth }) => (wdth ? `width: ${wdth}px;` : '')};
  ${({ hght }) => (hght ? `height: ${hght}px;` : '')};

  background-color: transparent;
`;
