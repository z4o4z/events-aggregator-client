import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Animated, RefreshControl } from 'react-native';

import { IMAGE_RATIO, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants';
import { springAnimation } from '../../helpers';

import storage, { getEventsKey } from '../../services/storage';

import { colorPrimary } from '../../styles';

import Loader from '../../components/Loader';

import Item from './components/Item';
import Header from './components/Header';
import Filters from './components/Filters';

import { Scroll, Background, FooterLoader } from './styles';

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    events: [],
    search: '',
    loading: false,
    nextPage: null,
    startDate: null,
    finishDate: null,
    itemHeight: WINDOW_WIDTH * IMAGE_RATIO,
    refreshing: false,
    filterOpened: false,
    windowHeight: WINDOW_HEIGHT,
    animatedScrollY: new Animated.Value(0),
    filterOpenedAnimatedValue: new Animated.Value(0),
  };

  componentDidMount() {
    this.onFetchAndSetInitialEvents();
  }

  onToggleFilter = () => {
    const { filterOpened, filterOpenedAnimatedValue } = this.state;

    this.setState({ filterOpened: !filterOpened }, () =>
      springAnimation(filterOpenedAnimatedValue, { toValue: filterOpened ? 0 : 1 })
    );
  };

  onEndReached = async () => {
    const { search, loading, refreshing, nextPage, startDate, finishDate } = this.state;

    if (loading || refreshing || nextPage === null) {
      return;
    }

    this.setState({ loading: true });

    const data = await storage.load({
      id: 'do-not-save',
      key: getEventsKey(search, startDate, finishDate),
      syncParams: { search, startDate, finishDate },
    });

    this.setState(() => ({
      events: data.events,
      loading: false,
      nextPage: data.nextPage,
    }));
  };

  onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: this.state.animatedScrollY } } }],
    { useNativeDriver: true }
  );

  onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    const itemHeight = width * IMAGE_RATIO;

    this.setState({
      itemHeight,
      windowHeight: height,
    });
  };

  onGetItemLayout = (_, index) => {
    const { itemHeight } = this.state;

    return { length: itemHeight, offset: itemHeight * index, index };
  };

  onRefresh = () => {
    this.setState({ refreshing: true });

    this.onFetchAndSetInitialEvents(true);
  };

  onItemPress = id => {
    const { navigation } = this.props;

    const item = this.state.events.find(event => event._id === id);

    navigation.navigate('Event', {
      id,
      src: item.hero_image_url,
      title: item.title,
      address: item.address,
      startDate: item.start_date,
      finishDate: item.finish_date,
    });
  };

  onSearch = search => {
    this.setState({ search }, this.onRefresh);
  };

  onChangeStartDate = async startDate => {
    this.setState({ startDate }, this.onRefresh);
  };

  onChangeFinishDate = finishDate => {
    this.setState({ finishDate }, this.onRefresh);
  };

  onFetchAndSetInitialEvents = async refresh => {
    const { search, startDate, finishDate } = this.state;

    try {
      const { events, nextPage } = await storage.load({
        id: refresh ? 'do-not-save' : undefined,
        key: getEventsKey(search, startDate, finishDate),
        syncParams: { search, refresh, startDate, finishDate },
      });

      // console.log(events);

      this.setState({
        events,
        nextPage,
        refreshing: false,
      });
    } catch (err) {
      Alert.alert('Ууупс, ошибка при загрузке ивентов', 'Попробовать ещё раз?', [
        { text: 'Нет' },
        { text: 'Да', onPress: this.onFetchAndSetInitialEvents },
      ]);
    }
  };

  getRefreshControl() {
    const { refreshing } = this.state;

    return (
      <RefreshControl
        colors={[colorPrimary]}
        tintColor={colorPrimary}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
      />
    );
  }

  getFooter() {
    const { nextPage } = this.state;

    if (nextPage === null) {
      return null;
    }

    return <FooterLoader />;
  }

  getHeader() {
    const { animatedScrollY, filterOpenedAnimatedValue } = this.state;

    return (
      <Header
        onSearch={this.onSearch}
        onToggleFilter={this.onToggleFilter}
        animatedScrollY={animatedScrollY}
        filterOpenedAnimatedValue={filterOpenedAnimatedValue}
      />
    );
  }

  keyExtractor = item => item._id;

  itemRenderer = ({ item, index }) => {
    const { itemHeight, windowHeight, animatedScrollY } = this.state;

    return (
      <Item
        id={item._id}
        src={item.hero_image_url}
        index={index}
        title={item.title}
        height={itemHeight}
        onPress={this.onItemPress}
        startDate={item.start_date}
        finishDate={item.finish_date}
        windowHeight={windowHeight}
        animatedScrollY={animatedScrollY}
      />
    );
  };

  render() {
    const { events, filterOpened, filterOpenedAnimatedValue } = this.state;

    return (
      <Background>
        <Scroll
          data={events}
          onScroll={this.onScroll}
          onLayout={this.onLayout}
          renderItem={this.itemRenderer}
          keyExtractor={this.keyExtractor}
          onEndReached={this.onEndReached}
          getItemLayout={this.onGetItemLayout}
          refreshControl={this.getRefreshControl()}
          ListEmptyComponent={Loader}
          ListHeaderComponent={this.getHeader()}
          stickyHeaderIndices={[0]}
          ListFooterComponent={this.getFooter()}
          scrollEventThrottle={16}
          onEndReachedThreshold={1}
        />

        <Filters
          opened={filterOpened}
          onToggle={this.onToggleFilter}
          onChangeStartDate={this.onChangeStartDate}
          onChangeFinishDate={this.onChangeFinishDate}
          openedAnimatedValue={filterOpenedAnimatedValue}
        />
      </Background>
    );
  }
}
