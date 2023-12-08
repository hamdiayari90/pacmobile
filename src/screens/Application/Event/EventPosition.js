import React, {useState, useEffect,useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
// import * as Location from "expo-location";
import MapView, {Marker} from 'react-native-maps';
import {Button} from 'react-native-paper';
import {launchCamera} from 'react-native-image-picker';
import {height, width} from '../../../utils/Dimention';

import {useNavigation} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {alreadySingnedIn, api, userStorage} from '../../../atom/authState';
import {PaperSelect} from 'react-native-paper-select';
import {selectedLocationId} from '../../../atom/eventState';
import {Alert} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import moment from 'moment/min/moment-with-locales';

import {useIsFocused} from '@react-navigation/native';
import ListPosition from '../../../components/ListPosition';
import {Color} from '../../../utils/Constant';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';
import {
  RESULTS,
  requestNotifications,
  checkNotifications,
  requestLocationAccuracy,
  request,
  PERMISSIONS,
} from 'react-native-permissions';
export const EventPosition = ({route}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [alreadypointed, setAlreadyPointed] = useState(false);
  const [locationId, setLocationId] = useRecoilState(selectedLocationId);
  const [text, setText] = React.useState('');
  const [pointage, setPointage] = useState([]);
  const [showTextInput, setShowTextInput] = useState(false);

  const user = useRecoilValue(userStorage);
  const url = useRecoilValue(api);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [media, setMedia] = useState();
  const [file, setFile] = useState();
  const [cameraResult, setCameraResult] = useState();
  const scroll = useRef();


  const [visible, setVisible] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(alreadySingnedIn);
  const containerStyle = {
    // backgroundColor: "white",
    padding: 20,
    height: height / 2,
    backgroundColor: '#000',
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  };
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     // console.log("status:", status);

  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     // console.log("location:", location);
  //     setLocation(() => location.coords);
  //   })();
  // }, [refresh, isFocused]);

  useEffect(() => {
    getAllPointageByUserId();

    getAllCurrentEventPosition();
  }, [refresh, isFocused]);

  const getAllCurrentEventPosition = async () => {
    const data = await fetchAllCurrentEventPosition();
    if (data.status == '401') {
      setIsAuthenticated(() => false);
    } else {
      let arrayOfLocation = [];

      data?.map(el => {
        arrayOfLocation.push({_id: el.id, value: el.address});
      });
      setLocationId({
        ...locationId,
        list: arrayOfLocation,
      });
    }
  };
  const getAllPointageByUserId = async () => {
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
      },
    );

    let allPointage = await fetchPointageByUSerId();
    setPointage(() => allPointage);
    let check = hasDateWithin24Hours(allPointage);
    // console.log("check:==================> ", check);
    setAlreadyPointed(() => check);
  };
  const hasDateWithin24Hours = allPointage => {
    // Create a Moment.js object for the current date and time
    var currentDate = moment();
    // console.log("currentDate:", currentDate);

    // Loop through each date in the allPointage array
    for (var i = 0; i < allPointage.length; i++) {
      // Create a Moment.js object for the current date in the loop
      const dateStr = allPointage[i].pointageDate;
      const formattedDate = moment(dateStr, 'DD-MM-YYYY HH:mm');

      // Calculate the difference in hours between the two dates
      var hoursDiff = currentDate.diff(formattedDate, 'hours');

      // Check if the difference is less than 24 hours
      if (hoursDiff < 12) {
        return true;
      }
    }

    // If no date was found to be less than 24 hours, return false
    return false;
  };

  async function takePhoto() {
    console.log('takePhoto');

    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!result.didCancel) {
      setCameraResult(result.assets[0]);
      let form = new FormData();
      let file = {
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        bytes: result.assets[0].base64,
      };
      form.append('image', file);
      setMedia(form);
      setFile(file);
    }
  };

  const requestCameraPhotoPermission = async () => {
    try {
      console.log('Camera');

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission');

        takePhoto();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchPointageByUSerId = async () => {
    try {
      let auth = user.token ? user.token : tokenAuth.token;

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${auth}`,
        },
      };

      let endPooint = `${url}/pointage/pointagesByIdUser/${user.id}`;
      let result = await fetch(endPooint, requestOptions);
      return result.json();
    } catch (e) {
      console.log('error ################### =>', e);
    }
  };
  const fetchAllCurrentEventPosition = async () => {
    try {
      let auth = user.token ? user.token : tokenAuth.token;

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${auth}`,
        },
      };

      let endPooint = `${url}/pointage/listLocationByUserAndEvent/${user.id}/${route.params.enventId}`;
      let result = await fetch(endPooint, requestOptions);
      return result.json();
    } catch (e) {
      // console.log(
      //   "error when fetchAllCurrentEventPosition function  ============>",
      //   e
      // );
    }
  };

  const dailyPoint = async () => {
    let response = await pointageEvent();

    if (response?.id) {
      ToastAndroid.showWithGravity(
        'votre quotidien pointage  est a jour ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setTimeout(() => {
        navigation.navigate('Evenement');
      }, 1000);
    } else {
      Alert.alert('Alert', 'Veuillez sélectionner un lieu!');
    }
  };
  const pointageEvent = async () => {
    if (locationId.selectedList.length == 0) {
      setLocationId({
        ...locationId,
        error: 'Veuillez sélectionner un lieu! *',
      });
      return;
    } else {
      if (locationId.selectedList.length > 0) {
        let auth = user.token ? user.token : tokenAuth.token;

        let data = {
          userId: user.id,
          eventId: route.params.enventId,
          locationId: locationId.selectedList[0]._id,
          latitude: location.longitude,
          longitude: location.latitude,
        };
        let form = new FormData();

        form.append("pointage",JSON.stringify(data));
        form.append("image",file);
        console.log(form);
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${auth}`,
            },
            body: form,
          };
          let sendPointage = await fetch(
            `${url}/pointage/addPointage`,
            requestOptions,
          );

          let response = sendPointage.json();
          return response;
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const postCommantaire = async () => {
    let auth = user.token ? user.token : tokenAuth.token;

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(data),
      };
      let sendPointage = await fetch(
        `${url}/pointage/addComment`,
        requestOptions,
      );
      let response = sendPointage.json();
      return response;
    } catch (e) {}
  };

  return (
    <>
      {!alreadypointed ? (
        <ScrollView
        style={styles.container}
        nestedScrollEnabled={true}
        ref={scroll}>
          <TouchableOpacity
          style={styles.imageContainer}
         >
          {cameraResult == null ? (
            // if there is no images picked so you will display a prototype image
            <Image
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 20,
                marginBottom: '5%',
              }}
              source={require('../../../../assets/images/onlinecam.png')}
              resizeMode="center"
            />
          ) : (
            // if user select an image you sould disply his image from galery or from his phone or he can pik vedio
            <Image
              resizeMode="center"
              source={{uri: cameraResult.uri}}
              style={styles.previewImage}
            />
          )}
          <Button
            icon="camera"
            mode="contained"
            onPress={() => requestCameraPhotoPermission()}>
            Prendre Photo
          </Button>
        </TouchableOpacity>
          {location != null ? (
            <View>
              <Text
                style={{fontSize: 20, textAlign: 'center'}}>
                Votre position actuelle{' '}
              </Text>
              <MapView
                style={styles.map}
                region={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker coordinate={location} />
              </MapView>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  width: '93%',
                  alignSelf: 'center',
                }}>
                <PaperSelect
                  label="Selectionnez votre Lieux "
                  value={locationId.value}
                  onSelection={value => {
                    setLocationId({
                      ...locationId,
                      value: value.text,
                      selectedList: value.selectedList,
                      error: '',
                    });
                  }}
                  arrayList={[...locationId.list]}
                  selectedArrayList={locationId.selectedList}
                  errorText={locationId.error}
                  multiEnable={false}
                  textInputMode="outlined"
                  searchStyle={{iconColor: '#000'}}
                  searchPlaceholder="rechercher"
                  modalCloseButtonText="Annuler"
                  modalDoneButtonText="confirmer"
                  theme={{
                    colors: {
                      placeholder: 'black',
                    },
                  }}
                  dialogStyle={{backgroundColor: 'white', borderRadius: 10}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 30
                }}>
                <Text>Envoyer votre position </Text>
                <Button
                  icon="send"
                  mode="contained"
                  onPress={() => dailyPoint()}>
                  Pointage
                </Button>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={{marginBottom: 10}}
              />
              <Button
                icon="refresh"
                mode="outlined"
                onPress={() => setRefresh(() => !refresh)}>
                Refresh
              </Button>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.container,
            {justifyContent: 'flex-start', paddingTop: '9%'},
          ]}>
          <FlashList
            renderItem={({item}) => <ListPosition item={item} />}
            estimatedItemSize={50}
            data={pointage}
            ListHeaderComponent={
              <Text
                style={{
                  textAlign: 'center',
                  color: 'green',
                  fontSize: 16,
                  letterSpacing: 1.2,
                  fontWeight: 'bold',
                }}>
                Vous avez déjà pointé aujourd'hui
              </Text>
            }
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    backgroundColor: Color.light,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    height: height / 3,
    width: '100%',
  },
  imageContainer: {
    width: width / 1.3,
    borderWidth: 0.2,
    borderColor: '#000',
    height: height / 2.25,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '4%',
    borderRadius: 10,
    marginBottom: '20%',
    backgroundColor: Color.light,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
