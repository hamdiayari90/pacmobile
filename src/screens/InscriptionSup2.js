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
    address: Yup.string()
      .required("Address  est requis*")
      .min(4, "l'address doit comporter au moins 4 caractères ")
      .max(15, "le address  doit comporter moins de 15 caractères")
      .trim(),
    cin: Yup.string()
      .required("le numéro cin est requis*")
      .min(8, "le numero de téphone doit etre 8 numéro"),
    // etatCivil: Yup.string().required("l'etat civil est requis"),
    sexe: Yup.string(),
  });

const InscriptionSup2 = () => {
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
    const route = useRoute();
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
    const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={() => toggleSecureEntry()}>
        <Feather
        size={24}
        color="black"
        name={secureTextEntry ? "eye-off" : "eye"}
        />
    </TouchableWithoutFeedback>
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
    function showDatePicker() {
    setDatePicker(true);
    }

    function onDateSelected(event, value) {
    setDateError(() => "");
    setDatePicker(() => false);

    setDate(() => value);
    setDateFormat(() => moment(value).format("YYYY/MM/DD"));
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
    zones?.map((el) => {
        listOfZones.push({ _id: el.id, value: el.name });
    });
    setZone(() => listOfZones);
    };
    const fetchAllZone = async () => {
    try {
        const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
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
        address: "",
        cin: "",
        sexe: "",
        dateOfBirth: dataFormat,
        zone: zoneSelected,
        etatCivil: civil.selectedList,
    },
    onSubmit: async (values) => {
        console.log("submiiiiiiiiiiiiiiiiiiitttttttttttttttt");
        let myZones = [];
        choseZone.selectedList.map((zone) => {
        myZones.push({
            id: zone._id,
            name: zone.value,
        });
        });
        setZoneSelected(() => myZones);
        let data = {
        login: route.params.sup.login,
        password: route.params.sup.password,
        firstName: route.params.sup.firstName,
        lastName: route.params.sup.lastName,
        email: route.params.sup.email,
        phone: route.params.sup.phone,
        image: route.params.sup.image,
        address: values.address,
        dateOfBirth: dataFormat,
        regions: myZones,
        etatCivil: civil.value,
        sexe: values.sexe,
        cin: values.cin,
        };

        const check =
        selectValidator(choseZone.value) &&
        selectValidator(civil.value) &&
        dataFormat.length > 0;
        verifyAll();
        console.log(check);
        
        if (check) {
            let verifyCin = await axios.get(
            `${url}/supervisor/verifyCin/${values.cin}`
            );
            Promise.all([verifyCin]).then(async (result) => {
                console.log("ciiiinnnnnnnnn",result[0].data)
                setToggleCin(() => true);
                if (result[0].data) {
                    setCinExist(() => true);
                } else {
                    setCinExist(() => false);
                }

                if (!result[0].data) {
                    navigation.navigate('InscriptionSup3',{sup:data})
                }
            });
        }
    },
    });

