import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { height, width } from "../../utils/Dimention";

export const RefreshingControl = () => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: width / 2,
          height: height / 4,
          alignSelf: "center",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../../assets/animation/loading-animation-blue.json")}
      />
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
});
