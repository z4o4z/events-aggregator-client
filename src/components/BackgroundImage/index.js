import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledImage } from './styles';

const defaultStyle = {
  width: null,
  height: null,
};

function BackgroundImage({ style, ...selfProps }) {
  return <StyledImage {...selfProps} style={[defaultStyle, style]} />;
}

BackgroundImage.defaultProps = {
  style: null,
};

BackgroundImage.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default styled(BackgroundImage)``;
