import { Text, 
    StyleSheet, 
    View, 
    Image, 
    Pressable ,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableWithoutFeedback,
    ActivityIndicator,
    PermissionsAndroid,
    Modal} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../../assets/new/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

import React, { useState, useEffect, useRef } from "react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { FormInput } from "../components/FormInput/FormInput";
import { height, width } from "../utils/Dimention";
import { PaperSelect } from "react-native-paper-select";
import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Feather from "react-native-vector-icons/Feather";

import axios from "axios";
import { Button } from "@ui-kitten/components";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { useRecoilValue, useRecoilState } from "recoil";
import {
allZoneSelected,
alreadySingnedIn,
api,
selectedCivilAtom,
selectedLanguetAtom,
selectedSituationAtom,
selectedZoneAtom,
userId,
userRole,
userStorage,
} from "../atom/authState";
// import * as DocumentPicker from "expo-document-picker";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";


const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .required("requis*")
      .min(3, "l'username doit comporter au moins 3 caractères ")
      .max(15, "le nom  doit comporter moins de 15 caractères")
      .matches(/^(?!\s*$).+/, "Le nom est requis*")
      .trim(),
    firstname: Yup.string()
      .required("Le nom est requis*")
      .min(3, "le nom doit comporter au moins 3 caractères ")
      .max(15, "le nom  doit comporter moins de 15 caractères")
      .matches(/^[A-Za-z ]+$/,
      "le nom est obligatoire et accepte  que des lettres*")
      .trim(),
    lastname: Yup.string()
      .required("nom obligatoire*")
      .matches(
        /^[A-Za-z ]+$/,
        "le nom est obligatoire et accepte  que des lettres*"
      )
      .trim(),
    email: Yup.string().email("Invalid email*").required("Required*").trim(),
    password: Yup.string()
      .min(6, "mot de passe doit etre 6 caractères au minimum*")
      .required("mot de pass requis!")
      .trim(),
    phone: Yup.string()
      .required("numero du telephone obligatoire*")
      .min(8, "numéro doit etre  8 chiffres*")
      .required("Numéro de téléphone obligatoire*"),
  });
  
