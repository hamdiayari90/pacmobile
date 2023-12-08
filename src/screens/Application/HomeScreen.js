import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { api, userId, userStorage } from "../../atom/authState";
import { height, width } from "../../utils/Dimention";

import LottieView from "lottie-react-native";
import { fetchAllCurrentEvent } from "../../service/EventService/EventService";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { Color, Font, Size } from "../../utils/Constant";
import { FlashList } from "@shopify/flash-list";
import HomeEventCard from "../../components/HomeEventCard/HomeEventCard";
import { eventUploadUrl } from "../../atom/eventState";

export const HomeScreen = () => {
  // const [event, setEvent] = useState([]);
  const imageUrl = useRecoilValue(eventUploadUrl);
  const [event, setEvent] = useState([]);

  const [user, setUser] = useRecoilState(userStorage);
  const [id, setUserId] = useRecoilState(userId);
  const url = useRecoilValue(api);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchUserEvent();
    }
    return () => {
      // Clean up any resources if needed
    };
  }, [isFocused]);
  const fetchUserEvent = async () => {
    let data = await fetchAllCurrentEvent(user.token, user.id);
    setEvent(()=> data)
    //console.log("data:", data);
  };
  // ===================================================================================================
  // ============================= PIK IMAGE ===========================================================
  // ===================================================================================================

  return (
    <View style={styles.container}>
      <FlashList
        data={event}
        ListHeaderComponent={
          <Text style={styles.title}>Vos évènements en cours</Text>
        }
        renderItem={({ item }) => {
          return <HomeEventCard item={item} navigation={navigation} />;
        }}
        estimatedItemSize={5}
        ListEmptyComponent={
          <View style={{flex:1}}>
            <LottieView
              autoPlay
              style={{
                width: width / 2,
                height: height / 4,
                alignSelf: "center",
              }}
              source={require("../../../assets/animation/drink.json")}
            />
            <Text style={styles.title}>
              Posutler pour voir tes Evennement en cour
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  title: {
    textAlign: "center",
    fontFamily: Font.primary,
    fontSize: 16,
    letterSpacing: 1.1,
    fontWeight: "bold",
  },
});