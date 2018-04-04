import { Animated } from 'react-native';

export function springAnimation(value, options) {
  const { toValue, tension, friction, autoplay = true, useNativeDriver = true } = options;

  const animated = Animated.spring(value, {
    toValue,
    tension,
    friction,
    useNativeDriver,
  });

  if (autoplay) {
    animated.start();
  }

  return animated;
}