const InscriptionSup1 = () => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(
    alreadySingnedIn
  );
  const [formImg, setFormImg] = useState(new FormData())
  // const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [id, setUserId] = useRecoilState(userId);
  const [minimunYears, setMininumDateYears] = useState(1995);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dataFormat, setDateFormat] = useState("");
  const [dateError, setDateError] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(undefined);
  const [zone, setZone] = useState([]);
  const [zoneSelected, setZoneSelected] = useState([]);
  const [laguageSelected, setLaguageSelected] = useState([]);
  const selectedZone = useRecoilValue(allZoneSelected);
  const [checked, setChecked] = useState("");
  const [permis, setPermis] = useState();
  const [voiture, setVoiture] = useState();
  const [user, setUser] = useRecoilState(userStorage)
  const [choseInterrest, setChoseInterrest] = useRecoilState(
    selectedLanguetAtom
  );
  const [cameraResult, setCameraResult] = useState();

  const [choseZone, setChoseZone] = useRecoilState(selectedZoneAtom);
  const [civil, setCivil] = useRecoilState(selectedCivilAtom);
  const [situation, setSituation] = useRecoilState(selectedSituationAtom);

  // verify username , email and cin if exist in database

  const [userExist, setUserExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [cinExist, setCinExist] = useState(false);

  const [toggleUser, setToggleUser] = useState(false);
  const [toggleEmail, setToggleEmail] = useState(false);
    const [register, setRegister] =useRecoilState(userId)
  const [toggleCin, setToggleCin] = useState(false);
 const [role, setRole] = useRecoilState(userRole)
  const url = useRecoilValue(api);
  const scroll = useRef();
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
  }, []);

  useEffect(() => {
  }, []);

  const toggleSecureEntry = () => {
    setSecureTextEntry(() => !secureTextEntry);
  };
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={() => toggleSecureEntry()}>
      <Feather
        size={24}
        color="black"
        name={secureTextEntry ? "eye-off" : "eye"}
      />
    </TouchableWithoutFeedback>
  );

  const renderIconUserName = (props) => (
    <>
      {toggleUser ? (
        <MaterialCommunityIcons
          size={24}
          color={userExist ? "red" : "green"}
          {...props}
          name={userExist ? "close-circle-outline" : "check-bold"}
        />
      ) : null}
    </>
  );
  const renderIconEmail = (props) => (
    <>
      {toggleEmail ? (
        <MaterialCommunityIcons
          size={24}
          color={emailExist ? "red" : "green"}
          {...props}
          name={emailExist ? "close-circle-outline" : "check-bold"}
        />
      ) : null}
    </>
  );
  const renderIconCin = (props) => (
    <>
      {toggleCin ? (
        <MaterialCommunityIcons
          size={24}
          color={cinExist ? "red" : "green"}
          {...props}
          name={cinExist ? "close-circle-outline" : "check-bold"}
        />
      ) : null}
    </>
  );

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
  // **********************************************************************
  // ****** check if use select langue or gender profession   *************
  //************************************************************************
  const selectValidator = (value) => {
    if (!value || value.length <= 0) {
      return false;
    }

    return true;
  };

  const verifyAll = () => {
    if (dataFormat.length == 0) {
      setDateError("SVP selectionnez votre date de naissance*");
    }

    // if (!selectValidator(choseInterrest.value)) {
    //   setChoseInterrest({
    //     ...choseInterrest,
    //     error: "Vous devez sélectionner au moins une languages*",
    //   });
    // }
    if (!selectValidator(choseZone.value)) {
      setChoseZone({
        ...choseZone,
        error: "Vous devez sélectionner au moin une zone*",
      });
    }
    if (!selectValidator(civil.value)) {
      setCivil({
        ...civil,
        error: "Vous devez sélectionner votre état civil*",
      });
    }
    // if (!selectValidator(situation.value)) {
    //   setSituation({
    //     ...civil,
    //     error: "Vous devez sélectionner votre situation*",
    //   });
    // }

    return false;
  };

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
        console.log("Authorization status:", authStatus);
      }
      const token = await messaging().getToken();
      console.log("fcm token:", token);
      await AsyncStorage.setItem("fcm", JSON.stringify(token));
      return token;
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
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
    },
    onSubmit: async (values) => {
      
      if (image != null) {
        let data = {
          login: values.username,
          password: values.password,
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          phone: values.phone,
          image: image
        };
        verifyAll();
        let verifyUserName = axios.get(
          `${url}/api/auth/verifyLogin/${values.username}`
        );
        let verifyEmail = axios.get(
          `${url}/supervisor/verifyEmail/${values.email}`
        );
        Promise.all([verifyUserName, verifyEmail]).then(async (result) => {
          console.log("verifyUserName:", result[0].data);
            console.log("verifyEmail:", result[1].data);

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

          if (
            result[0].data == false &&
            result[1].data == false
          ) {
            console.log(data);
            navigation.navigate('InscriptionSup2',{sup:data})
          }else{
            console.log(result);
          }
        });
      } else {
        alert("veuillez sélectionner votre image !");
      }
    },
  });

  return (
    <View style={styles.inscriptionsup1}>
      <Text style={[styles.crerVotreCompte, styles.tape1Typo]}>
        Créer votre compte
      </Text>
      <Text style={[styles.veuillezRenseignerTous, styles.tape1Typo]}>
        Veuillez renseigner tous les champs
      </Text>
      <Text style={[styles.tape1, styles.tape1Typo]}>Étape : 1</Text>
      <View style={styles.formControl}>
        <FormInput
            status={
                errors.firstname && touched.firstname ? "danger" : "info"
            }
            value={values.firstname}
            placeholder="Prénom"
            placeholderTextColor="black"
            style={[styles.placeholderFirstName, styles.placeholderTypo]}
            onChangeText={handleChange("firstname")}
            onBlur={handleBlur("firstname")}
            />
        <Text style={styles.errors}>
            {touched.firstname && errors.firstname}
        </Text>
      </View>
      <View style={[styles.formControl1, styles.formPosition]}>
        <FormInput
            status={errors.lastname && touched.lastname ? "danger" : "info"}
            value={values.lastname}
            placeholder="Nom"
            placeholderTextColor="black"
            style={[styles.placeholderLastName, styles.placeholderTypo]}
            onChangeText={handleChange("lastname")}
            onBlur={handleBlur("lastname")}
        />
        <Text style={styles.errors}>
            {touched.lastname && errors.lastname}
        </Text>
      </View>
      <View style={[styles.formControl2, styles.formLayout]}>
        <FormInput
            status={errors.email && touched.email ? "danger" : "info"}
            value={values.email}
            placeholder="email@email.com"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            accessoryRight={renderIconEmail}
        />
        <Text style={styles.errors}>{touched.email && errors.email}</Text>
      </View>
      <View style={[styles.formControl3, styles.formLayout]}>
        <FormInput
            status={errors.username && touched.username ? "danger" : "info"}
            value={values.username}
            placeholder="Username"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            accessoryRight={renderIconUserName}
        />
        <Text style={styles.errors}>
            {touched.username && errors.username}
        </Text>
      </View>
      <View style={[styles.formControl4, styles.formLayout]}>
        <FormInput
            status={errors.password && touched.password ? "danger" : "info"}
            value={values.password}
            placeholder="Mot de passe"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
        />
        <Text style={styles.errors}>
            {touched.password && errors.password}
        </Text>
      </View>
      <View style={[styles.formControl5, styles.formLayout]}>
        <FormInput
          status={errors.phone && touched.phone ? "danger" : "info"}
          value={values.phone}
          placeholder="Téléphone"
          placeholderTextColor="black"
          style={[styles.placeholder, styles.placeholderTypo]}
          onChangeText={handleChange("phone")}
          onBlur={handleBlur("phone")}
          keyboardType="numeric"
          maxLength={8}
        />
        <Text style={styles.errors}>{touched.phone && errors.phone}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.formLayout]}
        onPress={handleSubmit}
      >
        <Text style={[styles.label, styles.labelPosition]}>Suivant</Text>
      </TouchableOpacity>
      <Text 
        style={[styles.retourAuLogin, styles.placeholderTypo]}
        onPress={() => navigation.navigate("LoginPage")}
    >
        Retour au login
      </Text>
      <TouchableOpacity
  style={[styles.avatarIcon, styles.iconLayout]}
  onPress={() => setModalVisible(true)}
