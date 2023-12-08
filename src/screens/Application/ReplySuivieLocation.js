import React, { useState, useEffect } from "react";
import { height, width } from "../../utils/Dimention";
import * as api from "../../service/api";
import { StyleSheet, SafeAreaView, View, Image, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { Text } from "@ui-kitten/components";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function ReplySuivieLocation({ route }) {
  const navigation = useNavigation();
  const item = route.params.item;

  useEffect(() => {}, []);

  async function ok() {
    api.suivieReply(item.id, "OK").then((res) => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Acceuil" }],
      });
    });
  }
  async function notOK() {
    api.suivieReply(item.id, "NOT_OK").then((res) => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Acceuil" }],
      });
    });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mapsContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: 34.81605153905657,
            longitude: 9.08194445365877,
            latitudeDelta: 6,
            longitudeDelta: 0,
          }}
        >
          <Marker
            coordinate={{
              latitude: +item.latitude,
              longitude: +item.longitude,
            }}
          />
        </MapView>
      </View>
      <View style={{ flex: 1 }}>
        <Text>
          Animator : {item.receiver.firstName} {item.receiver.lastName}
        </Text>
        <Text>Event : {item.event.name}</Text>
        <Text>Date : {item.sendDate}</Text>
        <Button title="OK" onPress={() => ok()} />
        <Button
          style={{ marginTop: "10px" }}
          title="Not ok"
          onPress={() => notOK()}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  card: {
    margin: 2,
  },
  header: {
    flexDirection: "row",
  },
  avatar: {
    marginRight: 24,
  },
  image: {
    height: height / 4,
    marginBottom: 16,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  timeAgo: {
    marginLeft: "auto",
    fontWeight: "bold",
    color: "green",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  footerDetail: {
    alignSelf: "center",
  },
  map: {
    height: height / 2.5,
    width: "100%",
  },
  mapsContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 300,
    width: width,
  },
});
