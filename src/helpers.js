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

export async function fetch(url, { json = true, headers = {}, ...options } = {}) {
  const jsonHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  const resHeaders = {
    ...headers,
    ...(json ? jsonHeaders : {}),
  };

  const res = await global.fetch(url, { ...options, headers: resHeaders });

  let data = {};
  let err;
  let text;

  try {
    text = await res.text();
    data = JSON.parse(text);
  } catch (e) {
    err = e;
  }

  if (res.status >= 400 || err) {
    const error = {
      status: res.status,
      message: text,
      ...data,
    };

    throw error;
  }

  return data;
}
