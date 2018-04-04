import styled from 'styled-components';

export const Background = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: ${({ color }) => color || '#000'};
`;
