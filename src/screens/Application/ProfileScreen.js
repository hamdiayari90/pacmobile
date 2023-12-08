import React, {useState, useEffect,useRef,useMemo,useCallback} from 'react'
import { height, width } from "../../utils/Dimention";
import * as apii from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from "yup";
import { useFormik, yupToFormErrors } from "formik";
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
} from "react-native";
import { Color, Font } from "../../utils/Constant";
import { FormInput } from "../../components/FormInput/FormInput";
import {
  selectedCivilAtom,
  selectedZoneAtom,
  api,
  selectedLanguetAtom,

} from "../../atom/authState";
import { useRecoilValue, useRecoilState } from "recoil";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PaperSelect } from "react-native-paper-select";
import { Button } from "@ui-kitten/components";
import Feather from "react-native-vector-icons/Feather";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from "moment";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";


export const ProfileScreen = () => {

  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [zone, setZone] = useState([]);
  const [loading, setLoading] = useState(true);
  const scroll = useRef();
  const [image, setImage] = useState(null);
  const [cameraResult, setCameraResult] = useState();
  const [checked, setChecked] = useState("");
  const [laguageSelected, setLaguageSelected] = useState([]);
  const [zoneSelected, setZoneSelected] = useState([]);
  const [civil, setCivil] = useRecoilState(selectedCivilAtom);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [permis, setPermis] = useState();
  const [voiture, setVoiture] = useState();
  const [minimunYears, setMininumDateYears] = useState(1995);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dataFormat, setDateFormat] = useState("");
  const [dateError, setDateError] = useState("");
  const [choseZone, setChoseZone] = useRecoilState(selectedZoneAtom);
  const [toggleUser, setToggleUser] = useState(false);
  const [toggleEmail, setToggleEmail] = useState(false);
  const [toggleCin, setToggleCin] = useState(false);
  const [role, setRole] = useState(true);
  const url = useRecoilValue(api);
  const [choseLangue, setChoseLangue] = useRecoilState(selectedLanguetAtom);
  const [userExist, setUserExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [cinExist, setCinExist] = useState(false);

  useEffect( () => {
    const value =  AsyncStorage.getItem('user').then(res => {
      apii.getUserById(JSON.parse(res).id).then(response=>{
        setUser(()=>response.data);
        apii.getRegions().then(res=>{
          setZone(res.data);
          console.log("userrrrr",user);
          console.log("regions",res.data);
          console.log("zoneeee",zone);
          initValue(response.data,res.data);

        })
      })
    });
  }, []);

  const selectValidator = value => {
    if (!value || value.length <= 0) {
      return false;
    }

    return true;
  };

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
      .trim(),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "confirmation de mot de passe est incorrecte"
      )
      .trim(),
    phone: Yup.string()
      .required("numero du telephone obligatoire*")
      .min(8, "numéro doit etre  8 chiffres*")
      .required("Numéro de téléphone obligatoire*"),
    address: Yup.string()
      .required("Address  est requis*")
      .min(4, "l'address doit comporter au moins 4 caractères ")
      .max(15, "le address  doit comporter moins de 15 caractères")
      .trim(),
    cin: Yup.string()
      .required("le numéro cin est requis*")
      .min(8, "le numero de téphone doit etre 8 numéro"),
    // etatCivil: Yup.string().required("l'etat civil est requis"),
    taille: Yup.string("taille est requis"),
    sexe: Yup.string(),
    poids: Yup.string()
      .required("le poids est requis*")
      .min(2, "votre poids ne depasse pas 2 chiffre*")
      .max(3, "votre taille ne depasse pas 3 chiffre*"),
    taille: Yup.string()
      .required("votre taille  est requis*")
      .min(3, "votre taille ne depasse pas 3 chiffre*")
      .max(3, "votre taille ne depasse pas 3 chiffre*"),
  });

  
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
      confirmPassword: "",
      phone: "",
      address:"",
      cin: "",
      taille: "",
      poids: "",
      sexe: checked,
      dateOfBirth: dataFormat,
      langues: laguageSelected,
      zone: zoneSelected,
      etatCivil: civil.selectedList,
      situationPr: civil.value,
    },onSubmit: async (values) => {
      let myZones = [];
      
      choseZone.selectedList.map((zone) => {
        myZones.push({
          id: zone._id,
          name: zone.value,
        });
      });
      setZoneSelected(() => myZones);
      let data;
      let verifyUserName;
      let verifyEmail;
      let verifyCin;
      if (role){
         data = {
          id:user.id,
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
          permis: permis,
          vehicule: voiture,
          role: user.role
        };
        verifyUserName = axios.get(
          `${url}/api/auth/verifyLogin/${values.username}`
        );
        verifyEmail = axios.get(
          `${url}/supervisor/verifyEmail/${values.email}`
        );
        verifyCin = axios.get(
          `${url}/supervisor/verifyCin/${values.cin}`
        );
      }else{
        let mylanguage = choseLangue.value.split(", ");
        setLaguageSelected(() => mylanguage);
        data = {
          id:user.id,
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
          langues: choseLangue.value.split(', '),
        };
        verifyUserName = axios.get(
          `${url}/api/auth/verifyLogin/${values.username}`,
        );
        verifyEmail = axios.get(
          `${url}/animator/verifyEmail/${values.email}`,
        );
        verifyCin = axios.get(`${url}/animator/verifyCin/${values.cin}`);
      }
      

      const check =
        // selectValidator(choseInterrest.value) &&
        selectValidator(choseZone.value) &&
        selectValidator(civil.value) &&
        // selectValidator(civil.value) &&
        dataFormat.length > 0;
        if (check) {
          scroll.current.scrollTo({ x: 0, y: 0, animated: false });
          Promise.all([verifyUserName, verifyEmail, verifyCin]).then(async (result) => {
            console.log("verify super visor cin ====> :", result[0].data);
            console.log("verifyUserName:", result[0].data);
              console.log("verifyEmail:", result[1].data);
              console.log("verifyCin:", result[2].data);

            setToggleUser(() => true);
            if (result[0].data == false) {
              setUserExist(() => false);
            } else if (!(values.username==user.login)){
              setUserExist(() => true);
            }

            setToggleEmail(() => true);
            if (result[1].data == false) {
              setEmailExist(() => false);
            } else if (!(values.email==user.email)){
              setEmailExist(() => true);
            }

            setToggleCin(() => true);

            if (result[2].data == false) {
              setCinExist(() => false);
            } else if (!(values.cin==user.cin)){
              setCinExist(() => true);
            }

            if (
              userExist == false &&
              emailExist == false &&
              cinExist == false
            ) {
              setLoading(true);
              if (role){
                console.log("##############################################");
                console.log("########### ALL INPUT VERIFIED ###############");
                console.log("##############################################");
                const requestaddAnimator = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify(data),
                };
                console.log("***********************",data);
                await fetch(`${url}/supervisor/updateProfileMobile`, requestaddAnimator)
                  .then((data) => data.text())
                  .then(async (animator) => {
                    console.log("sup:", animator);
                    
                    // axios
                    //   .post(`${url}/supervisor/addSupervisor`, data)
                    //   .then(async (animator) => {
                    console.log("sup === ", animator);
                    console.log("sup === type of ", typeof animator);
                    await AsyncStorage.setItem(
                      "userId",
                      JSON.stringify(animator)
                    );
                    await AsyncStorage.setItem("image", JSON.stringify(false));
  
                    let formData = new FormData();
                    formData.append("image", image);
  
                    console.log('image ===============> ', image)
                      let endPoint =  url +'/supervisor/addImageToSupervisor/'+ data.id
                     // console.log('animator:', animator)
        
                    const requestOptionsImage = {
                      method: "POST",
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: formData,
                    };
                    const result = await fetch(
                      `${endPoint}`,
                      requestOptionsImage
                    )
                      .then((data) => data.json())
                      .then((response) =>{
                        console.log("######### response #############", response.data);
                        setLoading(false);
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "Acceuil" }],
                        });
                      })
                      .catch((error) =>
                        console.log("******* error ******", error)
                      );
                  })
                  .catch((err) => {
                    console.log("err:", err);
                    console.log(
                      "############ SOME THING WENT WRONG ! #################"
                    );
                  });
              }else{
                console.log('##############################################');
                console.log('########### ALL INPUT VERIFIED ###############');
                console.log('##############################################');
                console.log('====================\n', data);
  
                axios
                  .put(`${url}/animator/updateProfileMobile`, data)
                  .then(async animator => {
                    console.log('animator === ', animator.data);
                    console.log('animator === type of ', typeof animator.data);
                    let id = animator.data;
                    console.log('id:', id);
                    console.log('id: typeof ', typeof id);
                    let endPoint = url + '/animator/addImageToAnimator/' + data.id;
                    await AsyncStorage.setItem('userId', JSON.stringify(id));
                    console.log('endPoint ============> :', endPoint);
                    let formData = new FormData();
                    formData.append("image", image);
                    const requestOptionsImage = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*',
                      },
                      body: formData,
                    };
  
                    const result = await fetch(`${endPoint}`, requestOptionsImage)
                      .then(data => data.json())
                      .then(response => {
                          console.log("######### response #############", response.data);
                          setLoading(false);
                          navigation.reset({
                            index: 0,
                            routes: [{ name: "Acceuil" }],
                          });
                      })
                      .catch(error => console.log('******* error ******', error));
                  })
                  .catch(err => {
                    console.log(
                      '############ SOME THING WENT WRONG ! #################',
                    );
                  });

              }
              
            }
          });
        }
    },})

    function initValue(userr,regions){
      let listOfZones = [];
      regions.map((el) => {
        listOfZones.push({ _id: el.id, value: el.name });
      });
      setChoseZone({
        ...choseZone,
        list: listOfZones,
      });
      console.log("listOfZones",choseZone.list);

      setZone(regions);
      setZoneSelected(userr.regions);
      values.username= userr.login;
      values.firstname= userr.firstName;
      values.lastname= userr.lastName;
      values.email= userr.email; 
      values.password= "";
      values.confirmPassword= "";
      values.phone= userr.phone.toString();
      values.address= userr.address;
      values.cin= userr.cin;
      values.taille= userr.taille;
      values.poids= userr.poids;
      values.sexe= userr.sexe;
      setChecked(userr.sexe);
      values.dateOfBirth= userr.dateOfBirth;
      setDateFormat(userr.dateOfBirth);
      if (!role){
        values.langues= userr.langues;
        setChoseLangue({
          ...choseLangue,
          selectedList: userr.langues,
          value: userr.langues
        })
      }
      
      values.zone= userr.regions;
      setChoseZone({
        ...choseZone,
        list: listOfZones,
      });
      values.etatCivil= userr.etatCivil;
      setCivil({
        ...civil,
        value: userr.etatCivil,
        selectedList: userr.etatCivil,
        error: "",
      });
      values.situationPr= userr.etatCivil;
      if (userr.role=="SUPERVISOR"){
        setPermis(userr.permis);
        setVoiture(userr.vehicule)
      }else{
        setRole(false);
      }
      setLoading(false);

    }

    function showDatePicker() {
      setDatePicker(true);
    }
    function onDateSelected(event, value) {
      setDateError(() => "");
      setDatePicker(() => false);
  
      setDate(() => value);
      setDateFormat(() => moment(value).format("YYYY/MM/DD"));
    }

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

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator size={50} color={Color.primary} />
          <Text style={{ fontFamily: Font.primary, fontSize: 16 }}>
            authentication ...
          </Text>
        </View>
      ) : (
      <View style={{flex: 1, backgroundColor: Color.light}}>
        <SafeAreaView  style={styles.container}>
          <ScrollView
            style={[styles.container, styles.contentContainer]}
            nestedScrollEnabled={true}
            ref={scroll}
          >
            <View>
              <Text style={styles.title}>Modifier votre compte</Text>
            </View>
            <TouchableOpacity style={styles.imageContainer} 
              
              >
              {cameraResult == null ? (
                <Image
                  style={{
                    width: width / 3,
                    height: height / 6,
                    alignSelf: "center",
                    borderRadius: 80,
                  }}
                  source={{
                    uri: `http://149.202.214.99:8085/PAC/Supervisor/${user.image.name}`,
                  }}
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
                  source={{uri: cameraResult.uri}}
                  resizeMode="center"
                />
              )}
              <View style={{flex: 1, marginBottom: 5}}>
                <Button onPress={() => pickImg()} >Prendre une photo</Button>
                <Button  onPress={() => pickImgLibrary()} >Gallery</Button>
              </View>
            </TouchableOpacity>
            <View>
              <FormInput
                status={errors.username && touched.username ? "danger" : "info"}
                value={values.username}
                placeholder="username"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="account-circle-outline"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                accessoryRight={renderIconUserName}
              />
              <Text style={styles.errors}>
                {touched.username && errors.username}
              </Text>
              <FormInput
                status={
                  errors.firstname && touched.firstname ? "danger" : "info"
                }
                value={values.firstname}
                placeholder="firstname"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="card-text-outline"
                onChangeText={handleChange("firstname")}
                onBlur={handleBlur("firstname")}
              />
              <Text style={styles.errors}>
                {touched.firstname && errors.firstname}
              </Text>
              <FormInput
                status={errors.lastname && touched.lastname ? "danger" : "info"}
                value={values.lastname}
                placeholder="lastname"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="card-text-outline"
                onChangeText={handleChange("lastname")}
                onBlur={handleBlur("lastname")}
              />
              <Text style={styles.errors}>
                {touched.lastname && errors.lastname}
              </Text>

              <FormInput
                status={errors.email && touched.email ? "danger" : "info"}
                value={values.email}
                placeholder="email"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                accessoryRight={renderIconEmail}
              />
              <Text style={styles.errors}>{touched.email && errors.email}</Text>
              <FormInput
                status={errors.cin && touched.cin ? "danger" : "info"}
                value={values.cin}
                placeholder="cin"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="badge-account-horizontal-outline"
                onChangeText={handleChange("cin")}
                onBlur={handleBlur("cin")}
                accessoryRight={renderIconCin}
                keyboardType="numeric"
                maxLength={8}
              />
              <Text style={styles.errors}>{touched.cin && errors.cin}</Text>
              <FormInput
                status={errors.password && touched.password ? "danger" : "info"}
                value={values.password}
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="form-textbox-password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
              />
              <Text style={styles.errors}>
                {touched.password && errors.password}
              </Text>
              <FormInput
                status={
                  errors.confirmPassword && touched.confirmPassword
                    ? "danger"
                    : "info"
                }
                value={values.confirmPassword}
                placeholder="Confirm password"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="form-textbox-password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
              />
              <Text style={styles.errors}>
                {touched.confirmPassword && errors.confirmPassword}
              </Text>
              <FormInput
                status={errors.phone && touched.phone ? "danger" : "info"}
                value={values.phone}
                placeholder="phone"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="phone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                keyboardType="numeric"
                maxLength={8}
              />
              <Text style={styles.errors}>{touched.phone && errors.phone}</Text>
              <FormInput
                status={errors.address && touched.address ? "danger" : "info"}
                value={values.address}
                placeholder="address"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="home-city"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
              />
              <Text style={styles.errors}>
                {touched.address && errors.address}
              </Text>
              <FormInput
                status={errors.taille && touched.taille ? "danger" : "info"}
                value={values.taille}
                placeholder="taille"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="human-male-height"
                onChangeText={handleChange("taille")}
                onBlur={handleBlur("taille")}
                keyboardType="numeric"
                maxLength={3}
              />
              <Text style={styles.errors}>
                {touched.taille && errors.taille}
              </Text>
              <FormInput
                status={errors.poids && touched.poids ? "danger" : "info"}
                value={values.poids}
                placeholder="poids"
                placeholderTextColor="black"
                style={styles.textInput}
                iconType="weight-kilogram"
                onChangeText={handleChange("poids")}
                onBlur={handleBlur("poids")}
                keyboardType="numeric"
                maxLength={3}
              />
              <Text style={styles.errors}>{touched.poids && errors.poids}</Text>
            </View>
            {datePicker && (
              <DateTimePicker
                value={date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
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
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={showDatePicker}
            >
              <MaterialCommunityIcons
                name="calendar"
                size={45}
                color={Color.primary}
              />
              <Text style={styles.textDate}>{dataFormat.toLocaleString()}</Text>
            </TouchableOpacity>
            <Text style={[styles.textDate, { color: "red", fontSize: 14 }]}>
              {dateError}
            </Text>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <Text style={styles.textDate}>Selectionner votre sexe</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <RadioButton
                    status={values.sexe === "HOMME" ? "checked" : "unchecked"}
                    value="HOMME"
                    onPress={() => setChecked("HOMME")}
                    color={Color.primary}
                  />
                  <Text>HOMME</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <RadioButton
                    value="FEMME"
                    status={values.sexe === "FEMME" ? "checked" : "unchecked"}
                    onPress={() => setChecked("FEMME")}
                    color={Color.primary}
                  />
                  <Text>FEMME</Text>
                </View>
              </View>
            </View>
            {
              role ? (
                <>
                  <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <Text style={styles.textDate}>Avez-vous un permis</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <RadioButton
                    status={permis === false ? "checked" : "unchecked"}
                    value={permis}
                    onPress={() => setPermis(() => false)}
                    color={Color.primary}
                  />
                  <Text>non</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <RadioButton
                    value={permis}
                    status={permis === true ? "checked" : "unchecked"}
                    onPress={() => setPermis(() => true)}
                    color={Color.primary}
                  />
                  <Text>oui</Text>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignSelf: "center" }}>
              <Text style={styles.textDate}>Avez-vous une véhicule</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <RadioButton
                    status={voiture === false ? "checked" : "unchecked"}
                    value={voiture}
                    onPress={() => setVoiture(() => false)}
                    color={Color.primary}
                  />
                  <Text>non</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <RadioButton
                    value={voiture}
                    status={voiture === true ? "checked" : "unchecked"}
                    onPress={() => setVoiture(() => true)}
                    color={Color.primary}
                  />
                  <Text>oui</Text>
                </View>
              </View>
            </View>
                </>
              ):(<View
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
                  value={choseLangue.value}
                  onSelection={value => {
                    setChoseLangue({
                      ...choseLangue,
                      value: value.text,
                      selectedList: value.selectedList,
                      error: '',
                    });
                  }}
                  arrayList={[...choseLangue.list]}
                  selectedArrayList={choseLangue.selectedList}
                  errorText={choseLangue.error}
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
              </View>)
            }
            
            
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
                width: "93%",
                alignSelf: "center",
              }}
            >
              <PaperSelect
                label="Selectionnez votre Zone "
                value={choseZone.value}
                onSelection={(value) => {
                  setChoseZone({
                    ...choseZone,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: "",
                  });
                }}
                arrayList={[...choseZone.list]}
                selectedArrayList={choseZone.selectedList}
                errorText={choseZone.error}
                multiEnable={true}
                textInputMode="outlined"
                searchStyle={{ iconColor: "#000" }}
                searchPlaceholder="rechercher"
                modalCloseButtonText="Annuler"
                modalDoneButtonText="confirmer"
                theme={{
                  colors: {
                    placeholder: "black",
                  },
                }}
                dialogStyle={{ backgroundColor: "white", borderRadius: 10 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
                width: "93%",
                alignSelf: "center",
              }}
            >
              <PaperSelect
                label="Selectionnez votre étt civil "
                value={civil.value}
                onSelection={(value) => {
                  setCivil({
                    ...civil,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: "",
                  });
                }}
                arrayList={[...civil.list]}
                selectedArrayList={civil.selectedList}
                errorText={civil.error}
                multiEnable={false}
                textInputMode="outlined"
                searchStyle={{ iconColor: "#000" }}
                searchPlaceholder="rechercher"
                modalCloseButtonText="Annuler"
                modalDoneButtonText="confirmer"
                theme={{
                  colors: {
                    placeholder: "black",
                  },
                }}
                dialogStyle={{ backgroundColor: "white", borderRadius: 10 }}
              />
            </View>
            {/* <MultiSelectZone zone={zone} /> */}

            <Button onPress={handleSubmit} style={{ marginBottom: 30 }}>
              Modifier
            </Button>
          </ScrollView>
        </SafeAreaView>
        
      </View>
        )}
    </>
  )
}


const styles = StyleSheet.create({
  containerBottom: {
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
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: Font.quadriary,
  },
  imageContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  errors: {
    color: "red",
    marginLeft: "6%",
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
  textDate: {
    fontSize: 16,
    color: "#000",
    padding: 3,
    textAlign: "center",
    fontWeight: "bold",
  },
})