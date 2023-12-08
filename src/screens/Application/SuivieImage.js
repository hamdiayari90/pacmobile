import {Text} from '@ui-kitten/components';
import React, {useState, useRef, useMemo, useCallback} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {  Card, Modal,  Spinner} from "@ui-kitten/components";

import {Button} from 'react-native-elements';
import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import {height, width} from '../../utils/Dimention';
//import BottomSheet from "reanimated-bottom-sheet";
//import Animated from "react-native-reanimated";
import {showMessage} from 'react-native-flash-message';

import * as api from '../../service/api';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../utils/Constant';
import BottomSheet from '@gorhom/bottom-sheet';

export default function SuivieImage({route}) {
  const [visible, setVisible] = useState(false);

  const [cameraResult, setCameraResult] = useState();
  const [media, setMedia] = useState(null);
  const id = route.params.id;
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['10%', '90%'], []);
  // callbacks
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);

  const handleClosePress = useCallback(() => {
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

  async function takePhoto() {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!result.didCancel) {
      setCameraResult(result.assets[0]);
      // bs.current.snapTo(1);
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
    handleClosePress();

  }
  async function submit() {
    if (media != null) {
      setVisible(()=> true)
      api.suivieAddPhoto(route.params.id, media).then(result => {
        api
          .suivieReplyNotif(result.data)
          .then(r => {
            showMessage({
              message: "l'image a été envoyer avec succes",
              type: 'success',
              autoHide: true,
              icon: 'success',
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'Acceuil'}],
            });
          })
          .catch(err => {
            showMessage({
              message: 'Un erreur est parvenu',
              type: 'danger',
              autoHide: true,
              icon: 'danger',
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'Acceuil'}],
            });
          });
      });
    } else {
      Alert.alert('alert', 'pick an images');
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'Acceuil'}],
      // });
    }
  }

  return (
    <>
     <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <View style={{ alignSelf: "center", marginBottom: 10 }}>
            <Spinner />
          </View>

          <Text style={{ fontWeight: "bold" }}>uploding image ...</Text>
        </Card>
      </Modal>
      <View style={{flex: 1, backgroundColor: Color.light}}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            Keyboard.dismiss();
            handleClosePress();
          }}>
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
            title="Prendre Photo"
            onPress={() => {
              Keyboard.dismiss();
              handleExpandPress();
            }}
          />
        </TouchableOpacity>

        <View style={{marginHorizontal: '20%'}}>
          <Button title="Envoyer" onPress={() => submit()} />
        </View>

        <View style={styles.buttomSheetContainer}>
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
                  onPress={requestCameraPhotoPermission}>
                  <Text style={styles.panelButtonTitle}>Prendre une photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={handleClosePress}>
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
    margin: 10,
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
  buttomSheetContainer: {
    flex: 1,
    padding: 24,
  },
});
