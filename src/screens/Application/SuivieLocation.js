import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import { height } from "../../utils/Dimention";
import { Button } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import { useIsFocused } from "@react-navigation/native";
import * as apiService from "../../service/api";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';
import {showMessage} from 'react-native-flash-message';


export default function SuivieLocation({ route }) {
  const [location, setLocation] = useState(null);
  const id = route.params.id;
  const isFocused = useIsFocused();
  const [errorMsg, setErrorMsg] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(
      async position => {
        console.log('position:', position)
        // Get the longitude and latitude of the device
        const longitude = position.coords.longitude;
        console.log('longitude:', longitude)
        const latitude = position.coords.latitude;
        console.log('latitude:', latitude)
       setLocation(() => position.coords);

        const address = await Geocoder.geocodePosition({
          lat: latitude,
          lng: longitude,
        });
      },
      error => {
        // Handle the error
        Alert.alert('Alert', 'something went wrrong when allow position');
      },);
  }, [refresh, isFocused]);

  const sendLocation = () => {
    let data = {
      id: route.params.id,

      latitude: location.longitude,

      longitude: location.latitude,
    };
    console.log("************************",data);
    apiService.suivieAddLocation(data).then((res) => {
      apiService.suivieReplyNotif(res.data).then((result) => {
        showMessage({
          message: "l'image a été envoyer avec succes",
          type: 'success',
          autoHide: true,
          icon: 'success',
        });
        console.log("send with succes Location reply");
        navigation.reset({
          index: 0,
          routes: [{ name: "Acceuil" }],
        });
      });
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Envoyer votre position </Text>
      <Button icon="send" mode="contained" onPress={() => sendLocation()}>
        Envoyer
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    height: height / 2.5,
    width: "100%",
  },
});
