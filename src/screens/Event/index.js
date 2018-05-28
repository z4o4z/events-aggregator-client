import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Share, Linking, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';

import { IMAGE_RATIO, WINDOW_WIDTH } from '../../constants';

import storage from '../../services/storage';
import Calendar from '../../services/calendar';
import Permissions from '../../services/permissions';

import Button from '../../components/Button';
import DateTime from '../../components/DateTime';
import BackgroundImage from '../../components/BackgroundImage';
import BackgroundColor from '../../components/BackgroundColor';

import Content from './components/Content';

import {
  Price,
  Scroll,
  Header,
  Address,
  IconBack,
  Background,
  StyledText,
  ContentHeader,
  HeaderBackground,
} from './styles';

const headerHeight = 70;

const menuOptionStyles = StyleSheet.create({
  optionText: { color: 'rgb(51, 51, 51)', padding: 4 },
});

export default class Event extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          address: PropTypes.string,
          startDate: PropTypes.string.isRequired,
          finishDate: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    geo: {},
    link: null,
    price: null,
    content: null,
    parallaxWidth: WINDOW_WIDTH,
    parallaxHeight: WINDOW_WIDTH * IMAGE_RATIO,
  };

  componentDidMount() {
    this.onFetchEvent();
  }

  onLayout = ({ nativeEvent: { layout: { width } } }) => {
    this.setState({
      parallaxWidth: width,
      parallaxHeight: width * IMAGE_RATIO,
    });
  };

  onShare = () => {
    const { link, title } = this.state;

    Share.share({
      title,
      message: link,
    });
  };

  onOpenLink = href => {
    Linking.openURL(href);
  };

  onOpenInBrowser = () => {
    const { link } = this.state;

    Linking.openURL(link);
  };

  onAddToCalendar = async () => {
    const granted = await Permissions.getCalendarPermissions();

    if (!granted) {
      return;
    }

    const { link } = this.state;
    const { title, address, startDate, finishDate } = this.props.navigation.state.params;

    const notes = `Адресс: ${address}\nСсылка: ${link}`;

    await Calendar.addEvent({
      title,
      notes,
      startDate,
      finishDate,
    });
  };

  onFetchEvent = async () => {
    const { id } = this.props.navigation.state.params;

    try {
      const event = await storage.load({
        id,
        key: 'event',
      });

      this.setState({
        geo: event.geo || {},
        link: event.link,
        price: event.price,
        content: event.content,
      });
    } catch (err) {
      Alert.alert(
        'Ууупс, ошибка при загрузке ивента',
        'Попробовать ещё раз?',
        [
          { text: 'Назад', onPress: this.props.navigation.goBack },
          { text: 'Да', onPress: this.onFetchEvent },
        ],
        { cancelable: false }
      );
    }
  };

  headerRenderer = ({ height, animatedValue }) => {
    const { parallaxHeight } = this.state;
    const { startDate, finishDate } = this.props.navigation.state.params;

    const opacity = animatedValue.interpolate({
      inputRange: [0, parallaxHeight - height],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Header pointerEvents="box-none">
        <HeaderBackground style={{ opacity }} pointerEvents="none" />

        <Button onPress={() => this.props.navigation.goBack()} touchedScale={0.8}>
          <IconBack />
        </Button>

        <DateTime startDate={startDate} finishDate={finishDate} />
      </Header>
    );
  };

  parallaxBackgroundRenderer = ({ animatedValue }) => {
    const { src, address } = this.props.navigation.state.params;
    const { price, parallaxWidth, parallaxHeight } = this.state;

    const priceTranslateY = animatedValue.interpolate({
      inputRange: [-parallaxHeight, 0, parallaxHeight],
      outputRange: [-parallaxHeight / 4, 0, parallaxHeight / 5],
      extrapolate: 'clamp',
    });

    const translateX = animatedValue.interpolate({
      inputRange: [-parallaxHeight, 0],
      outputRange: [parallaxWidth * 2, 0],
      extrapolate: 'clamp',
    });

    const headerWithPriceHeight = parallaxHeight - headerHeight - 70;
    const addressTranslateY = animatedValue.interpolate({
      inputRange: [-parallaxHeight, 0, headerWithPriceHeight],
      outputRange: [-parallaxHeight / 4, 0, -headerWithPriceHeight / 1.4],
      extrapolate: 'clamp',
    });

    return (
      <Fragment>
        <BackgroundImage src={src} />
        <BackgroundColor color="rgba(93, 83, 73, 0.5)" />

        <Price style={{ transform: [{ translateY: priceTranslateY }, { translateX }] }}>
          {price}
        </Price>

        <Address
          style={{
            transform: [{ translateY: addressTranslateY }, { translateX }],
          }}
        >
          {address}
        </Address>
      </Fragment>
    );
  };

  render() {
    const { title, address } = this.props.navigation.state.params;
    const { geo, content, parallaxHeight } = this.state;

    return (
      <MenuProvider>
        <Background>
          <Scroll
            width="100%"
            height="100%"
            headerHeight={headerHeight}
            onLayout={this.onLayout}
            renderHeader={this.headerRenderer}
            isHeaderFixed
            parallaxHeight={parallaxHeight}
            useNativeDriver
            backgroundScale={2}
            backgroundScaleOrigin="top"
            renderParallaxBackground={this.parallaxBackgroundRenderer}
            renderParallaxForeground={this.parallaxForegroundRenderer}
            parallaxForegroundScrollSpeed={0.8}
          >
            {!!content && (
              <ContentHeader>
                <Button onPress={this.onOpenInBrowser}>
                  <StyledText>Открыть в браузере</StyledText>
                </Button>

                <Menu>
                  <MenuTrigger>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={24}
                      color="rgb(51, 51, 51)"
                    />
                  </MenuTrigger>
                  <MenuOptions itemPadding={20}>
                    <MenuOption
                      text="Поделиться"
                      onSelect={this.onShare}
                      customStyles={menuOptionStyles}
                    />
                    <MenuOption
                      text="Добавить в календарь"
                      onSelect={this.onAddToCalendar}
                      customStyles={menuOptionStyles}
                    />
                  </MenuOptions>
                </Menu>
              </ContentHeader>
            )}

            <Content
              geo={geo}
              html={content}
              title={title}
              address={address}
              onOpenLink={this.onOpenLink}
            />
          </Scroll>
        </Background>
      </MenuProvider>
    );
  }
}
