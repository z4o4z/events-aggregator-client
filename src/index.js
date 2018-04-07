import 'moment/locale/ru';
import { StackNavigator } from 'react-navigation';

import moment from 'moment';

import Home from './screens/Home';
import Event from './screens/Event';

moment.locale('ru');

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Event: {
      screen: Event,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  }
);
