import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Pressable,
    Image
  
  } from "react-native";
  
  import React, { useState, useEffect } from "react";
  import { FormInput } from "../components/FormInput/FormInput";
  import { width, height } from "../../utils/Dimention";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { Button, Card, Modal, Popover , Spinner} from "@ui-kitten/components";
  import { useRecoilState, useRecoilValue } from "recoil";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import messaging from "@react-native-firebase/messaging";
  
  import { Icon } from "@ui-kitten/components";
  import { alreadySingnedIn, api, userRole, userStorage } from "../atom/authState";
  import axios from "axios";
  import Feather from "react-native-vector-icons/Feather";
  
  import { Color, Border, FontSize, FontFamily } from "../../assets/new/GlobalStyles";
  const LoginSchema = Yup.object().shape({
    login: Yup.string()
      .required("requis*")
      .min(3, "Nom d'utilisateur doit comporter au moins 3 caractères!").trim(),
  
    password: Yup.string()
      .min(6, "Mot de passe doit comporter au moins 6 caractères!")
  
      .required("Mot de passe requis"),
  });
  
  export const LoginPage = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [user, setUser] = useRecoilState(userStorage);
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(
      alreadySingnedIn
    );
  
    const [role, setRole] = useRecoilState(userRole)
    const url = useRecoilValue(api);
  
    //  get fcm device if is null
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
      return token;
    };
    // ========================================================================================
    // ======================== TOGGLE PASSWORD ================================================
    // =========================================================================================
    const toggleSecureEntry = () => {
      if (secureTextEntry) {
        setSecureTextEntry(false)
      }else{
        setSecureTextEntry(true)
      }
    };
    // ========================================================================================
    // ======================== RENDER ICONE ================================================
    // =========================================================================================
    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={() => toggleSecureEntry()}>
        <Feather
          size={24}
          color="black"
          name={secureTextEntry ? "eye-off" : "eye"}
        />
      </TouchableWithoutFeedback>
    );
  
    const {
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
    } = useFormik({
      validationSchema: LoginSchema,
      initialValues: { login: "", password: "" },
      onSubmit: async (values) => {
        setVisible(true);
        let data = {
          login: values.login.trim(),
          password: values.password,
        };
        try {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
          };
          await fetch(`${url}/api/auth/login`, requestOptions)
            .then(async (response) => response.json())
            .then(async (result) => {
              if (result.token) {
                setUser(() => result);
                console.log('result:', result)
                setRole(()=> result.role[0] )
                await AsyncStorage.setItem("user", JSON.stringify(result));
                try {
                 // console.log(" ******* fcm ******:", fcm);
                 
                    let token = await messaging().getToken();
                    //console.log('token:', token)
                    let fcmToken = {
                      username: values.login.trim(),
                      token: token 
                    };
                
                    await axios.post(`${url}/notification/addAdvice`,fcmToken ).then((res)=> {
                      console.log('res when send token deive in device table :', res.data)
  
                    })
                    try{
                      let fcm = await messaging().getToken();
                      console.log('fcm aimator deive ====> \n:', fcm)
                      let fcmToken = {
                        "username" : values.login.trim(),
                        "token" : fcm
                      }
                      await axios.post(`${url}/notification/addAdvice`,fcmToken )
                    }catch(e) {
  
                    }
  
  
                } catch (e) {}
                setTimeout(() => {
                  setIsAuthenticated(true);
                  setVisible(false);
                }, 1000);
              } else {
                setVisible(() => false);
                alert(
                  "veuillez vérifier votre nom d'utilisateur ou votre mot de passe"
                );
              }
            })
            .catch((err) => {
              alert("Vérifier votre connexion internet !");
            });
        } catch (e) {}
      },
    });
    return (
      <View style={styles.loginPage}>
        <Text style={styles.seConnecter}>Se connecter</Text>
        <View style={[styles.form, styles.formPosition1]}>
            <FormInput
            status={errors.login && touched.login ? "danger" : "info"}
            placeholderTextColor="black"
            style={[styles.form, styles.formPositionInput]}
            onChangeText={handleChange("login")}
            onBlur={handleBlur("login")}
            value={values.login}
          />
            <View style={styles.iconsByRemixIconV250} />
          <Text style={[styles.label, styles.labelTypo]}>Username</Text>
        </View>
        <View style={[styles.form1, styles.formPosition1]}>
          <FormInput
            status={errors.password && touched.password ? "danger" : "info"}
            value={values.password}
            placeholder="Password"
            placeholderTextColor="black"
            style={[styles.formControlIcon, styles.iconLayout]}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
          />
          <Text style={[styles.label, styles.labelTypo]}>Password</Text>
        </View>
        <View style={[styles.form1, styles.formPosition1]}>
           <FormInput
            status={errors.password && touched.password ? "danger" : "info"}
            value={values.password}
            placeholderTextColor="black"
            style={[styles.form1, styles.formPositionInput]}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
          />
          <Text style={[styles.label, styles.labelTypo]}>Password</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={[styles.label3, styles.labelFlexBox]}>Se connecter</Text>
        </TouchableOpacity>
        <Text style={[styles.vousNavezPas, styles.labelFlexBox]}>
          Vous n'avez pas de compte ?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login2")} style={styles.socialCta}>
          <View style={styles.button1}>
            <Text style={[styles.label4, styles.labelFlexBox]}>
              Créer un compte
            </Text>
          </View>
        </TouchableOpacity>
        <Image
          style={[styles.fichier11, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../assets/new/fichier-1-1.png")}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    formPosition1: {
      left: "9.55%",
      right: "10.08%",
      width: "80.37%",
      position: "absolute",
    },
    formPositionInput: {
        left: "5%",
        right: "10.08%",
        top:"40%",
        width: "90.37%",
        position: "absolute",
      },
    formPosition: {
      left: 0,
      bottom: 0,
      right: 0,
      top: 26,
      borderRadius: Border.br_6xs,
    },
    labelTypo: {
      fontFamily: FontFamily.mainCaptionRegular,
      textAlign: "left",
      position: "absolute",
    },
    iconLayout: {
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    labelFlexBox: {
      textAlign: "center",
      position: "absolute",
    },
    seConnecter: {
      height: "8.31%",
      width: "68.21%",
      top: "23.97%",
      left: "10.13%",
      fontSize: 30,
      fontFamily: FontFamily.hindJalandhar,
      color: Color.colorDarkslateblue,
      textAlign: "left",
      fontWeight: "700",
      position: "absolute",
    },
    placeholder: {
      marginTop: -9,
      left: 20,
      color: Color.darkDark2,
      fontSize: FontSize.mainBodyRegular_size,
      top: "50%",
    },
    iconsByRemixIconV250: {
      right: 20,
      width: 24,
      height: 24,
      marginTop: -12,
      top: "50%",
      position: "absolute",
      overflow: "hidden",
    },
    formControl: {
      backgroundColor: "#f2f3f4",
      borderRadius: Border.br_6xs,
      position: "absolute",
      overflow: "hidden",
    },
    label: {
      top: "-35%",
      left: 1,
      fontSize: FontSize.mainCaptionRegular_size,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      color: Color.darkGray,
      width: 315,
    },
    form: {
      height: "9.4%",
      top: "35.34%",
      bottom: "55.26%",
    },
    formControlIcon: {
      borderRadius: Border.br_6xs,
      left: 0,
      bottom: 0,
      right: 0,
      top: 26,
    },
    form1: {
      height: "8.74%",
      top: "48.63%",
      bottom: "42.62%",
    },
    label3: {
      marginTop: -23,
      marginLeft: -80.7,
      fontSize: FontSize.size_9xl,
      color: Color.lightLight1,
      left: "50%",
      textAlign: "center",
      top: "50%",
      fontFamily: FontFamily.hindBold,
      fontWeight: "700",
    },
    button: {
      height: "10.16%",
      top: "62.93%",
      right: "10.56%",
      bottom: "30.91%",
      left: "9.07%",
      backgroundColor: Color.colorRoyalblue_100,
      borderRadius: Border.br_6xs,
      width: "80.37%",
      position: "absolute",
      overflow: "hidden",
    },
    vousNavezPas: {
      height: "4.06%",
      width: "58.93%",
      top: "76.97%",
      left: "23.2%",
      color: Color.darkDark1,
      fontFamily: FontFamily.hindBold,
      fontWeight: "700",
      fontSize: FontSize.mainBodyRegular_size,
    },
    label4: {
      marginLeft: -64.5,
      lineHeight: 24,
      fontWeight: "500",
      fontFamily: FontFamily.regularNoneMedium,
      color: Color.lightLight1,
      left: "50%",
      textAlign: "center",
      top: "50%",
      marginTop: -12,
      fontSize: FontSize.mainBodyRegular_size,
    },
    button1: {
      backgroundColor: Color.foundationBlueNormal,
      width: 297,
      height: 50,
      borderRadius: Border.br_6xs,
    },
    socialCta: {
      height: "7.77%",
      width: "80.13%",
      top: "81.07%",
      right: "10.27%",
      bottom: "11.16%",
      left: "9.6%",
      alignItems: "center",
      position: "absolute",
    },
    rectangleIcon: {
      height: "0.62%",
      width: "39.47%",
      top: "98.28%",
      right: "29.87%",
      bottom: "1.11%",
      left: "30.67%",
      borderRadius: Border.br_81xl,
    },
    fichier11: {
      height: "16.93%",
      width: "26.67%",
      top: "5.67%",
      right: "36.27%",
      bottom: "77.4%",
      left: "37.07%",
    },
    loginPage: {
      backgroundColor: Color.lightLight1,
      flex: 1,
      width: "100%",
      height: 812,
      overflow: "hidden",
    },
  });
  
  export default LoginPage;
  