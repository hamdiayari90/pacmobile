import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../../assets/new/GlobalStyles";

const SigninPage = () => {
  const navigation = useNavigation();
  const handleLoginPress = () => {
    navigation.navigate('LoginPage');
    console.log('TouchableOpacity was pressed!');
  };
  return (
    <TouchableOpacity style={styles.signinPage}
    onPress={handleLoginPress}>
      <View style={[styles.login, styles.timePosition]}>
        <View
          style={[styles.button, styles.textPosition]}>
            <View style={[styles.buttonChild, styles.buttonChildPosition]} />
              <View style={styles.buttonInner}>
              <View style={[styles.commencerWrapper, styles.buttonChildPosition]}>
                <Text style={[styles.commencer, styles.commencerFlexBox]}>
                  Commencer
                </Text>
              </View>
            </View>
          </View>
        <Text style={[styles.sugarCrush, styles.timeFlexBox]}>Sugar Crush</Text>
        <View style={[styles.text, styles.textPositionPac]}>
          <Text style={[styles.bienvenueAu, styles.pacPosition]}>
            Bienvenue au
          </Text>
          <Text style={[styles.pac, styles.pacPosition]}>PAC</Text>
          <Text style={[styles.uneSolutionComplte, styles.fichier11PositionText]}>
            Une solution compléte pour la gestion des Animateurs/Animatrices
          </Text>
        </View>
        <Image
          style={[styles.illustrationIcon, styles.buttonChildPosition]}
          resizeMode="cover"
          source={require("../../assets/new/illustration.png")}
        />
      </View>
      <Image
        style={[styles.fichier11, styles.fichier11Position]}
        resizeMode="cover"
        source={require("../../assets/new/fichier-1-11.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timePosition: {
    left: 0,
    top: "0%",
  },
  textPositionPac: {
    left: "7.94%",
    top: "35%",
    position: "absolute",
  },
  textPosition: {
    left: "42%",
    top: "55%",
    position: "absolute",
  },
  buttonChildPosition: {
    left: "-50%",
    top: "-30%",
    position: "absolute",
  },
  commencerFlexBox: {
    textAlign: "left",
    left: "0%",
    width: "100%",
  },
  timeFlexBox: {
    textAlign: "center",
    color: Color.colorGray_300,
  },
  pacPosition: {
    color: Color.colorDarkslateblue,
    textAlign: "left",
    left: "0%",
    position: "absolute",
  },
  fichier11Position: {
    top: "68%",
    position: "absolute",
  },
  fichier11PositionText: {
    top: "45%",
    position: "absolute",
  },
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  buttonChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: "#567df4",
    bottom: "0%",
    right: "0%",
    left: "0%",
    height: "100%",
    width: "100%",
  },
  commencer: {
    fontSize: FontSize.size_5xl,
    lineHeight: 37,
    color: Color.lightLight1,
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
    top: "-30%",
    height: "100%",
    textAlign: "left",
    position: "absolute",
  },
  commencerWrapper: {
    bottom: "0%",
    right: "0%",
    left: "0%",
    height: "100%",
    width: "100%",
  },
  buttonInner: {
    height: "54.39%",
    width: "52.68%",
    top: "17.54%",
    right: "18.29%",
    bottom: "28.07%",
    left: "7%",
    position: "absolute",
  },
  button: {
    height: "6.16%",
    width: "72.43%",
    top: "65.55%",
    right: "19.63%",
    bottom: "28.29%",
  },
  sugarCrush: {
    height: "2.34%",
    width: "24%",
    top: "89.09%",
    left: "38.08%",
    fontSize: FontSize.size_xs,
    lineHeight: 19,
    fontFamily: FontFamily.hindRegular,
    position: "absolute",
  },
  bienvenueAu: {
    height: "16.84%",
    width: "58.5%",
    fontSize: 25,
    fontStyle: "italic",
    fontFamily: FontFamily.aBeeZeeItalic,
    top: "0%",
  },
  pac: {
    height: "31.58%",
    width: "68.3%",
    top: "8.42%",
    fontSize: 56,
    fontFamily: FontFamily.hindJalandhar,
    fontWeight: "700",
    color: Color.colorDarkslateblue,
  },
  uneSolutionComplte: {
    height: "50%",
    fontSize: FontSize.mainCaptionRegular_size,
    lineHeight: 22,
    color: "#7b809e",
    fontFamily: FontFamily.hindRegular,
    textAlign: "left",
    left: "0%",
    width: "100%",
  },
  text: {
    height: "20.52%",
    width: "71.5%",
    top: "38.12%",
    right: "20.56%",
    bottom: "41.36%",
  },
  illustrationIcon: {
    height: "90.83%",
    width: "196.21%",
    right: "-96.21%",
    bottom: "9.17%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  time: {
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    lineHeight: 18,
    textAlign: "center",
    color: Color.colorGray_300,
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
    left: 0,
    top: 0,
  },
  action: {
    top: 14,
    left: 15,
    height: 18,
  },
  containerIcon: {
    marginTop: -5.8,
    right: 20,
    width: 67,
    height: 12,
  },
  notificationBar: {
    height: "4.75%",
    width: "87.62%",
    top: "0.11%",
    right: "12.62%",
    bottom: "95.14%",
    left: "-0.23%",
    position: "absolute",
  },
  login: {
    width: 428,
    height: 926,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.lightLight1,
    top: 0,
  },
  fichier11: {
    marginTop: -337,
    right: 95,
    width: 200,
    height: 275,
  },
  image2Icon: {
    top: 888,
    left: 148,
    width: 132,
    height: 10,
    position: "absolute",
  },
  rectangleIcon: {
    marginLeft: -72.5,
    bottom: 9,
    left: "50%",
    borderRadius: Border.br_81xl,
    width: 148,
    height: 5,
    position: "absolute",
  },
  signinPage: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.lightLight1,
  },
});

export default SigninPage;
