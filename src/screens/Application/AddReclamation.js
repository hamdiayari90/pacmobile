import {Text, Input} from '@ui-kitten/components';
import React, {useState, useRef, useMemo, useCallback,useEffect} from 'react';
import {launchCamera} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Button} from 'react-native-elements';
import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
} from 'react-native';
import {height, width} from '../../utils/Dimention';
import BottomSheet from '@gorhom/bottom-sheet';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../../service/api';
import {navigate} from '../../navigation/RootNavigation';
import {Alert} from 'react-native';
import {Color} from '../../utils/Constant';

export default function AddReclamation({route}) {
  const [cameraResult, setCameraResult] = useState();
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState();
  const [user, setUser] = useState();

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['10%', '90%'], []);
  // callbacks
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);

  useEffect( () => {
    bottomSheetRef.current?.close();
  }, []);

  const requestCameraPhotoPermission = async () => {
    try {
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
        takePhoto();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestCameraVideoPermission = async () => {
    try {
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
        takeVideo();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function takePhoto() {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!result.didCancel) {
      setCameraResult(result.assets[0]);
      handleClosePress();
      let form = new FormData();
      let file = {
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        bytes: result.assets[0].base64,
      };
      form.append('media', file);
      setMedia(form);
    }
  }
  const renderIcon = () => (
    <MaterialCommunityIcons name="message" size={25} color={Color.primary} />
  );

  async function takeVideo() {
    const result = await launchCamera({
      mediaType: 'video',
      includeBase64: true,
    });
    if (!result.didCancel) {
      setCameraResult(result.assets[0]);
      handleClosePress()
      let form = new FormData();
      let file = {
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        bytes: result.assets[0].base64,
      };
      form.append('media', file);
      setMedia(form);
    }
  }
  async function submit() {
    if (message.length > 0) {
      var formValues;
      const value = await AsyncStorage.getItem('user').then(res => {
        setUser(JSON.parse(res));
        formValues = {
          login: JSON.parse(res).login,
          message: message,
        };
        api.addReclamation(formValues).then(result => {
          api
            .addMediaToReclamation(result.data, media)
            .then(mediaResult => {
              navigate('Acceuil');
            })
            .catch(error => {
              navigate('Acceuil');
            });
        });
      });
    } else {
      Alert.alert('Alert ', 'donner un text descriptif de votre reclamation');
    }
  }
 

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  return (
    <>
      <View style={{flex: 1, backgroundColor: Color.light}}>
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
              source={require('../../../assets/images/onlinecam.png')}
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
            title="Prendre Photo / Vidéo"
            onPress={() => {
              Keyboard.dismiss();
              setTimeout(() => {
                handleExpandPress();
              }, 500);
            }}
          />
        </TouchableOpacity>
        <Input
          value={message}
          placeholder="Merci de déposer votre réclamation"
          placeholderTextColor="black"
          style={styles.textInput}
          onChangeText={text => setMessage(text)}
          multiline={true}
          numberOfLines={4}
          accessoryLeft={renderIcon}
        />
        <View style={{marginHorizontal: '20%'}}>
          <Button title="Envoyer" onPress={() => submit()} />
        </View>
        {/* 
      <BottomSheet
        ref={bs}
        snapPoints={[height / 3.7, 0]}
        renderContent={renderInner}
      /> */}
        <View style={styles.container}>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            enablePanDownToClose={true}>
            <View style={styles.contentContainer}>
              <View
                style={{height: height / 4, width: '93%', alignSelf: 'center'}}>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={()=>requestCameraPhotoPermission()}>
                  <Text style={styles.panelButtonTitle}>Prendre une photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={()=>requestCameraVideoPermission()}>
                  <Text style={styles.panelButtonTitle}>Prendre une video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={()=>handleClosePress()}>
                  <Text style={styles.panelButtonTitle}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#37435e',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    width: width / 1.3,
    borderWidth: 0.2,
    borderColor: '#000',
    height: height / 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '4%',
    borderRadius: 10,
    marginBottom: '20%',
    backgroundColor: Color.light,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  card: {
    margin: 2,
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 24,
  },
  image: {
    height: height / 4,
    marginBottom: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  timeAgo: {
    marginLeft: 'auto',
    fontWeight: 'bold',
    color: 'green',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerDetail: {
    alignSelf: 'center',
  },
  scrollView: {
    justifyContent: 'flex-start',
  },
  textInput: {
    margin: '3%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
