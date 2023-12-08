import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  PermissionsAndroid

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {MultiSelectZone} from '../../components/MultiSelectZone/MultiSelectZone';
import React, {useState, useEffect, useRef} from 'react';
import {Color, Font} from '../../utils/Constant';
import {useFormik, yupToFormErrors} from 'formik';
import * as Yup from 'yup';
import {FormInput} from '../../components/FormInput/FormInput';
import {height, width} from '../../utils/Dimention';
import {PaperSelect} from 'react-native-paper-select';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feather from 'react-native-vector-icons/Feather';

import axios from 'axios';
import {Button} from '@ui-kitten/components';

import {useRecoilValue, useRecoilState} from 'recoil';
import {
  allZoneSelected,
  alreadySingnedIn,
  api,
  autoLogin,
  selectedCivilAtom,
  selectedLanguetAtom,
  selectedSituationAtom,
  selectedZoneAtom,
  userId,
  userRole,
  userStorage,
} from '../../atom/authState';
// import * as DocumentPicker from "expo-document-picker";
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('requis*')
    .min(3, "l'username doit comporter au moins 3 caractères ")
    .max(15, 'le nom  doit comporter moins de 15 caractères')
    .matches(/^(?!\s*$).+/, 'Le nom est requis*')
    .trim(),
  firstname: Yup.string()
    .required('Le nom est requis*')
    .min(3, 'le nom doit comporter au moins 3 caractères ')
    .max(15, 'le nom  doit comporter moins de 15 caractères')
    .matches(
      /^[A-Za-z ]+$/,
      'le nom est obligatoire et accepte  que des lettres*',
    )
    .trim(),
  lastname: Yup.string()
    .required('nom obligatoire*')
    .matches(
      /^[A-Za-z ]+$/,
      'le nom est obligatoire et accepte  que des lettres*',
    )
    .trim(),
  email: Yup.string().email('Invalid email*').required('Required*').trim(),
  password: Yup.string()
    .min(6, 'mot de passe doit etre 6 caractères au minimum*')
    .required('mot de pass requis!')
    .trim(),
  confirmPassword: Yup.string()
    .required('confirm password requis')
    .oneOf(
      [Yup.ref('password'), null],
      'confirmation de mot de passe est incorrecte',
    )
    .trim(),
  phone: Yup.string()
    .required('numero du telephone obligatoire*')
    .min(8, 'numéro doit etre  8 chiffres*')
    .required('Numéro de téléphone obligatoire*'),
  address: Yup.string()
    .required('Address  est requis*')
    .min(4, "l'address doit comporter au moins 4 caractères ")
    .max(15, 'le address  doit comporter moins de 15 caractères')
    .trim(),
  cin: Yup.string()
    .required('le numéro cin est requis*')
    .min(8, 'le numero de téphone doit etre 8 numéro'),
  // etatCivil: Yup.string().required("l'etat civil est requis"),
  taille: Yup.string('taille est requis'),
  sexe: Yup.string(),
  poids: Yup.string()
    .required('le poids est requis*')
    .min(2, 'votre poids ne depasse pas 2 chiffre*')
    .max(3, 'votre taille ne depasse pas 3 chiffre*'),
  taille: Yup.string()
    .required('votre taille  est requis*')
    .min(3, 'votre taille ne depasse pas 3 chiffre*')
    .max(3, 'votre taille ne depasse pas 3 chiffre*'),
});

