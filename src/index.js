import 'moment/locale/ru';
import moment from 'moment';
import { StackNavigator } from 'react-navigation';

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
