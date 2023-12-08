import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { height } from "../utils/Dimention";
import moment from "moment/min/moment-with-locales";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../utils/Constant";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ListPosition = ({ item }) => {
  const navigation = useNavigation();
  const dateStr = item.pointageDate;
  const formattedDate = moment(dateStr, "DD-MM-YYYY HH:mm");
  return (
    <Card style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.event.name}</Text>
      </View>
      <View style={styles.infoPointageContainer}>
        <Text> Zone : {item.event.zone.name}</Text>
        <Text> location : {item.location.name}</Text>
        <Text> region :{item.location.region.name}</Text>
        <Text> address :{item.location.address}</Text>
        <Text>
          {" "}
          date du pointage : {moment(formattedDate).locale("fr").fromNow(true)}
        </Text>
      </View>
      <View style={styles.commentContainer}>
        {item.comment !== null && (
          <Text style={styles.comment}> commentaire : {item.comment}</Text>
        )}
        <View style={styles.addCommentContainerBtn}>
          <Button
            onPress={() =>
              navigation.navigate("AddComment", { itemId: item.id })
            }
          >
            Votre commentaire
          </Button>
          <FontAwesome
            name="comment-o"
            size={16}
            color="black"
            onPress={() =>
              navigation.navigate("AddComment", { itemId: item.id })
            }
          />
        </View>
      </View>
    </Card>
  );
};

export default ListPosition;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: "2%",
  },
  titleContainer: {
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoPointageContainer: {
    padding: 16,
  },
  addCommentContainerBtn:{
    flexDirection: "row" , justifyContent:'center', alignItems:'center'
  },
  commentContainer: {},
  comment: {
    paddingLeft: 16,
    fontWeight: "bold",
  },
});
{
  /* <View
style={{
  width: "100%",
  height: height / 5,
  borderWidth: 1,
  borderRadius: 10,
  marginVertical: 3,
  flexDirection: "column",
}}
key={item.id}
>
<View style={{ flexDirection: "row" }}>
  <View style={{ width: "90%", padding: 5 }}>
    <Text>Evenement : {item.event.name}</Text>
    <Text> Zone : {item.event.zone.name}</Text>
    <Text> location : {item.location.name}</Text>
    <Text> region :{item.location.region.name}</Text>
    <Text> address :{item.location.address}</Text>

    <Text>
      heure :{" "}
      {moment(formattedDate).locale("fr").fromNow(true)}
    </Text>
  </View>
  <View
    style={{
      width: "10%",
      justifyContent: "flex-end",
      marginBottom: "3%",
    }}
  >
    <FontAwesome
      name="comment-o"
      size={24}
      color="black"
      onPress={() =>
        navigation.navigate("AddComment", { itemId: item.id })
      }
    />
  </View>
</View>
{item.comment !== null && (
  <Text> comment : {item.comment}</Text>
)}
</View> */
}
