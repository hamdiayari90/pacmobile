import { StyleSheet, View,Linking } from "react-native";
import React from "react";
import { Text, Card } from "@ui-kitten/components";
import Feather from "react-native-vector-icons/Feather";

import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../utils/Constant";
import { useRecoilValue } from "recoil";
import { partnerUploadUrl } from "../../atom/eventState";
import moment from "moment/min/moment-with-locales";
import { height } from "../../utils/Dimention";
const CondidateCard = ({ item }) => {
  const navigation = useNavigation();
  const imageUrlPartner = useRecoilValue(partnerUploadUrl);
  return (
    <Card
      onPress={() =>  Linking.openURL(`tde://pac/CondidateDetail/${item.id}`)}
      style={styles.container}
      disabled={false}
    >
      <View style={styles.CardBox}>
        <View style={styles.box1}>
          {item.event.image.name ? (
            <Avatar.Image
              size={height / 10}
              source={{
                uri: `${imageUrlPartner}${item.event.globalEvent.partner.image.name}`,
              }}
            />
          ) : (
            <Avatar.Image
              size={height / 10}
              source={require("../../../assets/images/profile.png")}
            />
          )}
        </View>
        <View style={styles.box2}>
          <Text style={styles.dataTextdescription}>Nom d'événement</Text>
          <Text style={styles.dataText}>{item.event.name}</Text>
          <Text style={styles.dataTextdescription}>date d'expiration</Text>
          <Text style={styles.dataText}>
            {moment(item.event.expirationDate).format("DD / MM / YYYY hh:mm")}
          </Text>
        </View>
        <View style={styles.box3}>
          <Feather name="info" size={24} color="black" />
        </View>
      </View>
    </Card>
  );
};

export default CondidateCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "1%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderWidth: 0.5,
    overFlow: "hidden",
    margin: "2%",
  },
  CardBox: { flexDirection: "row", width: "100%" },
  box1: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  box2: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  dataTextdescription: { fontWeight: "bold" },
  dataText: { color: Color.primary },
  box3: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
