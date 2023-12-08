import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const CustumButtom = ({ onPress, title, color, visible = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, { backgroundColor: color }]}
    >
      <Text style={[styles.appButtonText, { marginRight: visible ? 10 : 0 }]}>
        {title}
      </Text>
      {visible && <MaterialCommunityIcons name="send" size={24} color="#fff" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
