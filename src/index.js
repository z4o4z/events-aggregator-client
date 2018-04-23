import 'moment/locale/ru';
import moment from 'moment';
import { YellowBox } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './screens/Home';
import Event from './screens/Event';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

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
