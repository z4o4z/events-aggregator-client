import React, { Component } from 'react';
import { FlatList } from 'react-native';

import Item from './components/Item';

export default class Home extends Component {
  state = {
    events: [],
    nextPage: null,
  };

  componentDidMount() {
    this.fetchEvents();
  }

  onEndReached = () => {
    const { nextPage } = this.state;

    if (nextPage === null) {
      return;
    }

    this.fetchEvents(nextPage);
  };

  async fetchEvents(page = 0) {
    const res = await global.fetch(
      `http://events-aggregator-workshop.anadea.co:8080/events?page=${page}`
    );

    const data = await res.json();

    this.setState(({ events }) => ({
      events: [...events, ...data],
      nextPage: data.length === 10 ? page + 1 : null,
    }));
  }

  keyExtractor = item => item._id;

  itemRenderer = ({ item }) => (
    <Item
      src={item.hero_image_url}
      title={item.title}
      startTime={item.start_time}
      startDate={item.start_date}
      finishTime={item.finish_time}
      finishDate={item.finish_date}
    />
  );

  render() {
    const { events } = this.state;

    return (
      <FlatList
        data={events}
        renderItem={this.itemRenderer}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={2}
      />
    );
  }
}
