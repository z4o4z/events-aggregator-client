import moment from 'moment';
import { Alert } from 'react-native';
import { Calendar } from 'expo';

import { IS_IOS } from '../constants';

const { AlarmMethod, CalendarType, CalendarAccessLevel } = Calendar;

class CalendarService {
  static async addEvent(event = {}) {
    try {
      const calendar = await CalendarService._findEditableCalendar();

      if (!calendar) {
        Alert.alert(
          'Событие не добавлено!',
          'Нет доступного календаря для запси. Пожалуйста, создайте календарь и попробуйте заново',
          [{ text: 'Ok' }]
        );
      }

      await CalendarService._createEvent(calendar.id, event);

      Alert.alert(
        'Событие успешно добавлено!',
        `Событие добавленно в ${calendar.title} календарь`,
        [{ text: 'Ok' }]
      );
    } catch (err) {
      Alert.alert('Событие не добавлено!', `Произошла ошибка: ${err}`, [{ text: 'Ok' }]);
    }
  }

  static async _findEditableCalendar() {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const editableCalendars = calendars.filter(({ allowsModifications }) => allowsModifications);
    let ownerCalendar;

    if (!editableCalendars.length) {
      return null;
    }

    if (IS_IOS) {
      ownerCalendar = calendars.find(({ source }) => source.type === CalendarType.LOCAL);
    } else {
      ownerCalendar = calendars.find(
        ({ accessLevel }) => accessLevel === CalendarAccessLevel.OWNER
      );
    }

    return ownerCalendar || editableCalendars[0];
  }

  static async _createEvent(id, { title, notes, startDate, startTime, finishDate, finishTime }) {
    const absoluteStartDate = CalendarService._getDate(startDate, startTime);

    const alarms = [
      {
        method: AlarmMethod.ALERT,
        absoluteDate: absoluteStartDate,
        relativeOffset: -40,
      },
    ];

    if (startDate !== finishDate) {
      alarms.push({
        method: AlarmMethod.ALERT,
        absoluteDate: absoluteStartDate,
        relativeOffset: -1440,
      });
    }

    await Calendar.createEventAsync(id, {
      title,
      notes,
      alarms,
      endDate: CalendarService._getDate(finishDate, finishTime),
      timeZone: `${moment(startDate).utcOffset()}`,
      startDate: absoluteStartDate,
    });
  }

  static _getDate(date, time) {
    return moment(`${moment(date).format('MM-DD-YYYY')} ${time}`, 'MM-DD-YYYY HH:mm').toDate();
  }
}

export default CalendarService;
