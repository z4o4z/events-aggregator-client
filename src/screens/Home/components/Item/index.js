import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import Button from '../../../../components/Button';
import DateTime from '../../../../components/DateTime';
import BackgroundImage from '../../../../components/BackgroundImage';
import BackgroundColor from '../../../../components/BackgroundColor';

import { Title, Header, Footer, Wrapper } from './styles';

const AnimatedBackgroundImage = Animated.createAnimatedComponent(BackgroundImage);

export default function Item(props) {
  const {
    id,
    src,
    title,
    index,
    height,
    onPress,
    startTime,
    startDate,
    finishTime,
    finishDate,
    windowHeight,
    animatedScrollY,
  } = props;

  const translateY = animatedScrollY.interpolate({
    inputRange: [(index - 1) * height, (index + 1) * height + windowHeight],
    outputRange: [-30, 30],
    extrapolate: 'clamp',
  });

  return (
    <Button onPress={() => onPress(id)}>
      <Wrapper height={height} innerRef={this.onRef} onLayout={this.onLayout}>
        <AnimatedBackgroundImage
          src={src}
          style={{ transform: [{ translateY }, { scale: 1.4 }] }}
        />
        <BackgroundColor color="rgba(93, 83, 73, 0.5)" />

        <Header>
          <DateTime
            startDate={startDate}
            startTime={startTime}
            finishTime={finishTime}
            finishDate={finishDate}
          />
        </Header>

        <Footer>
          <Title>{title}</Title>
        </Footer>
      </Wrapper>
    </Button>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  startTime: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  finishTime: PropTypes.string,
  finishDate: PropTypes.string.isRequired,
  windowHeight: PropTypes.number.isRequired,
  animatedScrollY: PropTypes.instanceOf(Animated.Value).isRequired,
};

Item.defaultProps = {
  startTime: '',
  finishTime: '',
};
