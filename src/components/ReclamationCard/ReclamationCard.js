import { StyleSheet, View } from "react-native";
import React from "react";

import moment from "moment/min/moment-with-locales";
import { Card, Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { reclamtionUploadUrl } from "../../atom/eventState";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Color } from "../../utils/Constant";


const ReclamationCard = ({ item, index }) => {
  const { media, reply, message, status } = item;

  const imageUrl = useRecoilValue(reclamtionUploadUrl);
  console.log(item);

  return (
    <Card style={{ width: "95%", alignSelf: "center", marginVertical: "2%" }}>
      {item.media != null ? (
        <Card.Cover source={{ uri: `http://149.202.214.99:8085/PAC/Reclamation/${item.media.name}` }} />
      ) : (
        <Card.Cover
          source={require("../../../assets/images/noImage.png")}
          resizeMode="contain"
        />
      )}

      <Card.Content>
        <Text variant="bodyMedium" style={{color:Color.primary, fontSize:16, marginBottom:'2%'}}>
          il y'a{moment(item.sendDate).locale("fr").fromNow(true)}
        </Text>
        {message != null && (
          <View style={styles.reclamationContainer}>
            <Text style={styles.title}>reclamation : </Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}

        {reply != null && (
          <View style={styles.reclamationContainer}>
            <Text style={styles.title}>reponse :</Text>
            <Text style={styles.message}> {item.reply}</Text>
          </View>
        )}
      </Card.Content>

      <View style={{ alignSelf: "flex-end", margin: 10 }}>
        {status ? (
          <AntDesign name="checkcircle" size={24} color="green" />
        ) : (
          <AntDesign name="closecircleo" size={24} color="red" />
        )}
      </View>
    </Card>
  );
};

export default ReclamationCard;

const styles = StyleSheet.create({
  reclamationContainer: {
    width: "96%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.1,
    textDecorationLine:'underline',
    color: Color.primary
  },
  message: {
    fontSize: 16,
    color: Color.dark,
    textAlign: "justify",
  },
});