const AnimatorRegisterScreen = ({navigation}) => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(alreadySingnedIn);
  const [cameraResult, setCameraResult] = useState();

  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [minimunYears, setMininumDateYears] = useState(1995);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dataFormat, setDateFormat] = useState('');
  const [dateError, setDateError] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(undefined);
  const [zone, setZone] = useState([]);
  const [zoneSelected, setZoneSelected] = useState([]);
  const [laguageSelected, setLaguageSelected] = useState([]);
  const selectedZone = useRecoilValue(allZoneSelected);
  const [checked, setChecked] = useState('FEMME');
  const [choseInterrest, setChoseInterrest] =
    useRecoilState(selectedLanguetAtom);
  const [role, setRole] = useRecoilState(userRole);
  const [choseZone, setChoseZone] = useRecoilState(selectedZoneAtom);
  const [civil, setCivil] = useRecoilState(selectedCivilAtom);
  const [situation, setSituation] = useRecoilState(selectedSituationAtom);

  // verify username , email and cin if exist in database

  const [userExist, setUserExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [cinExist, setCinExist] = useState(false);

  const [toggleUser, setToggleUser] = useState(false);
  const [toggleEmail, setToggleEmail] = useState(false);

  const [toggleCin, setToggleCin] = useState(false);
  const [user, setUser] = useRecoilState(userStorage);
  const url = useRecoilValue(api);
  const scroll = useRef();

  useEffect(() => {
    getAllZone();
    getnewDateForCalender();
  }, []);

  useEffect(() => {
    _mapAllZone();
  }, [zone]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(() => !secureTextEntry);
  };
  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={() => toggleSecureEntry()}>
      <Feather
        size={24}
        color="black"
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const renderIconUserName = props => (
    <>
      {toggleUser ? (
        <MaterialCommunityIcons
          size={24}
          color={userExist ? 'red' : 'green'}
          {...props}
          name={userExist ? 'close-circle-outline' : 'check-bold'}
        />
      ) : null}
    </>
  );
  const renderIconEmail = props => (
    <>
      {toggleEmail ? (
        <MaterialCommunityIcons
          size={24}
          color={emailExist ? 'red' : 'green'}
          {...props}
          name={emailExist ? 'close-circle-outline' : 'check-bold'}
        />
      ) : null}
    </>
  );
  const renderIconCin = props => (
    <>
      {toggleCin ? (
        <MaterialCommunityIcons
          size={24}
          color={cinExist ? 'red' : 'green'}
          {...props}
          name={cinExist ? 'close-circle-outline' : 'check-bold'}
        />
      ) : null}
    </>
  );

  //  get fcm device if is null
  // ==================================================================================================
  // ============================= GET FCM TOKEN    =====================================
  // ==================================================================================================
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    const token = await messaging().getToken();
    console.log('fcm token:', token);
    await AsyncStorage.setItem('fcm', JSON.stringify(token));
    return token;
  };
  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDateError(() => '');
    setDatePicker(() => false);

    setDate(() => value);
    setDateFormat(() => moment(value).format('YYYY/MM/DD'));
  }

  // ===================================================================================================
  // ============================= PIK IMAGE ===========================================================
  // ===================================================================================================

  const pickImgLibrary = async () => {
    let result = await launchImageLibrary({
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    });
    if (!result.didCancel) {
      setCameraResult(result.assets[0]);
      let file = {
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        bytes: result.assets[0].base64,
      };
      let form = new FormData();
      form.append('image', file);
      setImage(() => file);
      setImage(() => file);
    }
  };

  const pickImg = async () => {
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
      includeExtra:true
    });
    if (!result.didCancel) {
      setCameraResult(result.assets[0]);
      let file = {
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        bytes: result.assets[0].base64,
      };
      setImage(file);
    }
  }

  // ==================================================================================================
  // ============================= GET ALL ZONE   ======================================================
  // ===================================================================================================
  const _mapAllZone = () => {
    setChoseZone({
      ...choseZone,
      list: zone,
    });
  };
  const getAllZone = async () => {
    let listOfZones = [];
    const zones = await fetchAllZone();
    zones?.map(el => {
      listOfZones.push({_id: el.id, value: el.name});
    });
    setZone(() => listOfZones);
  };
  const fetchAllZone = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const allZone = await fetch(`${url}/region/regions`, requestOptions);
      return allZone.json();
    } catch (e) {}
  };
  // **********************************************************************
  // ****** GET YEARS -18 for calender   ***********************************
  //************************************************************************
  const getnewDateForCalender = () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    setMininumDateYears(() => year - 17);
  };
  // **********************************************************************
  // ****** check if use select langue or gender profession   *************
  //************************************************************************
  const selectValidator = value => {
    if (!value || value.length <= 0) {
      return false;
    }

    return true;
  };

  const verifyAll = () => {
    if (dataFormat.length == 0) {
      setDateError('SVP selectionnez votre date de naissance*');
    }

    if (!selectValidator(choseInterrest.value)) {
      setChoseInterrest({
        ...choseInterrest,
        error: 'Vous devez sélectionner au moins une languages*',
      });
    }
    if (!selectValidator(choseZone.value)) {
      setChoseZone({
        ...choseZone,
        error: 'Vous devez sélectionner au moin une region*',
      });
    }
    if (!selectValidator(civil.value)) {
      setCivil({
        ...civil,
        error: 'Vous devez sélectionner votre état civil*',
      });
    }
    if (!selectValidator(situation.value)) {
      setSituation({
        ...civil,
        error: 'Vous devez sélectionner votre situation*',
      });
    }

    return false;
  };

  // ==================================================================================================
  // ============================= HANDLE ALL INPUT WITH FORMIK   =====================================
  // ==================================================================================================
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    validationSchema: RegisterSchema,
    initialValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      cin: '',
      taille: '',
      poids: '',
      sexe: checked,
      dateOfBirth: dataFormat,
      langues: laguageSelected,
      regions: zoneSelected,
      etatCivil: civil.selectedList,
      situationPr: civil.value,
    },
    onSubmit: async values => {
      let myZones = [];
      let mylanguage = choseInterrest.value.split(', ');
      setLaguageSelected(() => mylanguage);
      choseZone.selectedList.map(zone => {
        myZones.push({
          id: zone._id,
          name: zone.value,
        });
      });
      setZoneSelected(() => myZones);
      let data = {
        login: values.username,
        password: values.password,
        cin: values.cin,
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        phone: values.phone,
        address: values.address,
        dateOfBirth: dataFormat,
        regions: myZones,
        etatCivil: civil.value,
        sexe: checked,
        taille: values.taille,
        poids: values.poids,
        langues: choseInterrest.value.split(', '),
        situationPr: situation.value,
      };
      console.log('====================\n', data);

      const check =
        selectValidator(choseInterrest.value) &&
        selectValidator(choseZone.value) &&
        selectValidator(civil.value) &&
        selectValidator(civil.value) &&
        dataFormat.length > 0;
      if (image != null) {
        verifyAll();
        console.log('check:', check);

        if (check) {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          };

          scroll.current.scrollTo({x: 0, y: 0, animated: false});
          let verifyUserName = axios.get(
            `${url}/api/auth/verifyLogin/${values.username}`,
          );
          let verifyEmail = axios.get(
            `${url}/animator/verifyEmail/${values.email}`,
          );
          let verifyCin = axios.get(`${url}/animator/verifyCin/${values.cin}`);
          Promise.all([verifyUserName, verifyEmail, verifyCin]).then(result => {
            console.log('verifyUserName:', result[0].data);
            console.log('verifyEmail:', result[1].data);
            console.log('verifyCin:', result[2].data);
            setToggleUser(() => true);
            if (result[0].data == false) {
              setUserExist(() => false);
            } else {
              setUserExist(() => true);
            }

            setToggleEmail(() => true);
            if (result[1].data == false) {
              setEmailExist(() => false);
            } else {
              setEmailExist(() => true);
            }

            setToggleCin(() => true);

            if (result[2].data == false) {
              setCinExist(() => false);
            } else {
              setCinExist(() => true);
            }

            if (
              result[0].data == false &&
              result[1].data == false &&
              result[2].data == false
            ) {
              setLoading(true);
              console.log('##############################################');
              console.log('########### ALL INPUT VERIFIED ###############');
              console.log('##############################################');
              console.log('====================\n', data);

              axios
                .post(`${url}/animator/addAnimator`, data)
                .then(async animator => {
                  console.log('animator === ', animator.data);
                  console.log('animator === type of ', typeof animator.data);
                  let id = animator.data;
                  console.log('id:', id);
                  console.log('id: typeof ', typeof id);
                  let endPoint = url + '/animator/addImageToAnimator/' + id;
                  await AsyncStorage.setItem('userId', JSON.stringify(id));
                  console.log('endPoint ============> :', endPoint);
                  const requestOptionsImage = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Access-Control-Allow-Origin': '*',
                    },
                    body: image,
                  };

                  const result = await fetch(`${endPoint}`, requestOptionsImage)
                    .then(data => data.json())
                    .then(response =>
                      console.log('######### response #############', response),
                    )
                    .catch(error => console.log('******* error ******', error));
                  let body = {
                    login: values.username,
                    password: values.password,
                  };
                  axios
                    .post(`${url}/api/auth/login`, body)
                    .then(async autoLogin => {
                      console.log('autoLogin:=====> ', autoLogin.data);
                      setUser(() => autoLogin.data);
                      await AsyncStorage.setItem(
                        'user',
                        JSON.stringify(autoLogin.data),
                      );
                      setRole(() => autoLogin.data.role[0]);
                      console.log(
                        'autoLogin.data.role[0]============================:',
                        autoLogin.data.role[0],
                      );

                      try {
                        let fcm = await requestUserPermission();
                        console.log('fcm aimator deive ====> \n:', fcm);
                        let fcmToken = {
                          username: values.username,
                          token: fcm,
                        };
                        await axios.post(
                          `${url}/notification/addAdvice`,
                          fcmToken,
                        );
                      } catch (e) {}
                      setTimeout(() => {
                        setLoading(() => false);
                        setIsAuthenticated(() => true);
                        setLoading(() => false);
                      }, 1000);
                    })
                    .catch(err => {
                      navigation.navigate('Login');
                    });
                })
                .catch(err => {
                  console.log(
                    '############ SOME THING WENT WRONG ! #################',
                  );
                });
            }
          });
        }
      } else {
        alert('veuillez sélectionner votre image !');
      }
    },
  });
  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'column',
          }}>
          <ActivityIndicator size={50} color={Color.primary} />
          <Text style={{fontFamily: Font.primary, fontSize: 16}}>
            authentication ...
          </Text>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={[styles.container, styles.contentContainer]}
            nestedScrollEnabled={true}
            ref={scroll}>
            <View>
              <Text style={styles.title}>Créez votre compte</Text>
            </View>
            <TouchableOpacity style={styles.imageContainer} >
              {cameraResult == null ? (
                <Image
                  style={{
                    width: width / 3,
                    height: height / 6,
                    alignSelf: 'center',
                  }}
                  source={require('../../../assets/images/profile.png')}
                  resizeMode="center"
                />
              ) : (
                <Image
                  style={{
                    width: width / 3,
                    height: height / 6,
                    alignSelf: 'center',
                    borderRadius: 80,
                  }}
                  source={{uri: cameraResult.uri}}
                  resizeMode="center"
                />
              )}
              <Text style={{textAlign: 'center'}}>
                Selectionnez votre image
              </Text>
              <View style={{flex: 1, marginBottom: 5}}>
                <Button onPress={() => pickImg()} >Prendre une photo</Button>
                <Button  onPress={() => pickImgLibrary()} >Gallery</Button>
              </View>
            </TouchableOpacity>
            <View>
              <FormInput
                status={errors.username && touched.username ? 'danger' : 'info'}
                value={values.username}
                placeholder="username"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="account-circle-outline"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                accessoryRight={renderIconUserName}
              />
              <Text style={styles.errors}>
                {touched.username && errors.username}
              </Text>
              <FormInput
                status={
                  errors.firstname && touched.firstname ? 'danger' : 'info'
                }
                value={values.firstname}
                placeholder="firstname"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="card-text-outline"
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
              />
              <Text style={styles.errors}>
                {touched.firstname && errors.firstname}
              </Text>
              <FormInput
                status={errors.lastname && touched.lastname ? 'danger' : 'info'}
                value={values.lastname}
                placeholder="lastname"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="card-text-outline"
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
              />
              <Text style={styles.errors}>
                {touched.lastname && errors.lastname}
              </Text>

              <FormInput
                status={errors.email && touched.email ? 'danger' : 'info'}
                value={values.email}
                placeholder="email"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                accessoryRight={renderIconEmail}
              />
              <Text style={styles.errors}>{touched.email && errors.email}</Text>
              {/* ================================ CIN ======================================= */}

              <FormInput
                status={errors.cin && touched.cin ? 'danger' : 'info'}
                value={values.cin}
                placeholder="cin"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="badge-account-horizontal-outline"
                onChangeText={handleChange('cin')}
                onBlur={handleBlur('cin')}
                accessoryRight={renderIconCin}
                keyboardType="numeric"
                maxLength={8}
              />
              <Text style={styles.errors}>{touched.cin && errors.cin}</Text>
              <FormInput
                status={errors.password && touched.password ? 'danger' : 'info'}
                value={values.password}
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="form-textbox-password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
              />
              <Text style={styles.errors}>
                {touched.password && errors.password}
              </Text>
              <FormInput
                status={
                  errors.confirmPassword && touched.confirmPassword
                    ? 'danger'
                    : 'info'
                }
                value={values.confirmPassword}
                placeholder="Confirm password"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="form-textbox-password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
              />
              <Text style={styles.errors}>
                {touched.confirmPassword && errors.confirmPassword}
              </Text>

              {/* ================================ PHONE ======================================= */}
              <FormInput
                status={errors.phone && touched.phone ? 'danger' : 'info'}
                value={values.phone}
                placeholder="phone"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="phone"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="numeric"
                maxLength={8}
              />
              <Text style={styles.errors}>{touched.phone && errors.phone}</Text>
              {/* ================================ address ======================================= */}

              <FormInput
                status={errors.address && touched.address ? 'danger' : 'info'}
                value={values.address}
                placeholder="address"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="home-city"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
              />
              <Text style={styles.errors}>
                {touched.address && errors.address}
              </Text>

              {/* ================================ TAILLE  ======================================= */}

              <FormInput
                status={errors.taille && touched.taille ? 'danger' : 'info'}
                value={values.taille}
                placeholder="taille"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="human-male-height"
                onChangeText={handleChange('taille')}
                onBlur={handleBlur('taille')}
                keyboardType="numeric"
                maxLength={3}
              />
              <Text style={styles.errors}>
                {touched.taille && errors.taille}
              </Text>
              {/* ================================ POIDS  ======================================= */}

              <FormInput
                status={errors.poids && touched.poids ? 'danger' : 'info'}
                value={values.poids}
                placeholder="poids"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="weight-kilogram"
                onChangeText={handleChange('poids')}
                onBlur={handleBlur('poids')}
                keyboardType="numeric"
                maxLength={3}
              />
              <Text style={styles.errors}>{touched.poids && errors.poids}</Text>
            </View>
            {/* ************************************************************************************************************** */}
            {/* ****************************************************  GENDER    *********************************************** */}
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>
              <Text style={styles.textDate}>Selectionner votre sexe</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <RadioButton
                    status={checked === 'HOMME' ? 'checked' : 'unchecked'}
                    value="HOMME"
                    onPress={() => setChecked('HOMME')}
                    color={Color.primary}
                  />
                  <Text>HOMME</Text>
                </View>
                <View>
                  <RadioButton
                    value="FEMME"
                    status={checked === 'FEMME' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('FEMME')}
                    color={Color.primary}
                  />
                  <Text>FEMME</Text>
                </View>
              </View>
            </View>
            {/* ************************************************************************************************************** */}
            {/* ****************************************************  DATE PICKER   ******************************************** */}
            {datePicker && (
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelected}
                style={styles.datePicker}
                maximumDate={new Date(minimunYears, 1, 1)}
              />
            )}
            <Text style={styles.textDate}>
              Selectionner votre Date de naissance
            </Text>

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={showDatePicker}>
              <MaterialCommunityIcons
                name="calendar"
                size={45}
                color={Color.primary}
              />
              <Text style={styles.textDate}>{dataFormat.toLocaleString()}</Text>
            </TouchableOpacity>
            <Text style={[styles.textDate, {color: 'red', fontSize: 14}]}>
              {dateError}
            </Text>

            {/* ************************************************************************************************************** */}
            {/* ****************************************************  LANGUE   *********************************************** */}
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
                label="Selectionnez vos languages"
                value={choseInterrest.value}
                onSelection={value => {
                  setChoseInterrest({
                    ...choseInterrest,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                  });
                }}
                arrayList={[...choseInterrest.list]}
                selectedArrayList={choseInterrest.selectedList}
                errorText={choseInterrest.error}
                multiEnable={true}
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
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                width: '93%',
                alignSelf: 'center',
              }}>
              <PaperSelect
                label="Selectionnez votre Region "
                value={choseZone.value}
                onSelection={value => {
                  setChoseZone({
                    ...choseZone,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                  });
                }}
                arrayList={[...choseZone.list]}
                selectedArrayList={choseZone.selectedList}
                errorText={choseZone.error}
                multiEnable={true}
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
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                width: '93%',
                alignSelf: 'center',
              }}>
              <PaperSelect
                label="Selectionnez votre situation "
                value={situation.value}
                onSelection={value => {
                  setSituation({
                    ...situation,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                  });
                }}
                arrayList={[...situation.list]}
                selectedArrayList={situation.selectedList}
                errorText={situation.error}
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
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                width: '93%',
                alignSelf: 'center',
              }}>
              <PaperSelect
                label="Selectionnez votre étt civil "
                value={civil.value}
                onSelection={value => {
                  setCivil({
                    ...civil,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                  });
                }}
                arrayList={[...civil.list]}
                selectedArrayList={civil.selectedList}
                errorText={civil.error}
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
            {/* <MultiSelectZone zone={zone} /> */}

            <Button onPress={handleSubmit} style={{marginBottom: 30}}>
              SUBMIT
            </Button>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default AnimatorRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
    marginTop: StatusBar.currentHeight / 2,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  title: {
    color: Color.dark,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: Font.quadriary,
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  errors: {
    color: 'red',
    marginLeft: '6%',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  textDate: {
    fontSize: 16,
    color: '#000',
    padding: 3,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
