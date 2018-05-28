import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import { fetch } from '../helpers';
import { DATA_ENDPOINT } from '../constants';

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

    async events({ reject, resolve, syncParams = {} }) {
      try {
        const { refresh = false } = syncParams;

        let page = 0;
        let prevEvents = [];

        try {
          const { events, nextPage } = await storage.load({
            key: 'events',
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

        const newEvents = await fetch(`${DATA_ENDPOINT}/events?page=${page}`);
        const nextPage = newEvents.length === 10 ? page + 1 : null;
        const events = refresh ? newEvents : [...prevEvents, ...newEvents];

        await storage.save({ key: 'events', data: { events, nextPage } });

        resolve({ events, nextPage });
      } catch (err) {
        reject(err);
      }
    },
  },
});

export default storage;
