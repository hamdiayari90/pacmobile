/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import {AppRegistry, View, Text, Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import React from 'react';
import {RecoilRoot} from 'recoil';

import notifee, {
  AndroidColor,
  AndroidStyle,
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    'Message handled in the background! when the app is killed',
    remoteMessage,
  );
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'hollow',
    vibration: true,
    vibrationPattern: [300, 500],
  });
  await notifee.displayNotification({
    title: remoteMessage.data?.title,
    body: remoteMessage.data.body,
    data: remoteMessage.data,
    android: {
      channelId,
      priority: 'high',
      smallIcon: 'ic_ted',
      color: AndroidColor.WHITE,
      style: {type: AndroidStyle.BIGTEXT, text: remoteMessage.data.body},
      pressAction: {
        id: 'default',
      },
    },
  });
});

notifee.onBackgroundEvent(async ({type, detail}) => {
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
// CANDIDATE
const RecoilApp = () => {
  return (
    <>
      <RecoilRoot>
        {/* React Suspence is we data  take too long he will show looding until data defined */}
        <React.Suspense
          fallback={
            <View>
              <Text>loading .......</Text>{' '}
            </View>
          }>
          <App />
        </React.Suspense>
      </RecoilRoot>
    </>
  );
};

AppRegistry.registerComponent(appName, () => RecoilApp);
