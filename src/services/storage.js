import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import { fetch } from '../helpers';
import { DATA_ENDPOINT } from '../constants';

export function getEventsKey(search, startDate, finishDate) {
  return search || startDate || finishDate ? 'filteredEvents' : 'events';
}

const storage = new Storage({
  enableCache: true,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,

  sync: {
    async event({ id, reject, resolve }) {
      try {
        const event = await fetch(`${DATA_ENDPOINT}/events/${id}`);

        await storage.save({ key: 'event', id, data: event });

        resolve(event);
      } catch (err) {
        reject(err);
      }
    },

    events(...args) {
      syncEvents(...args); // eslint-disable-line
    },

    filteredEvents(...args) {
      syncEvents(...args); // eslint-disable-line
    },
  },
});

async function syncEvents({ reject, resolve, syncParams = {} }) {
  try {
    const { refresh = false, search, startDate, finishDate } = syncParams;

    const key = getEventsKey(search, startDate, finishDate);
    let page = 0;
    let prevEvents = [];

    try {
      const { events, nextPage } = await storage.load({
        key,
        autoSync: false,
        syncInBackground: false,
      });

      page = refresh ? 0 : nextPage;
      prevEvents = events;
    } catch (err) {
      console.warn(err);
    }

    if (page === null) {
      resolve({ events: prevEvents, nextPage: page });
      return;
    }

    let filtersAndSearchQuery = '';

    if (search) {
      filtersAndSearchQuery += `&search=${search}`;
    }

    if (startDate) {
      filtersAndSearchQuery += `&startDate=${+new Date(startDate)}`;
    }

    if (finishDate) {
      filtersAndSearchQuery += `&finishDate=${+new Date(finishDate)}`;
    }

    const newEvents = await fetch(`${DATA_ENDPOINT}/events?page=${page}${filtersAndSearchQuery}`);
    const nextPage = newEvents.length === 10 ? page + 1 : null;
    const events = refresh ? newEvents : [...prevEvents, ...newEvents];

    await storage.save({ key, data: { events, nextPage } });

    resolve({ events, nextPage });
  } catch (err) {
    reject(err);
  }
}

export default storage;
