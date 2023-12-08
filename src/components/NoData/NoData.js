import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { height, width } from "../../utils/Dimention";

export const NoData = ({ message }) => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: width / 2,
          height: height / 4,
          alignSelf: "center",
        }}
        source={require("../../../assets/animation/search.json")}
      />
      <View>
        <Text style={styles.text}>
          {message ? message : "Il n'y a pas d'événement"}
        </Text>
        <Text style={styles.text}>Nous vous informerons bientôt!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
    letterSpacing: 1.6,
    fontSize: 18,
    fontWeight: "bold",
  },
});
