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
    PermissionsAndroid} from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
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
    taille: Yup.string("taille est requis"),
    poids: Yup.string()
      .required("le poids est requis*")
      .min(2, "votre poids ne depasse pas 2 chiffre*")
      .max(3, "votre taille ne depasse pas 3 chiffre*"),
    taille: Yup.string()
      .required("votre taille  est requis*")
      .min(3, "votre taille ne depasse pas 3 chiffre*")
      .max(3, "votre taille ne depasse pas 3 chiffre*"),
  });

const Inscription3 = () => {
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
    const route = useRoute();

    const selectValidator = value => {
        if (!value || value.length <= 0) {
            return false;
        }

        return true;
    };

    const verifyAll = () => {
    
        if (!selectValidator(choseInterrest.value)) {
          setChoseInterrest({
            ...choseInterrest,
            error: 'Vous devez sélectionner une ou + languages*',
          });
          return false;
        }
        if (!selectValidator(situation.value)) {
          setSituation({
            ...situation,
            error: 'Vous devez sélectionner votre situation*',
          });
          return false;
        }
        return true;
    };

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
        taille: "",
        poids: "",
    },
    onSubmit: async (values) => {
        console.log("submiiiiiiiiiiiiiiiiiiitttttttttttttttt");
        let data = {
        login: route.params.data.login,
        password: route.params.data.password,
        firstName: route.params.data.firstName,
        lastName: route.params.data.lastName,
        email: route.params.data.email,
        phone: route.params.data.phone,
        address: route.params.data.address,
        dateOfBirth: route.params.data.dateOfBirth,
        regions: route.params.data.regions,
        etatCivil: route.params.data.etatCivil,
        sexe: route.params.data.sexe,
        cin: route.params.data.cin,
        taille: values.taille,
        poids: values.poids,
        permis: permis,
        vehicule: voiture,
        };
        let image =route.params.data.image;
        if (verifyAll()){
            let verifyUserName = axios.get(
                `${url}/api/auth/verifyLogin/${values.username}`,
            );
            let verifyEmail = axios.get(
                `${url}/animator/verifyEmail/${values.email}`,
            );
            let verifyCin = axios.get(
                `${url}/animator/verifyCin/${values.cin}`
            );
            Promise.all([verifyUserName, verifyEmail, verifyCin]).then(async (result) => {
                console.log("verify animator cin ====> :", result[0].data);
                console.log("verifyUserName:", result[0].data);
                console.log("verifyEmail:", result[1].data);
                console.log("verifyCin:", result[2].data);

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

                if (result[0].data == false) {
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
                console.log("##############################################");
                console.log("########### ALL INPUT VERIFIED ###############");
                console.log("##############################################");
                const requestaddAnimator = {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(data),
                };
                await fetch(`${url}/animator/addAnimator`, requestaddAnimator)
                    .then((data) => data.text())
                    .then(async (animator) => {
                    console.log("animator:", animator);
                    console.log("animator === ", animator);
                    console.log("animator === type of ", typeof animator);
                    setUserId(() => animator);
                    await AsyncStorage.setItem(
                        "userId",
                        JSON.stringify(animator)
                    );

                        let endPoint =  url +'/animator/addImageToAnimator/'+ animator;
                    console.log('image:', image);
                    let formData = new FormData();
                        formData.append("image", image);
        
                    const requestOptionsImage = {
                        method: "POST",
                        headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*",
                        },
                        body: formData,
                    };
                    const result = await fetch(
                        `${endPoint}`,
                        requestOptionsImage
                    )
                        .then((data) => data.json())
                        .then((response) =>
                        console.log("######### response #############", response)
                        )
                        .catch((error) =>
                        console.log("******* error ******", error)
                        );

                    let body = {
                        login: data.login,
                        password: data.password,
                    };
                    axios
                        .post(`${url}/api/auth/login`, body)
                        .then(async (autoLogin) => {
                        //console.log('autoLogin ================>:', autoLogin)
                        setUser(()=> autoLogin.data)
                        await AsyncStorage.setItem(
                            "user",
                            JSON.stringify(autoLogin.data)
                        );
                        setRole(()=> autoLogin.data.role[0])

                        try {
                            // let value = await AsyncStorage.getItem("fcm");
                            // let fcm = JSON.parse(value);
                            // console.log(" ******* fcm ******:", fcm);
                            let fcm = await requestUserPermission()
                            console.log('fcm animatrice divece  ===> :', fcm)
                            
                            
                            let fcmToken = {
                            username: values.username,
                            token: fcm,
                            };
                            await axios.post(
                            `${url}/notification/addAdvice`,
                            fcmToken
                            ).then((res)=> {
                            console.log('res:', res.data)

                            })
                        } catch (e) {}
                        setTimeout(() => {
                            setLoading(() => false);
                            setIsAuthenticated(() => true);
                            setLoading(() => false);
                        }, 1000);
                        })
                        .catch((err) => {
                        //     console.log("errrrrrrrr::::",err)
                        navigation.navigate("Login");
                        });
                    })
                    .catch((err) => {
                    console.log("err:", err);
                    console.log(
                        "############ SOME THING WENT WRONG ! #################"
                    );
                    });
                }
            });
        }
        
    },
    });

  return (
    <View style={styles.inscriptionsup3}>
      <Text style={[styles.crerVotreCompte, styles.tape3Typo]}>
        Créer votre compte
      </Text>
      <Text style={[styles.veuillezRenseignerTous, styles.tape3Typo]}>
        Veuillez renseigner tous les champs
      </Text>
      <Text style={[styles.tape3, styles.tape3Typo]}>Étape : 3</Text>
      <View style={[styles.formControl, styles.formLayout]}>
        <FormInput
            status={errors.taille && touched.taille ? "danger" : "info"}
            value={values.taille}
            placeholder="Taille"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("taille")}
            onBlur={handleBlur("taille")}
            keyboardType="numeric"
            maxLength={3}
        />
        <Text style={styles.errors}>
        {touched.taille && errors.taille}
        </Text>
      </View>
      <View style={[styles.formControl1, styles.formLayout]}>
        <FormInput
            status={errors.poids && touched.poids ? "danger" : "info"}
            value={values.poids}
            placeholder="Poids"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("poids")}
            onBlur={handleBlur("poids")}
            keyboardType="numeric"
            maxLength={3}
        />
        <Text style={styles.errors}>{touched.poids && errors.poids}</Text>
      </View>
      <View style={[styles.formControl2, styles.formLayoutV]}>
              <PaperSelect
              style={[styles.placeholderV, styles.placeholderTypo]}
                label="Languages"
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
      <View style={[styles.formControl3, styles.formLayoutV]}>
        <PaperSelect
            style={[styles.placeholderV, styles.placeholderTypo]}
            label="Situation"
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
      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={[styles.label, styles.labelPosition]}>Confirmer</Text>
      </Pressable>
      <Text onPress={() => navigation.navigate("LoginPage")} style={[styles.retourAuLogin, styles.placeholderTypo]}>
        Retour au login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tape3Typo: {
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.hindJalandhar,
    textAlign: "left",
    position: "absolute",
  },
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  formLayout: {
    backgroundColor: Color.colorWhitesmoke_400,
    height: "6.16%",
    borderRadius: Border.br_6xs,
    left: "9.6%",
    right: "7.73%",
    width: "82.67%",
    position: "absolute",
    overflow: "hidden",
  },
  formLayoutV: {
    backgroundColor: Color.colorWhitesmoke_400,
    height: "13.16%",
    borderRadius: Border.br_6xs,
    left: "9.6%",
    right: "7.73%",
    width: "82.67%",
    position: "absolute",
    overflow: "hidden",
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
  crerVotreCompte: {
    width: "72.8%",
    top: "1.47%",
    fontSize: FontSize.size_7xl,
    textAlign: "left",
    fontWeight: "700",
    left: "19.47%",
    height: "10.43%",
    fontFamily: FontFamily.hindJalandhar,
  },
  veuillezRenseignerTous: {
    width: "92.8%",
    top: "7%",
    left: "6%",
    fontSize: FontSize.size_xl,
    textAlign: "left",
    height: "10.43%",
    fontFamily: FontFamily.hindJalandhar,
  },
  time: {
    top: 0,
    left: 0,
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 18,
    fontFamily: FontFamily.hindBold,
    color: Color.colorGray_300,
    textAlign: "center",
    fontWeight: "700",
  },
  action: {
    top: 14,
    left: 15,
    height: 18,
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
  tape3: {
    height: "10.28%",
    width: "100%",
    top: "15.54%",
    left: "26.4%",
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
  placeholderV: {
    marginTop: -9,
    left: "4%",
    fontFamily: FontFamily.mainCaptionRegular,
    color: Color.darkDark2,
    top: "15%",
    textAlign: "left",
    width:"92%",
    backgroundColor: Color.colorWhitesmoke_400,
  },
  iconsByRemixIconV250: {
    width: 24,
    height: 24,
    right: 20,
    overflow: "hidden",
  },
  formControl: {
    top: "31.77%",
    bottom: "62.07%",
  },
  formControl1: {
    top: "39.16%",
    bottom: "54.68%",
  },
  formControl2: {
    top: "46.43%",
    bottom: "47.41%",
  },
  formControl3: {
    top: "60.69%",
    bottom: "40.15%",
  },
  label: {
    marginLeft: -39,
    left: "50%",
    fontSize: FontSize.size_lg,
    fontWeight: "600",
    fontFamily: FontFamily.hindSemiBold,
    color: Color.lightLight1,
    textAlign: "center",
  },
  button: {
    top: "80.42%",
    bottom: "15.15%",
    backgroundColor: Color.colorRoyalblue_100,
    borderRadius: Border.br_6xs,
    left: "9.6%",
    right: "7.73%",
    width: "82.67%",
    height: "7%",
    position: "absolute",
    overflow: "hidden",
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
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  inscriptionsup3: {
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
});

export default Inscription3;