>
  {cameraResult == null ? (
    <Image
      style={{
        width: width / 3,
        height: height / 6,
        alignSelf: "center",
      }}
      source={require("../../assets/images/profile.png")}
      resizeMode="center"
    />
  ) : (
    <Image
      style={{
        width: width / 3,
        height: height / 6,
        alignSelf: "center",
        borderRadius: 80,
      }}
      source={{ uri: cameraResult.uri }}
      resizeMode="center"
    />
  )}
</TouchableOpacity>

{/* Modal */}
<Modal
  transparent={true}
  animationType="slide"
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Button style={styles.buttonImage} onPress={() => pickImg()}>Prendre une photo</Button>
      <Button style={styles.buttonImage} onPress={() => pickImgLibrary()}>Gallerie</Button>
      <Text style={styles.buttonAnnuler} onPress={() => setModalVisible(false)}>Annuler</Text>
    </View>
  </View>
</Modal>
</View>
  );
};

const styles = StyleSheet.create({
  tape1Typo: {
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.hindJalandhar,
    textAlign: "left",
    position: "absolute",
  },
  timePosition: {
    letterSpacing: 0,
    position: "absolute",
  },
  placeholderTypo: {
    fontSize: FontSize.mainBodyRegular_size,
    position: "absolute",
  },
  labelPosition: {
    marginTop: -12,
    top: "50%",
    position: "absolute",
  },
  formPosition: {
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
  },
  formLayout: {
    width: "82.67%",
    borderRadius: Border.br_6xs,
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  crerVotreCompte: {
    width: "72.8%",
    top: "0.5%",
    fontSize: FontSize.size_7xl,
    textAlign: "left",
    fontWeight: "700",
    left: "19.47%",
    height: "10.43%",
  },
  veuillezRenseignerTous: {
    width: "92.8%",
    top: "5%",
    left: "7.4%",
    fontSize: FontSize.size_xl,
    textAlign: "left",
    height: "10.43%",
  },
  time: {
    top: 0,
    left: 0,
    fontSize: FontSize.size_mini,
    lineHeight: 18,
    fontFamily: FontFamily.hindBold,
    color: Color.colorGray_300,
    textAlign: "center",
    width: 54,
    fontWeight: "700",
  },
  action: {
    top: 14,
    left: 15,
    height: 18,
    width: 54,
    position: "absolute",
  },
  containerIcon: {
    marginTop: -5.8,
    width: 67,
    height: 12,
    right: 20,
    top: "50%",
    position: "absolute",
  },
  notificationBar: {
    height: "5.42%",
    top: "0%",
    right: "0%",
    bottom: "94.58%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  tape1: {
    height: "10.28%",
    width: "50.47%",
    top: "8%",
    left: "28%",
    fontSize: FontSize.size_24xl,
    textAlign: "left",
    fontWeight: "700",
  },
  placeholder: {
    marginTop: -9,
    left: "4%",
    fontFamily: FontFamily.mainCaptionRegular,
    color: Color.darkDark2,
    top: "50%",
    textAlign: "left",
    width:"92%",
    backgroundColor: Color.colorWhitesmoke_400,
  },
  placeholderLastName: {
    marginTop: -9,
    left: "25%",
    fontFamily: FontFamily.mainCaptionRegular,
    color: Color.darkDark2,
    top: "50%",
    textAlign: "left",
    width:"80%",
    backgroundColor: Color.colorWhitesmoke_400,
  },
  placeholderFirstName: {
    marginTop: -9,
    left: "25%",
    fontFamily: FontFamily.mainCaptionRegular,
    color: Color.darkDark2,
    top: "50%",
    textAlign: "left",
    width:"80%",
    backgroundColor: Color.colorWhitesmoke_400,
  },
  iconsByRemixIconV250: {
    width: 24,
    height: 24,
    right: 20,
    overflow: "hidden",
  },
  formControl: {
    width: "40.53%",
    top: "40.64%",
    right: "50.67%",
    backgroundColor: Color.colorWhitesmoke_400,
    borderRadius: Border.br_6xs,
    left: "8.8%",
    bottom: "53.2%",
    height: "6.16%",
    position: "absolute",
    overflow: "hidden",
  },
  formControl1: {
    height: "5.91%",
    width: "40%",
    top: "40.89%",
    left: "51.47%",
    borderRadius: Border.br_6xs,
    bottom: "53.2%",
    right: "8.53%",
    position: "absolute",
    overflow: "hidden",
  },
  formControl2: {
    top: "48.03%",
    bottom: "45.81%",
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
    left: "8.8%",
    height: "6.16%",
    width: "82.67%",
  },
  formControl3: {
    top: "55.3%",
    bottom: "38.55%",
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
    left: "8.8%",
    height: "6.16%",
    width: "82.67%",
  },
  formControl4: {
    top: "62.56%",
    bottom: "31.28%",
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
    left: "8.8%",
    height: "6.16%",
    width: "82.67%",
  },
  formControl5: {
    top: "71.18%",
    bottom: "22.66%",
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
    left: "8.8%",
    height: "6.16%",
    width: "82.67%",
  },
  label: {
    marginLeft: -30,
    left: "50%",
    fontSize: FontSize.size_lg,
    fontWeight: "600",
    fontFamily: FontFamily.hindSemiBold,
    color: Color.lightLight1,
    textAlign: "center",
  },
  button: {
    top: "82.42%",
    right: "7.73%",
    bottom: "15.15%",
    left: "9.6%",
    backgroundColor: Color.colorRoyalblue_100,
    height: "7%",
  },
  retourAuLogin: {
    height: "4.93%",
    width: "61.07%",
    top: "92.73%",
    fontWeight: "300",
    fontFamily: FontFamily.hindLight,
    color: Color.darkDark1,
    textAlign: "center",
    left: "19.47%",
  },
  rectangleIcon: {
    height: "0.62%",
    width: "39.47%",
    top: "98.52%",
    right: "28.53%",
    bottom: "0.86%",
    left: "32%",
    borderRadius: Border.br_81xl,
  },
  avatarIcon: {
    height: "20%",
    width: "50%",
    top: "20.42%",
    right: "43.2%",
    bottom: "62.55%",
    left: "25.8%",
  },
  slectionnerVotreImage: {
    width: "100%",
    top: "50.44%",
    left: "0%",
    fontSize: FontSize.mainCaptionRegular_size,
    lineHeight: 22,
    fontFamily: FontFamily.interRegular,
    color: Color.greyLine,
    textAlign: "left",
    flexDirection: 'row',
  },
  inscriptionsup1: {
    backgroundColor: Color.lightLight1,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
  errors: {
    color: "red",
    marginLeft: "6%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttonImage: {
    marginTop:10,
    padding: 20,
    borderRadius: 10,
  },
  buttonAnnuler: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: '30%',

  },
});

export default InscriptionSup1;
