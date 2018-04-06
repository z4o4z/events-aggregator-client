import React, { Fragment, Component } from 'react';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import { colorPrimary } from '../../styles';
import { IMAGE_RATIO, DATA_ENDPOINT, WINDOW_WIDTH } from '../../constants';

import Loader from '../../components/Loader';
import DateTime from '../../components/DateTime';
import BackgroundImage from '../../components/BackgroundImage';
import BackgroundColor from '../../components/BackgroundColor';

import Content from './Content';

import { Scroll, Header } from './styles';

export default class Event extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    startTime: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    finishTime: PropTypes.string,
    finishDate: PropTypes.string.isRequired,
  };

  state = {
    geo: null,
    tags: null,
    link: null,
    price: null,
    content: null,
    phoneNumber: null,
    parallaxHeight: WINDOW_WIDTH * IMAGE_RATIO,
  };

  componentDidMount() {
    this.fetchEvent();
  }

  onLayout = ({ nativeEvent: { layout: { width } } }) => {
    this.setState({
      parallaxHeight: width * IMAGE_RATIO,
    });
  };

  async fetchEvent() {
    const { id } = this.props;

    const res = await global.fetch(`${DATA_ENDPOINT}/events/${id}`);

    const event = await res.json();

    this.setState({
      link: event.link,
      price: event.price,
      content: event.content,
      phoneNumber: event.phone_number,
    });
  }

  headerRenderer = () => {
    const { startTime, startDate, finishTime, finishDate } = this.props;

    return (
      <Header pointerEvents="none">
        <DateTime
          startDate={startDate}
          startTime={startTime}
          finishTime={finishTime}
          finishDate={finishDate}
        />
      </Header>
    );
  };

  parallaxBackgroundRenderer = () => {
    const { src } = this.props;

    return (
      <Fragment>
        <BackgroundImage src={src} />
        <BackgroundColor color="rgba(93, 83, 73, 0.5)" />
      </Fragment>
    );
  };

  render() {
    const { content, parallaxHeight } = this.state;

    return (
      <Scroll
        width="100%"
        height="100%"
        headerHeight={parallaxHeight}
        useNativeDriver
        onLayout={this.onLayout}
        parallaxHeight={parallaxHeight}
        renderHeader={this.headerRenderer}
        renderParallaxBackground={this.parallaxBackgroundRenderer}
      >
        {content === null ? <Loader /> : <Content html={content} />}
      </Scroll>
    );
  }
}
