import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { StyledText } from './styles';

export default function DateTime({ startDate, finishDate }) {
  const startDateMoment = moment(startDate);
  const finishDateMoment = moment(finishDate);
  const startDay = startDateMoment.format('D');
  const startTime = startDateMoment.format('HH:mm');
  const startMonth = startDateMoment.format('MMMM');
  const finishDay = finishDateMoment.format('D');
  const finishTime = finishDateMoment.format('HH:mm');
  const finishMonth = finishDateMoment.format('MMMM');

  let dateTime = '';

  if (startTime !== '00:00') {
    dateTime += `${startTime} `;
  }

  if (finishTime !== '00:00') {
    dateTime += `- ${finishTime} `;
  }

  if (startMonth !== finishMonth) {
    dateTime += `${startDateMoment.format('D MMMM')} - ${finishDateMoment.format('D MMMM')}`;
  } else if (startDay !== finishDay) {
    dateTime += `${startDay} - ${finishDateMoment.format('D MMMM')}`;
  } else {
    dateTime += `${startDateMoment.format('D MMMM')}`;
  }

  return <StyledText pointerEvents="none">{dateTime}</StyledText>;
}

DateTime.propTypes = {
  startDate: PropTypes.string.isRequired,
  finishDate: PropTypes.string.isRequired,
};
