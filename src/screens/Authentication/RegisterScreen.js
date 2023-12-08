import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Color, Font } from "../../utils/Constant";
import LottieView from "lottie-react-native";
import { height, width } from "../../utils/Dimention";

export const RegisterScreen = ({ navigation }) => {
  const [selectedAnimator, setSelectedAnimator] = useState(false);
  const [selectedSuperVisor, setSelectedSuperVisor] = useState(false);

  // ===================================================================================================
  // ============================= PIK IMAGE ===========================================================
  // ===================================================================================================

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        key="animator"
        onPress={() => {
          setSelectedAnimator(true);
          setTimeout(() => {
            navigation.navigate("Animator");
            setSelectedAnimator(false);
          }, 200);
        }}
      >
        <LottieView
          autoPlay
          style={{
            width: width / 2,
            height: height / 4,
            backgroundColor: selectedAnimator ? Color.primary : Color.light,
            alignSelf: "center",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../../assets/animation/animator.json")}
        />
        <View
          style={{
            marginTop: "10%",
            backgroundColor: Color.secondary,
            width: width,
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: Color.light,
            }}
          >
            Vous ete animateur ou animatrice ?
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{ height: "1%", borderBottomWidth: 2, width: width / 1.2 }}
      ></View>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        key="supervisor"
        onPress={() => {
          setSelectedSuperVisor(true);
          setTimeout(() => {
            navigation.navigate("SuperVisor");
            setSelectedSuperVisor(false);
          }, 200);
        }}
      >
        <LottieView
          autoPlay
          style={{
            width: width / 2,
            height: height / 4,
            backgroundColor: selectedSuperVisor ? Color.primary : Color.light,
            alignSelf: "center",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../../assets/animation/superVisor.json")}
        />
        <View
          style={{
            marginTop: "10%",
            backgroundColor: Color.secondary,
            width: width,
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: Color.light,
            }}
          >
            Vous ete superviseur ?
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
});
