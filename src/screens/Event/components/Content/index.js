import React, { PureComponent } from 'react';
import HTML from 'react-native-render-html';
import PropTypes from 'prop-types';
import { MapView } from 'expo';

import Loader from '../../../../components/Loader';

import { html } from '../../../../styles';
import { TEXT_TAGS_HASH, MIXED_TAGS_HASH } from '../../../../constants';

import BackgroundImage from '../../../../components/BackgroundImage';

import { Title, Wrapper, ImageWrapper, RemovePadding } from './styles';

export default class Content extends PureComponent {
  static propTypes = {
    geo: PropTypes.shape({
      latitude: PropTypes.string,
      longitude: PropTypes.string,
    }).isRequired,
    html: PropTypes.string,
    title: PropTypes.string.isRequired,
    onOpenLink: PropTypes.func.isRequired,
  };

  static defaultProps = {
    html: '',
  };

  static childrenAreTextTags = children =>
    children.every(
      node =>
        TEXT_TAGS_HASH[node.name] ||
        (MIXED_TAGS_HASH[node.name] && Content.childrenAreTextTags(node.children))
    );

  onAlterChildren = node => {
    const nodeChildren = [];

    if (TEXT_TAGS_HASH[node.name] && !Content.childrenAreTextTags(node.children)) {
      let child = node.children[0];

      let children = [];

      let wrapperNode = {
        name: 'p',
        type: 'tag',
        next: null,
        prev: null,
        parent: node,
        attribs: {},
        children,
      };

      nodeChildren[nodeChildren.length] = wrapperNode;

      while (child !== null) {
        if (
          TEXT_TAGS_HASH[child.name] ||
          (MIXED_TAGS_HASH[child.name] && Content.childrenAreTextTags(child.children))
        ) {
          children[children.length] = child;
          child.parent = wrapperNode;
          child = child.next;
        } else {
          wrapperNode.next = child;

          nodeChildren[nodeChildren.length] = child;

          children = [];

          wrapperNode = {
            name: 'p',
            type: 'tag',
            next: null,
            prev: child,
            parent: node,
            attribs: {},
            children,
          };

          const newChild = child.next;

          child.next = wrapperNode;
          child = newChild;

          nodeChildren[nodeChildren.length] = wrapperNode;
        }
      }

      return nodeChildren;
    }

    return undefined;
  };

  renderers = {
    img: (attribs, children, cssStyles, { key }) => (
      <RemovePadding key={key}>
        <ImageWrapper>
          <BackgroundImage src={attribs.src} />
        </ImageWrapper>
      </RemovePadding>
    ),
  };

  render() {
    const { geo, title, html: htmlContent, onOpenLink } = this.props;
    const coordinate = {
      latitude: parseFloat(geo.latitude),
      longitude: parseFloat(geo.longitude),
    };

    return (
      <Wrapper>
        <Title>{title}</Title>

        {htmlContent ? (
          <HTML
            html={this.props.html}
            renderers={this.renderers}
            tagsStyles={html.tags}
            onLinkPress={(_, href) => onOpenLink(href)}
            alterChildren={this.onAlterChildren}
            baseFontStyle={html.baseFont}
            allowedStyles={[]}
          />
        ) : (
          <RemovePadding large>
            <ImageWrapper>
              <Loader />
            </ImageWrapper>
          </RemovePadding>
        )}

        {!!geo.latitude &&
          !!geo.longitude && (
            <RemovePadding large>
              <ImageWrapper>
                <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                    ...coordinate,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034,
                  }}
                >
                  <MapView.Marker coordinate={coordinate} />
                </MapView>
              </ImageWrapper>
            </RemovePadding>
          )}
      </Wrapper>
    );
  }
}
