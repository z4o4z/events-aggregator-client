import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator } from 'react-native';

import { colorPrimary } from '../../styles';

import { Wrapper } from './styles';

function Loader(props) {
  return (
    <Wrapper {...props}>
      <ActivityIndicator size="large" color={colorPrimary} />
    </Wrapper>
  );
}

export default styled(Loader)``;
