import {StyleSheet, SafeAreaView, Linking} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import messaging from '@react-native-firebase/messaging';
import * as api from './src/service/api';
import {navigate} from './src/navigation/RootNavigation';
import {Navigation} from './src/navigation/Navigation';
import notifee, {
  AndroidColor,
  AndroidStyle,
  AndroidImportance,
  EventType,
  AndroidNotificationSetting,
} from '@notifee/react-native';

export default function App() {
  const [notif, setNotif] = useState({});

  // ==============================================================================================================
  // ================================  Notification Permission firebase============================================
  // ==============================================================================================================
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      //let message = JSON.stringify(remoteMessage)
      // Request permissions (required for iOS)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'hollow',
        vibration: true,
        vibrationPattern: [300, 500],
      });
      await notifee.displayNotification({
        title: remoteMessage?.data?.title,
        body: remoteMessage?.data.body,
        data: remoteMessage?.data ? remoteMessage.data : {},

        android: {
          channelId,
          // smallIcon: 'ic_ted',
          color: AndroidColor.WHITE,
          style: {type: AndroidStyle.BIGTEXT, text: remoteMessage?.data.body},
          pressAction: {
            id: 'default',
          },
          priority: 'high',
        },
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  notifee.onForegroundEvent(async ({type, detail}) => {
    //console.log('detail: ============> \n', detail.notification.data);
    console.log(
      '==============================================================',
    );
    // console.log('type:============> \n ', type);
    //console.log('detail:', detail)
    switch (type) {
      case EventType.DISMISSED:
        notifee.cancelNotification(detail.notification.id);
        break;
      case EventType.PRESS:
        redirectNotif(detail.notification.data);
        break;
      default:
        break;
    }
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    //console.log('detail: ============> \n', detail.notification.data);
    console.log(
      '==============================================================',
    );
    // console.log('type:============> \n ', type);
    //console.log('detail:', detail)
    switch (type) {
      case EventType.DISMISSED:
        notifee.cancelNotification(detail.notification.id);
        break;
      case EventType.PRESS:
        redirectNotif(detail.notification.data);
        break;
      default:
        break;
    }
  });
  const redirectNotif = async data => {
    console.log('data with linkingg how it s show data.type :', data.type);
    console.log(
      'data with linkingg how it s show   ##  idItem  ##:',
      data.idItem,
    );
    switch (data.type) {
      case 'DEMANDE_SUIVIE':
        {
          api.getSuivie(data.idItem).then((response) => {
            if (response.data.demande == "IMAGE") {
              Linking.openURL(`tde://pac/FollowPhoto/${response.data.id}`);
            } else if (response.data.demande == "LOCALISATION") {
              Linking.openURL(`tde://pac/SuivieLocalisation/${response.data.id}`);
            }
          });
        }
        break;
      case 'REPONSE_DEMANDE_SUIVIE':
        {
          Linking.openURL(`tde://pac/redirectFollow/${data.idItem}`);
        }
        break;
      case 'CANDIDATE':
        {
          Linking.openURL(`tde://pac/CondidateDetail/${data.idItem}`);
        }
        break;
      case 'EVENT':
        {
          Linking.openURL(`tde://pac/DetailEvent/${data.idItem}`);
        }
        break;

      case'BRIEF':
        {
          Linking.openURL(`tde://pac/BriefDetail/${data.idItem}`);
        }
        break;
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }
  return (
    // wrap the app with recoil state manager to make state globale and easy to
    // manupulate data between screen unstead of passing propos each time
    <GestureHandlerRootView style={{flex: 1, flexGrow: 1}}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />

        <SafeAreaView style={styles.container}>
          <Navigation />
        </SafeAreaView>
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
