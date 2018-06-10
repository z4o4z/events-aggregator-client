import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { filter } from '../../../../styles';

import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

import { Wrapper, Overlay, IconClear, FilterRow, FilterButton, FiltersWrapper } from './styles';

export default class Filter extends Component {
  static propTypes = {
    opened: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onChangeStartDate: PropTypes.func.isRequired,
    onChangeFinishDate: PropTypes.func.isRequired,
    openedAnimatedValue: PropTypes.instanceOf(Animated.Value).isRequired,
  };

  state = {
    startDate: undefined,
    finishDate: undefined,
    startDatePickerVisible: false,
    finishDatePickerVisible: false,
  };

  onToggleStartDatePicker = () =>
    this.setState(({ startDatePickerVisible }) => ({
      startDatePickerVisible: !startDatePickerVisible,
    }));

  onToggleFinishDatePicker = () =>
    this.setState(({ finishDatePickerVisible }) => ({
      finishDatePickerVisible: !finishDatePickerVisible,
    }));

  onConfirmStartTime = startDate => {
    const { onChangeStartDate } = this.props;

    this.setState({ startDate, startDatePickerVisible: false }, () => onChangeStartDate(startDate));
  };

  onConfirmFinishTime = finishDate => {
    const { onChangeFinishDate } = this.props;

    this.setState({ finishDate, finishDatePickerVisible: false }, () =>
      onChangeFinishDate(finishDate)
    );
  };

  onClearStartDate = () => {
    const { onChangeStartDate } = this.props;

    this.setState({ startDate: undefined }, () => onChangeStartDate());
  };

  onClearFinishDate = () => {
    const { onChangeFinishDate } = this.props;

    this.setState({ finishDate: undefined }, () => onChangeFinishDate());
  };

  render() {
    const { opened, onToggle, openedAnimatedValue } = this.props;
    const { startDate, finishDate, startDatePickerVisible, finishDatePickerVisible } = this.state;

    const translateY = openedAnimatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-filter.height / 2, filter.height, 0],
    });

    return (
      <Wrapper pointerEvents={opened ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={onToggle}>
          <Overlay style={{ opacity: openedAnimatedValue }} />
        </TouchableWithoutFeedback>

        <FiltersWrapper
          style={{
            opacity: openedAnimatedValue,
            transform: [{ translateY }, { scale: openedAnimatedValue }],
          }}
        >
          <FilterRow>
            <FilterButton onPress={this.onToggleStartDatePicker}>
              <Text style={{ textAlign: 'center' }}>
                {startDate ? moment(startDate).format('DD MMMM') : 'Выберать начальную дату'}
              </Text>
            </FilterButton>

            <Button onPress={this.onClearStartDate} touchedScale={0.85}>
              <IconClear />
            </Button>
          </FilterRow>

          <FilterRow>
            <FilterButton onPress={this.onToggleFinishDatePicker}>
              <Text style={{ textAlign: 'center' }}>
                {finishDate ? moment(finishDate).format('DD MMMM') : 'Выберать конечную дату'}
              </Text>
            </FilterButton>

            <Button onPress={this.onClearFinishDate} touchedScale={0.85}>
              <IconClear />
            </Button>
          </FilterRow>
        </FiltersWrapper>

        <DateTimePicker
          date={startDate}
          onCancel={this.onToggleStartDatePicker}
          titleIOS="Выберите дату"
          isVisible={startDatePickerVisible}
          onConfirm={this.onConfirmStartTime}
          cancelTextIOS="Назад"
          confirmTextIOS="Выбрать"
        />

        <DateTimePicker
          date={finishDate}
          onCancel={this.onToggleFinishDatePicker}
          titleIOS="Выберите дату"
          isVisible={finishDatePickerVisible}
          onConfirm={this.onConfirmFinishTime}
          cancelTextIOS="Назад"
          confirmTextIOS="Выбрать"
        />
      </Wrapper>
    );
  }
}
