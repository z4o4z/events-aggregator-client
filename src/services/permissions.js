import { Alert, Linking } from 'react-native';
import { Permissions, IntentLauncherAndroid } from 'expo';

import { IS_IOS } from '../constants';

class PermissionsService {
  static PERMISSIONS_GRANTED = 'granted';

  static getCalendarPermissions() {
    return PermissionsService._getPermissions(Permissions.CALENDAR);
  }

  static async _getPermissions(type) {
    const { status } = await Permissions.getAsync(type);

    if (status === PermissionsService.PERMISSIONS_GRANTED) {
      return true;
    }

    const res = await Permissions.askAsync(type);

    if (res.status !== PermissionsService.PERMISSIONS_GRANTED) {
      PermissionsService._openSettings('календарём');
      return false;
    }

    return true;
  }

  static _openSettings(postfix) {
    Alert.alert(
      `Нет прав для работы с ${postfix}`,
      'Открыть настройки?',
      [{ text: 'Нет' }, { text: 'Да', onPress: PermissionsService._onOpenSettings }],
      { cancelable: false }
    );
  }

  static _onOpenSettings = () => {
    if (IS_IOS) {
      Linking.openURL('app-settings:');
    } else {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APPLICATION_DETAILS_SETTINGS
      );
    }
  };
}

export default PermissionsService;
