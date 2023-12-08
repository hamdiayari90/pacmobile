import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontFamily, FontSize, Color, Border } from "../../assets/new/GlobalStyles";

const Login2 = ({ navigation }) => {
    const [selectedAnimator, setSelectedAnimator] = useState(false);
    const [selectedSuperVisor, setSelectedSuperVisor] = useState(false);
  return (
    <View style={styles.login2}>
      <TouchableOpacity 
        style={[styles.rectangleParent, styles.rectangleLayout]}
        onPress={() => {
            navigation.navigate("InscriptionSup1");
        }}>
        <LinearGradient
          style={[styles.rectangle, styles.rectangleLayout]}
          locations={[0, 1]}
          colors={["#2db398", "#3dc8ac"]}
          useAngle={true}
          angle={-76.14}
        />
        <View style={[styles.wrapper, styles.wrapperLayout]}>
          <Text style={[styles.text1, styles.textFlexBox]}>8</Text>
        </View>
        <Text style={[styles.superviseur, styles.superviseurTypo]}>
          Superviseur
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.rectangleGroup, styles.rectangleLayout]}
        onPress={() => {
          navigation.navigate("Inscription1");
        }}>
        <LinearGradient
          style={[styles.rectangle, styles.rectangleLayout]}
          locations={[0, 1]}
          colors={["#f88e11", "#f68070"]}
          useAngle={true}
          angle={-75.96}
        />
        <Text style={[styles.animateurtrice, styles.superviseurTypo]}>
          Animateur(trice)
        </Text>
        <View style={[styles.container, styles.wrapperLayout]}>
          <Text style={[styles.text2, styles.textFlexBox]}>2</Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.sinscrireEnTant, styles.superviseurTypo]}>
        S’inscrire en tant que :
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  barsPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  rectangleLayout: {
    height: 80,
    width: 300,
    position: "absolute",
  },
  wrapperLayout: {
    height: 18,
    left: 249,
    width: 17,
    position: "absolute",
  },
  textFlexBox: {
    alignItems: "center",
    fontFamily: FontFamily.hindRegular,
    lineHeight: 18,
    letterSpacing: -0.1,
    fontSize: FontSize.size_smi,
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    width: 17,
    left: 0,
    top: 0,
    position: "absolute",
  },
  superviseurTypo: {
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  batteryIcon: {
    height: "25.68%",
    width: "6.48%",
    top: "39.32%",
    right: "3.92%",
    bottom: "35%",
    left: "89.6%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  mobileSignalIcon: {
    width: 17,
    height: 11,
  },
  text: {
    height: "85.71%",
    top: "9.52%",
    left: "0%",
    letterSpacing: -0.3,
    color: Color.black,
    alignItems: "flex-end",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
    fontSize: FontSize.size_mini,
    position: "absolute",
    width: "100%",
  },
  timeStyle: {
    height: "47.73%",
    width: "14.4%",
    top: "27.27%",
    right: "80%",
    bottom: "25%",
    left: "5.6%",
    position: "absolute",
  },
  uiBarsStatusBarsBlack: {
    height: 44,
    top: 0,
    width: 375,
  },
  uiBarsHomeIndicatorHom: {
    top: 1162,
    height: 34,
  },
  iconArrowBackMBlack33ab5c: {
    top: 54,
    left: 15,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  rectangle: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.greenGradient,
    width: 300,
    left: 0,
    top: 0,
  },
  text1: {
    color: "#2db398",
  },
  wrapper: {
    top: 50,
  },
  superviseur: {
    width: 176,
    color: Color.lightLight1,
    lineHeight: 20,
    letterSpacing: -0.2,
    left: 28,
    top: 25,
    textAlign: "left",
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.hindBold,
    fontSize: FontSize.size_mini,
  },
  rectangleParent: {
    top: "40%",
    left: 38,
    width: 300,
  },
  animateurtrice: {
    width: 156,
    color: Color.lightLight1,
    lineHeight: 20,
    letterSpacing: -0.2,
    left: 28,
    top: 25,
    textAlign: "left",
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.hindBold,
    fontSize: FontSize.size_mini,
  },
  text2: {
    color: "#f88e11",
  },
  container: {
    top: 48,
  },
  rectangleGroup: {
    top: "60%",
    left: 38,
    width: 300,
  },
  sinscrireEnTant: {
    height: "8.29%",
    width: "84.53%",
    top: "13.29%",
    left: "10.4%",
    fontSize: 30,
    fontFamily: FontFamily.hindJalandhar,
    color: Color.colorDarkslateblue,
  },
  login2: {
    backgroundColor: Color.colorWhitesmoke_200,
    flex: 1,
    height: 820,
    overflow: "hidden",
    width: "100%",
  },
});

export default Login2;
