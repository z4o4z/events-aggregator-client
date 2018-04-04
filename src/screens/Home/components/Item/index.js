import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import BackgroundImage from '../../../../components/BackgroundImage';
import BackgroundColor from '../../../../components/BackgroundColor';

import { Date, Title, Header, Footer, Wrapper } from './styles';

export default function Item(props) {
  const { src, title, startTime, startDate, finishTime, finishDate } = props;

  const startDateMoment = moment(startDate);
  const finishDateMoment = moment(finishDate);
  const startDay = startDateMoment.format('D');
  const startMonth = startDateMoment.format('MMMM');
  const finishDay = startDateMoment.format('D');
  const finishMonth = finishDateMoment.format('MMMM');

  let date = `${startTime} ${finishTime && finishTime !== '00:00' ? `- ${finishTime} ` : ''}`;

  if (startMonth !== finishMonth) {
    date += `${startDateMoment.format('D MMMM')} - ${finishDateMoment.format('D MMMM')}`;
  } else if (startDay !== finishDay) {
    date += `${startDay} - ${finishDateMoment.format('D MMMM')}`;
  } else {
    date += `${startDateMoment.format('D MMMM')}`;
  }

  return (
    <Wrapper>
      <BackgroundImage src={src} />
      <BackgroundColor color="rgba(93, 83, 73, 0.5)" />

      <Header>
        <Date>{date.toUpperCase()}</Date>
      </Header>

      <Footer>
        <Title>{title}</Title>
      </Footer>
    </Wrapper>
  );
}

Item.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  finishTime: PropTypes.string,
  finishDate: PropTypes.string.isRequired,
};

Item.defaultProps = {
  startTime: '',
  finishTime: '',
};
