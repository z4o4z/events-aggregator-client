import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { springAnimation } from '../../helpers';

class Button extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    touchedScale: PropTypes.number,
    opacityDisabled: PropTypes.number,
  };

  static defaultProps = {
    style: null,
    children: null,
    disabled: false,
    touchedScale: 0.95,
    opacityDisabled: 0.8,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.disabled !== this.props.disabled ||
      prevProps.opacityDisabled !== this.props.opacityDisabled
    ) {
      const toValue = this.props.disabled ? this.props.opacityDisabled : 1;

      springAnimation(this.animatedOpacity, { toValue });
    }
  }

  onPressIn = () => {
    springAnimation(this.animatedScale, { toValue: this.props.touchedScale });
  };

  onPressOut = () => {
    springAnimation(this.animatedScale, { toValue: 1 });
  };

  animatedScale = new Animated.Value(1);
  animatedOpacity = new Animated.Value(this.props.disabled ? this.props.opacityDisabled : 1);

  render() {
    const { style, onPress, disabled, children } = this.props;
    const isChildrenSimple = typeof children === 'string' || typeof children === 'number';

    const animatedStyle = {
      opacity: this.animatedOpacity,
      transform: [{ scale: this.animatedScale }],
    };

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        disabled={disabled}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        delayPressOut={100}
      >
        <Animated.View style={[animatedStyle, isChildrenSimple ? {} : style]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default styled(Button)``;
