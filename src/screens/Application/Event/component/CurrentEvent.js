import {
  StyleSheet,
  Text,
  View,

} from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { alreadySingnedIn, api, userStorage } from "../../../../atom/authState";
import LottieView from "lottie-react-native";
import { height, width } from "../../../../utils/Dimention";
import { Avatar } from "react-native-paper";
import { SimpleAccordion } from "react-native-simple-accordion";

import moment from "moment/min/moment-with-locales";
import { Font } from "../../../../utils/Constant";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import HomeEventCard from "../../../../components/HomeEventCard/HomeEventCard";
import { History } from "./History";

export const CurrentEvent = () => {
  const navigation = useNavigation();
  const user = useRecoilValue(userStorage);
  const url = useRecoilValue(api);
  const isFocused = useIsFocused();
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(alreadySingnedIn);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (isFocused) {
      getAllCurrentEvent();
    }
  }, [isFocused]);

  const getAllCurrentEvent = async () => {
    const data = await fetchAllCurrentEvent();
    if (data.status == "401") {
      setIsAuthenticated(() => false);
    } else {
      setEvents(() => data);
    }
  };

  const fetchAllCurrentEvent = async () => {
    try {
      let auth = user.token ? user.token : tokenAuth.token;

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${auth}`,
        },
      };

      let endPooint = `${url}/event/currentEventsByUser/${user.id}`;
      console.log("endPooint:", endPooint);
      let result = await fetch(endPooint, requestOptions);
      return result.json();
    } catch (e) {}
  };

  return (
    <FlashList
      renderItem={({ item }) => {
        return <HomeEventCard item={item} navigation={navigation} />;
      }}
      ListHeaderComponent={
        <View style={{ marginVertical: 20 }}>
          <SimpleAccordion
            viewInside={<History user={user} />}
            title={"Mes évènements passés"}
            showContentInsideOfCard={false}
          />
        </View>
      }
      estimatedItemSize={50}
      data={events}
      ListEmptyComponent={
        <View style={{ flex: 1 }}>
          <LottieView
            autoPlay
            style={{
              width: width / 2,
              height: height / 4,
              alignSelf: "center",
            }}
            source={require("../../../../../assets/animation/drink.json")}
          />
          <Text style={styles.title}>
            Posutler pour voir tes Evennement en cour
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: "100%",
    borderWidth: 2,
    backgroundColor: "#1dd1a1",
    height: height / 5,
    alignSelf: "center",
    borderRadius: 12,
    flexDirection: "row",
    borderColor: "green",
    marginVertical: "1%",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1.6,
    fontFamily: Font.primary,
  },
  text: {
    // textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: "5%",
  },
});
