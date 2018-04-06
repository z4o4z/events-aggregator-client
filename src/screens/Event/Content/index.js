import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import HTML from 'react-native-render-html';
import PropTypes from 'prop-types';

import { htmlStyles } from '../../../styles';

import BackgroundImage from '../../../components/BackgroundImage';

import {
  Div,
  Iframe,
  Wrapper,
  Paragraph,
  StyledText,
  Blockquote,
  ImageWrapper,
  RemovePadding,
} from './styles';

export default class Content extends PureComponent {
  static propTypes = {
    html: PropTypes.string.isRequired,
  };

  render() {
    const { html } = this.props;

    return (
      <Wrapper>
        <HTML
          html={html}
          renderers={{
            img: htmlAttribs => (
              <RemovePadding>
                <ImageWrapper>
                  <BackgroundImage src={htmlAttribs.src} />
                </ImageWrapper>
              </RemovePadding>
            ),
          }}
        />
      </Wrapper>
    );
  }
}
