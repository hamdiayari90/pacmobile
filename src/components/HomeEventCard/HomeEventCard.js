import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { PureComponent } from "react";
import { Card } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import { Color, Size, Font } from "../../utils/Constant";
import { IMAGE_PATH } from "../../service";
import moment from "moment/min/moment-with-locales";

export class HomeEventCard extends PureComponent {
  render() {
    const { navigation, item } = this.props;
    return (
      <Card style={styles.container}>
        <Text style={styles.title}>{item.globalEvent.name}</Text>
        <Card.Cover
          source={{ uri: `${IMAGE_PATH}${item.image.name}` }}
          resizeMode="center"
        />
        <View style={styles.eventContainer}>
          <View style={styles.nameAndDescriptionEventContainer}>
            <Text style={styles.eventDetailText}>Nom d'evennement :</Text>
            <Text style={styles.eventDataText}> {item.name}</Text>
          </View>
          <View style={styles.nameAndDescriptionEventContainer}>
            <Text style={styles.eventDetailText}>Description : </Text>
            <Text style={styles.eventDataText}> {item.message}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.eventDate}>
            a commence {moment(item.startDate).locale("fr").fromNow()}
          </Text>
          <Text style={styles.eventDate}>
            fini {moment(item.endDate).locale("fr").fromNow()}
          </Text>
        </View>

        <View style={styles.zoneContainer}>
          <Text style={styles.zoneInfo}>cet évènement se déroule </Text>
          <Text style={styles.zoneInfo}>dans les zones suivantes</Text>
          <Text style={styles.zoneInfoData}>{item.zone.name} : </Text>

          {item.zone.regions?.map((lieux, index) => (
            <View style={styles.regionsContainer} key={index}>
              <Text key={index} style={styles.regionsData}>
                {index + 1} - {lieux.name} {"\n "}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.nameAndDescriptionEventContainer}
            onPress={() =>
              navigation.navigate("Equipe", {
                enventId: item.id,
              })
            }
          >
            <AntDesign name="team" size={24} color="black" />
            <Text
              style={{
                letterSpacing: 1.1,
                fontSize: Size.xl,
                marginLeft: "2%",
                fontFamily: Font.primary,
                color: Color.primary,
                fontWeight: "bold",
              }}
            >
              Consulter mon equipe
            </Text>
          </Pressable>
          <Pressable
            style={[styles.nameAndDescriptionEventContainer, { marginTop: 10 }]}
            onPress={() =>
              navigation.navigate("Pointage", {
                enventId: item.id,
              })
            }
          >
            <MaterialCommunityIcons
              name="gesture-double-tap"
              size={24}
              color="black"
            />
            <Text style={styles.actionInfo}>Mes pointages</Text>
          </Pressable>
          <Pressable
            style={[styles.nameAndDescriptionEventContainer, { marginTop: 10 }]}
            onPress={() =>
              navigation.navigate("BriefsByEvent", {
                enventId: item.id,
              })
            }
          >
            <MaterialCommunityIcons
              name="view-gallery"
              size={24}
              color="black"
            />
            <Text style={styles.actionInfo}>Tous mes briefs</Text>
          </Pressable>
        </View>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: Color.light,
  },
  title: {
    textAlign: "center",
    fontSize: Size.xl,
    letterSpacing: 1.2,
    fontFamily: Font.primary,
    color: Color.secondary,
    fontWeight: "bold",
    padding: 10,
  },
  eventContainer: { paddingLeft: 10, marginVertical: "2%" },
  nameAndDescriptionEventContainer: { flexDirection: "row" },
  eventDetailText: {
    fontSize: Size.l,
    fontWeight: "bold",
    color: Color.dark,
  },
  eventDataText: {
    fontSize: Size.xl,
    color: Color.grey,
    fontWeight: "600",
    fontFamily: Font.primary,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "95%",
  },
  eventDate: {
    fontSize: Size.l,
    fontWeight: "bold",
    color: Color.tiartery,
  },
  zoneContainer: { flexDirection: "column", width: "100%" },
  zoneInfo: {
    padding: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },
  zoneInfoData: {
    textAlign: "center",
    fontWeight: "600",
    color: Color.primary,
  },
  regionsContainer: {
    width: "90%",
    paddingLeft: 16,
  },
  regionsData: { color: Color.grey, fontWeight: "bold" },
  actionContainer: { width: "93%", margin: "2%", alignSelf: "center" },
  actionInfo: {
    letterSpacing: 1.1,
    fontSize: Size.xl,
    marginLeft: "2%",
    fontFamily: Font.primary,
    color: Color.primary,
    fontWeight: "bold",
  },
});

export default HomeEventCard;
