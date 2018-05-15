import { Alert } from 'react-native';
import { Calendar } from 'expo';

import { IS_IOS } from '../constants';

const { CalendarType, CalendarAccessLevel } = Calendar;

class CalendarService {
  async addEvent() {
    const calendarId = await this._findOwnerCalendarId();

    if (!calendarId) {
      Alert.alert(
        'Событие не добавлено!',
        'Нет доступного календаря для запси. Пожалуйста, создайте календарь и попробуйте заново',
        [{ text: 'Ok' }]
      );
    }
  }

  // eslint-disable-next-line  class-methods-use-this
  async _findOwnerCalendarId() {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const editableCalendars = calendars.filter(({ allowsModifications }) => allowsModifications);
    let ownerCalendarId;

    if (!editableCalendars.length) {
      return null;
    }

    if (IS_IOS) {
      const ownerCalendar = calendars.find(({ source }) => source.type === CalendarType.LOCAL);

      ownerCalendarId = (ownerCalendar || editableCalendars[0]).id;
    } else {
      const ownerCalendar = calendars.find(
        ({ accessLevel }) => accessLevel === CalendarAccessLevel.OWNER
      );

      ownerCalendarId = (ownerCalendar || editableCalendars[0]).id;
    }

    return ownerCalendarId;
  }
}

export default new CalendarService();
