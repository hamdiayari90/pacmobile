import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { Size } from "../../../utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { api, userStorage } from "../../../atom/authState";

export const AddComment = ({ route }) => {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const user = useRecoilValue(userStorage);
  const url = useRecoilValue(api);

  const getResponse = async () => {
    let result = await sendCommentByPointageId();
    if (result == 200) {
      navigation.goBack();
    }
  };
  const sendCommentByPointageId = async () => {
    let auth = user.token ? user.token : tokenAuth.token;
    let data = {
      id: route.params.itemId,
      comment: text.length> 0 ? text : null,
    };

    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(data),
      };
      let sendPointage = await fetch(
        `${url}/pointage/addComment`,
        requestOptions
      );
      let response = sendPointage.status;
      return response;
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>votre commentaire</Text>
      <TextInput
        label="ajouter un commentaire"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <View>
        <Button
          mode="text"
          onPress={() => getResponse()}
          style={{ marginTop: "5%" }}
        >
          Envoyer
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: Size.xl,
    letterSpacing: 1.2,
    padding: 10,
  },
});
