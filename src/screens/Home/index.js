import React, { Component } from 'react';
import { Animated, RefreshControl } from 'react-native';

import { IMAGE_RATIO, DATA_ENDPOINT, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants';
import { colorPrimary } from '../../styles';

import Loader from '../../components/Loader';

import Item from './components/Item';

import { Scroll, FooterLoader } from './styles';

export default class Home extends Component {
  static async fetchEventsByPage(page = 0) {
    const res = await global.fetch(`${DATA_ENDPOINT}/events?page=${page}`);

    return res.json();
  }

  state = {
    events: [],
    loading: false,
    nextPage: null,
    itemHeight: WINDOW_WIDTH * IMAGE_RATIO,
    refreshing: false,
    windowHeight: WINDOW_HEIGHT,
    animatedScrollY: new Animated.Value(0),
  };

  componentDidMount() {
    this.fetchAndSetInialEvents();
  }

  onEndReached = async () => {
    const { loading, refreshing, nextPage } = this.state;

    if (loading || refreshing || nextPage === null) {
      return;
    }

    this.setState({ loading: true });

    const newEvents = await Home.fetchEventsByPage(nextPage);

    this.setState(({ events }) => ({
      events: [...events, ...newEvents],
      loading: false,
      nextPage: newEvents.length === 10 ? nextPage + 1 : null,
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

  onRefresh = async () => {
    this.setState({ refreshing: true });

    await this.fetchAndSetInialEvents();
  };

  onGetFooter() {
    const { nextPage } = this.state;

    if (nextPage === null) {
      return null;
    }

    return <FooterLoader />;
  }

  onGetRefreshControl() {
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

  async fetchAndSetInialEvents() {
    const events = await Home.fetchEventsByPage();

    this.setState({
      events,
      nextPage: 1,
      refreshing: false,
    });
  }

  keyExtractor = item => item._id;

  itemRenderer = ({ item, index }) => {
    const { itemHeight, windowHeight } = this.state;

    return (
      <Item
        id={item._id}
        src={item.hero_image_url}
        index={index}
        title={item.title}
        height={itemHeight}
        onClick={this.onItemClick}
        startTime={item.start_time}
        startDate={item.start_date}
        finishTime={item.finish_time}
        finishDate={item.finish_date}
        windowHeight={windowHeight}
        animatedScrollY={this.state.animatedScrollY}
      />
    );
  };

  render() {
    const { events } = this.state;

    return (
      <Scroll
        data={events}
        onScroll={this.onScroll}
        onLayout={this.onLayout}
        renderItem={this.itemRenderer}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        getItemLayout={this.onGetItemLayout}
        refreshControl={this.onGetRefreshControl()}
        ListEmptyComponent={Loader}
        ListFooterComponent={this.onGetFooter()}
        scrollEventThrottle={16}
        onEndReachedThreshold={1}
      />
    );
  }
}