return (
    <View style={styles.inscriptionsup2}>
        <Text style={[styles.crerVotreCompte, styles.tape2Typo]}>
        Créer votre compte
        </Text>
        <Text style={[styles.veuillezRenseignerTous, styles.tape2Typo]}>
        Veuillez renseigner tous les champs
        </Text>
        <Text style={[styles.tape2, styles.tape2Typo]}>Étape : 2</Text>
        <View style={[styles.formControl, styles.formLayout]}>
        <FormInput
            status={errors.sexe && touched.sexe ? "danger" : "info"}
            value={values.sexe}
            placeholder="Sexe"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("sexe")}
            onBlur={handleBlur("sexe")}
        />
        <Text style={styles.errors}>{touched.sexe && errors.sexe}</Text>
        </View>
        <View style={[styles.formControl1, styles.formPosition]}>
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
            <Text style={[styles.placeholder, styles.placeholderTypo]}>
                Date de naissance:
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
                size={35}
                color={Color.primary}
                style={{left:"350%",}}
                />
                <Text style={[styles.placeholderDate, styles.placeholderTypo]}>{dataFormat.toLocaleString()}</Text>
            </TouchableOpacity>
            <Text style={[styles.textDate, { color: "red", fontSize: 14 }]}>
                {dateError}
            </Text>
        </View>
        <View style={[styles.formControl2, styles.formPosition]}>
        <FormInput
            status={errors.address && touched.address ? "danger" : "info"}
            value={values.address}
            placeholder="Adresse"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("address")}
            onBlur={handleBlur("address")}
        />
        <Text style={styles.errors}>
            {touched.address && errors.address}
        </Text>
        </View>
        <View style={[styles.formControl3, styles.formPositionSelect]}>
        <PaperSelect
            style={[styles.placeholderRegion, styles.placeholderTypoRegion]}
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
        <View style={[styles.formControl4, styles.formPositionSelect]}>
        <PaperSelect
                style={[styles.placeholder, styles.placeholderTypo]}
                label="État civile"
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
        <TouchableOpacity
        style={styles.button}
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
        <View style={[styles.formControl5, styles.formLayout]}>
        <FormInput
            status={errors.cin && touched.cin ? "danger" : "info"}
            value={values.cin}
            placeholder="CIN"
            placeholderTextColor="black"
            style={[styles.placeholder, styles.placeholderTypo]}
            onChangeText={handleChange("cin")}
            onBlur={handleBlur("cin")}
            accessoryRight={renderIconCin}
            keyboardType="numeric"
            maxLength={8}
        />
        <Text style={styles.errors}>{touched.cin && errors.cin}</Text>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
  tape2Typo: {
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
  placeholderTypo: {
    fontSize: FontSize.mainBodyRegular_size,
    position: "absolute",
  },
  placeholderTypoRegion: {
    fontSize: FontSize.mainBodyRegular_size,
    position: "absolute",
  },
  labelPosition: {
    marginTop: -12,
    top: "50%",
    position: "absolute",
  },
  formPosition: {
    left: "8.8%",
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
    borderRadius: Border.br_6xs,
    width: "82.67%",
    height: "6.16%",
    position: "absolute",
    overflow: "hidden",
  },
  formPositionSelect: {
    left: "8.8%",
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
    borderRadius: Border.br_6xs,
    width: "82.67%",
    height: "10.16%",
    position: "absolute",
    overflow: "hidden",
  },
  formPositionDate: {
    left: "8.8%",
    right: "8.53%",
    backgroundColor: Color.colorWhitesmoke_400,
    borderRadius: Border.br_6xs,
    width: "82.67%",
    height: "10.16%",
    position: "absolute",
    overflow: "hidden",
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
  tape2: {
    height: "10.28%",
    width: "50.07%",
    top: "15.54%",
    left: "25%",
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
  placeholderRegion: {
    marginTop: -9,
    left: "4%",
    fontFamily: FontFamily.mainCaptionRegular,
    color: Color.darkDark2,
    top: "50%",
    textAlign: "left",
    width:"92%",
    height:"80%"
  },
  placeholderDate: {
    marginTop: -9,
    left: "10%",
    fontFamily: FontFamily.mainCaptionRegular,
    color: Color.darkDark2,
    top: "50%",
    textAlign: "left",
    width:"92%"
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
    top: "46.18%",
    bottom: "47.66%",
  },
  formControl2: {
    top: "53.45%",
    bottom: "40.39%",
  },
  formControl3: {
    top: "60.71%",
    bottom: "33.13%",
  },
  formControl4: {
    top: "71.33%",
    bottom: "24.51%",
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
    top: "83.42%",
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
  formControl5: {
    top: "38.92%",
    bottom: "54.93%",
  },
  inscriptionsup2: {
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
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});

export default InscriptionSup2;
