import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Permissions } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Share, Linking, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';

import storage from '../../libs/storage';
import { IMAGE_RATIO, WINDOW_WIDTH } from '../../constants';

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
  Foreground,
  StyledText,
  ContentHeader,
  HeaderBackground,
} from './styles';

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
          startTime: PropTypes.string,
          startDate: PropTypes.string.isRequired,
          finishTime: PropTypes.string,
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
    parallaxHeight: WINDOW_WIDTH * IMAGE_RATIO,
  };

  componentDidMount() {
    this.onFetchEvent();
  }

  onLayout = ({ nativeEvent: { layout: { width } } }) => {
    this.setState({
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
    const permissionsGranted = await this.grantCalendarPermissions();

    if (!permissionsGranted) {
      Alert.alert('Нет прав для работы с календарём', [], {
        cancelable: true,
      });

      return;
    }


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
    const { startTime, startDate, finishTime, finishDate } = this.props.navigation.state.params;

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
    const { src } = this.props.navigation.state.params;

    return (
      <Fragment>
        <BackgroundImage src={src} />
        <BackgroundColor color="rgba(93, 83, 73, 0.5)" />
      </Fragment>
    );
  };

  parallaxForegroundRenderer = () => {
    const { price } = this.state;
    const { address } = this.props.navigation.state.params;

    return (
      <Foreground>
        <Price>{price}</Price>
        <Address>{address}</Address>
      </Foreground>
    );
  };

  grantCalendarPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.CALENDAR);

    if (status === 'granted') {
      return true;
    }

    const res = await Permissions.askAsync(Permissions.CALENDAR);

    return res.status === 'granted';
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
            headerHeight={70}
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
