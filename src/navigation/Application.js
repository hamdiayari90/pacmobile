import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import {MenuNavigation} from './MenuNavigation';
import {EventDetail} from '../screens/Application/Event/EventDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../service/api';
import {navigate} from './RootNavigation';
import Event from '../screens/Application/Event';
import Candidate from '../screens/Application/Candidate';
import AddReclamation from '../screens/Application/AddReclamation';
import {useRecoilState} from 'recoil';
import {userRole} from '../atom/authState';
import {EventPosition} from '../screens/Application/Event/EventPosition';
import {AddComment} from '../screens/Application/Event/AddComment';
import {Equipe} from '../screens/Application/Event/Equipe';
import SuivieImage from '../screens/Application/SuivieImage';
import SuivieLocation from '../screens/Application/SuivieLocation';
import ReplySuivieImage from '../screens/Application/ReplySuivieImage';
import ReplySuivieLocation from '../screens/Application/ReplySuivieLocation';
import FlashMessage from 'react-native-flash-message';
import linking from './Linking';
import LinkingId from '../screens/LinkingId';
import Follow from '../screens/Application/Follow';
import BriefDetail from '../screens/Application/BriefDetail';
import BriefsByEvent from '../screens/Application/BriefsByEvent';
import Dashboard from '../screens/Dashboard';
import Reclamations from '../screens/Application/Reclamations';

import BotNav from '../components/BotNav';
import ItemList from "../screens/Application/ItemList";

const Stack = createNativeStackNavigator();

export const Application = ({navigation}) => {
  const [role, setRole] = useRecoilState(userRole);
  // useEffect(() => {
  //   // Add a notification response received listener
  //   const responseListener =
  //     Notifications.addNotificationResponseReceivedListener(
  //       async (response) => {
  //         console.log(
  //           "response === > in appliction.js where the stack navgation for a user is authenticated ===> \n",
  //           response.notification.request.content
  //         );

  //         // Extract the data from the notification
  //         const { data } = response.notification.request.content;
  //         // console.log('response.notification.request.content:', response.notification.request.content)
  //         // console.log(' response.notification.request:',  response.notification.request)
  //         // console.log('response.notification:', response.notification)
  //         if (data.type == "EVENT") {
  //           api.getEvent(data.data).then((response) => {
  //             navigate("détail événement", { item: response.data });
  //           });
  //         } else if (data.type == "CANDIDATE") {
  //           api.getCandidate(data.data).then((response) => {
  //             navigate("détail candidature", { item: response.data });
  //           });
  //         } else if (data.type == "DEMANDE_SUIVIE") {
  //           console.log(data.data);
  //           api.getSuivie(data.data).then((response) => {
  //             console.log(response);
  //             if (response.data.demande == "IMAGE") {
  //               navigate("Suivie photo", { id: data.data });
  //             } else if (response.data.demande == "LOCALISATION") {
  //               navigate("Suivie localisation", { id: data.data });
  //             }
  //           });
  //         } else if (data.type == "REPONSE_DEMANDE_SUIVIE") {
  //           console.log(data.data);
  //           api.getSuivie(data.data).then((response) => {
  //             console.log(response);
  //             if (response.data.demande == "IMAGE") {
  //               console.log("replyyyyyy photo");
  //               navigate("Reply Image", { item: response.data });
  //             } else if (response.data.demande == "LOCALISATION") {
  //               console.log("replyyyyyy location");
  //               navigate("Reply localisation", { item: response.data });
  //             }
  //           });
  //         }

  //     );

  //   // Remove the listener when the component unmounts
  //   return () => {
  //     responseListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    if (role == null) {
      const value = await AsyncStorage.getItem('user');
      const parsedValue = JSON.parse(value);
      // console.log("parsedValue in Apllication :", parsedValue.role[0]);

      setRole(() => parsedValue.role[0]);
    }
  };
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Acceuil"
          component={MenuNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={MenuNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DetailEvent"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'détail événement',
          }}
          component={Event}
        />
        <Stack.Screen
          name="Reclamations"
          options={{
            headerShown: true,
          }}
          component={Reclamations}
        />
        <Stack.Screen
          name="CondidateDetail"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'détail candidature',
          }}
          component={Candidate}
        />

        <Stack.Screen
          name="AddReclamation"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'Ajouter reclamation',
          }}
          component={AddReclamation}
        />
         <Stack.Screen
          name="ItemList"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'Stock',
          }}
          component={ItemList}
        />

        <Stack.Screen
          name="FollowPhoto"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'Suivie photo',
          }}
          component={SuivieImage}
        />

        <Stack.Screen
          name="ReplyImage"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'Reply Image',
          }}
          component={ReplySuivieImage}
        />
        <Stack.Screen
          name="Replylocalisation"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'Reply localisation',
          }}
          component={ReplySuivieLocation}
        />
        <Stack.Screen
          name="SuivieLocalisation"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'Suivie localisation',
          }}
          component={SuivieLocation}
        />

        <Stack.Screen
          name="Pointage"
          component={EventPosition}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="BriefsByEvent"
          component={BriefsByEvent}
          options={{
            headerShown: true,
            title: 'Brief par événement',
          }}
        />
        <Stack.Screen
          name="AddComment"
          component={AddComment}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Equipe"
          component={Equipe}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Candidatedetail"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: '',
          }}
          component={Candidate}
        />
        <Stack.Screen
          name="BriefDetail"
          options={{
            headerShown: true,
            headerTitleStyle: {color: 'black'},
            title: 'Brief',
          }}
          component={BriefDetail}
        />
        <Stack.Screen
          name="LinkingId"
          options={{
            headerShown: false,
            headerTitleStyle: {color: 'black'},
            title: 'LinkingId',
          }}
          component={LinkingId}
        />
        <Stack.Screen
          name="Follow"
          options={{
            headerShown: false,
            headerTitleStyle: {color: 'black'},
            title: '',
          }}
          component={Follow}
        />
      </Stack.Navigator>
      <BotNav />
      <FlashMessage position="bottom" floating={true} />
    </NavigationContainer>
  );
};
