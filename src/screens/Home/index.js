import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Animated, RefreshControl } from 'react-native';

import { IMAGE_RATIO, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants';
import storage from '../../libs/storage';
import { colorPrimary } from '../../styles';

import Loader from '../../components/Loader';

import Item from './components/Item';

import { Scroll, Bacground, FooterLoader } from './styles';

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

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
    this.onFetchAndSetInialEvents();
  }

  onEndReached = async () => {
    const { loading, refreshing, nextPage } = this.state;

    if (loading || refreshing || nextPage === null) {
      return;
    }

    this.setState({ loading: true });

    const data = await storage.load({
      id: 'do-not-save',
      key: 'events',
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

    this.onFetchAndSetInialEvents();
  };

  onItemPress = id => {
    const { navigation } = this.props;

    const item = this.state.events.find(event => event._id === id);

    navigation.navigate('Event', {
      id,
      src: item.hero_image_url,
      title: item.title,
      address: item.address,
      startTime: item.start_time,
      startDate: item.start_date,
      finishTime: item.finish_time,
      finishDate: item.finish_date,
    });
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

  onFetchAndSetInialEvents = async () => {
    try {
      const { events, nextPage } = await storage.load({
        key: 'events',
        syncParams: {
          refresh: true,
        },
      });

      this.setState({
        events,
        nextPage,
        refreshing: false,
      });
    } catch (err) {
      Alert.alert(
        'Ууупс, ошибка при загрузке ивентов',
        'Попробовать ещё раз?',
        [{ text: 'Нет' }, { text: 'Да', onPress: this.onFetchAndSetInialEvents }],
        { cancelable: false }
      );
    }
  };

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
        onPress={this.onItemPress}
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
      <Bacground>
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
      </Bacground>
    );
  }
}
