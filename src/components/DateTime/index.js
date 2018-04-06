import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { StyledText } from './styles';

export default function DateTime({ startDate, startTime, finishDate, finishTime }) {
  const startDateMoment = moment(startDate);
  const finishDateMoment = moment(finishDate);
  const startDay = startDateMoment.format('D');
  const startMonth = startDateMoment.format('MMMM');
  const finishDay = startDateMoment.format('D');
  const finishMonth = finishDateMoment.format('MMMM');

  let dateTime = `${startTime} ${finishTime && finishTime !== '00:00' ? `- ${finishTime} ` : ''}`;

  if (startMonth !== finishMonth) {
    dateTime += `${startDateMoment.format('D MMMM')} - ${finishDateMoment.format('D MMMM')}`;
  } else if (startDay !== finishDay) {
    dateTime += `${startDay} - ${finishDateMoment.format('D MMMM')}`;
  } else {
    dateTime += `${startDateMoment.format('D MMMM')}`;
  }

  return <StyledText>{dateTime}</StyledText>;
}

DateTime.propTypes = {
  startTime: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  finishTime: PropTypes.string.isRequired,
  finishDate: PropTypes.string.isRequired,
};
