import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { IMAGE_RATIO } from '../../constants';

import { StyledImage } from './styles';

function Image(props) {
  const { src, path, width, style, radius, ...selfProps } = props;

  const height = props.height || width * IMAGE_RATIO;

  return (
    <StyledImage
      {...selfProps}
      wdth={width}
      hght={height}
      style={style}
      source={path || { uri: props.src }}
      radius={radius}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  path: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};

Image.defaultProps = {
  src: '',
  path: null,
  style: null,
  width: null,
  height: null,
  radius: null,
};

export default styled(Image)``;
