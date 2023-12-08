import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable

} from "react-native";

import React, { useState, useEffect } from "react";
import { FormInput } from "../../components/FormInput/FormInput";
import { width, height } from "../../utils/Dimention";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, Modal, Popover , Spinner} from "@ui-kitten/components";
import { useRecoilState, useRecoilValue } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

import { Icon } from "@ui-kitten/components";
import { Color, Font, Size } from "../../utils/Constant";
import { alreadySingnedIn, api, userRole, userStorage } from "../../atom/authState";
import axios from "axios";
import Feather from "react-native-vector-icons/Feather";



const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .required("requis*")
    .min(3, "Nom d'utilisateur doit comporter au moins 3 caractères!").trim(),

  password: Yup.string()
    .min(6, "Mot de passe doit comporter au moins 6 caractères!")

    .required("Mot de passe requis"),
});

export const LoginScreen = ({ navigation }) => {
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

          <Text style={{ fontWeight: "bold" }}>Authentication ...</Text>
        </Card>
      </Modal>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bienvenue</Text>
          <Text style={styles.title}>Connectez-vous!</Text>
        </View>
        <View style={styles.inputContainer}>
          <FormInput
            status={errors.login && touched.login ? "danger" : "info"}
            placeholder="username"
            placeholderTextColor="black"
            style={styles.textInput}
            iconType="account-circle-outline"
            onChangeText={handleChange("login")}
            onBlur={handleBlur("login")}
            value={values.login}
          />
          <Text style={styles.errors}>{touched.login && errors.login}</Text>
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
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <View style={styles.box}>
            <Text
              style={[
                styles.text,
                { fontSize: 20, fontWeight: "bold", letterSpacing: 1.6 },
              ]}
            >
              Se connecter
            </Text>
          </View>
        </TouchableOpacity>
        <Pressable style={styles.infoContainer}  onPress={() => navigation.navigate("Register")}>
          <Text style={styles.info}>
            Vous n'avez pas de compte ?{" "}
            <Text
              style={[styles.info, { color: Color.secondary }]}
              onPress={() => navigation.navigate("Register")}
            >
              S'inscrire
            </Text>
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  titleContainer: { marginTop: height / 4, justifyContent: "center" },
  title: { textAlign: "center", fontSize: Size.xxl },
  inputContainer: { marginTop: "15%" },
  buttonContainer: {
    borderWidth: 1,
    marginHorizontal: "20%",
    backgroundColor: Color.secondary,
    borderRadius: 50,
    height: height / 13,
    marginTop: "5%",
  },
  box: { justifyContent: "center", alignSelf: "center", flex: 1 },
  text: {
    textAlign: "center",
    fontSize: Size.xl,
    color: "#fff",
  },

  infoContainer: {
    marginTop: "4%",
  },
  info: {
    textAlign: "center",
    fontSize: Size.xl,
  },
  errors: {
    textAlign: "center",
    color: "red",
  },
});
