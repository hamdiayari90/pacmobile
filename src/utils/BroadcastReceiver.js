import { Platform } from 'react-native';
//import * as Notifications from "expo-notifications";

const broadcastReceiver = {
  setBroadcastReceiver: async () => {
    if (Platform.OS === 'android') {
    
      Notifications.setNotificationHandler('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
        importance: Notifications.AndroidImportance.HIGH,

      });
    }
  },
};

export default broadcastReceiver;