import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import { header } from '../../../../styles';

import {
  Input,
  Wrapper,
  IconMore,
  IconClear,
  IconSearch,
  IconMoreButton,
  IconClearButton,
  IconSearchButton,
} from './styles';

export default class Header extends PureComponent {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onToggleFilter: PropTypes.func.isRequired,
    animatedScrollY: PropTypes.instanceOf(Animated.Value).isRequired,
    filterOpenedAnimatedValue: PropTypes.instanceOf(Animated.Value).isRequired,
  };

  state = {
    searchValue: '',
  };

  onClear = () => {
    this.setState({ searchValue: '' }, this.props.onSearch);
  };

  onSearchChange = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;
    const { onSearch, onToggleFilter, animatedScrollY, filterOpenedAnimatedValue } = this.props;

    const wrapperTranslateY = Animated.diffClamp(
      animatedScrollY.interpolate({
        inputRange: [-header.height, 0, header.height],
        outputRange: [0, 0, -header.height],
      }),
      -header.height,
      0
    );

    const moreRotate = filterOpenedAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <Wrapper style={{ transform: [{ translateY: wrapperTranslateY }] }}>
        <Input value={searchValue} onChangeText={this.onSearchChange} />

        <IconClearButton onPress={this.onClear} touchedScale={0.85}>
          <IconClear />
        </IconClearButton>

        <IconSearchButton onPress={() => onSearch(searchValue)} touchedScale={0.85}>
          <IconSearch />
        </IconSearchButton>

        <IconMoreButton onPress={onToggleFilter} touchedScale={0.85}>
          <IconMore style={{ transform: [{ rotate: moreRotate }] }} />
        </IconMoreButton>
      </Wrapper>
    );
  }
}
