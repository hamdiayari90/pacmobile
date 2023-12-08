import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  api,
  userStorage,
  userToken,
  userId,
  userRole,
} from "../../../atom/authState";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { height, width } from "../../../utils/Dimention";
import { Color, Font, Size } from "../../../utils/Constant";
import { FlashList } from "@shopify/flash-list";
import { RefreshingControl } from "../../../components/RefreshingControl/RefreshingControl";
import { NoData } from "../../../components/NoData/NoData";
import LottieView from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleAccordion } from "react-native-simple-accordion";
import { History } from "./component/History";
import { CurrentEvent } from "./component/CurrentEvent";

export const EvenementScreen = ({ navigation }) => {
  //  this tell me me when the scrren is focused again
  const isFocused = useIsFocused();

  const [events, setEvents] = useState([]);
  const [pastEvent, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const user = useRecoilValue(userStorage);
  const tokenAuth = useRecoilValue(userToken);
  // console.log('tokenAuth:', tokenAuth.token)
  const [usrid, setusrId] = useRecoilState(userId);
  const role = useRecoilValue(userRole);
  const url = useRecoilValue(api);

  useEffect(() => {
    if (isFocused) {
      getAllEvents();
    }
  }, [isFocused]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### ***************  REFRECH CALL BACK    **************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const onRefresh = useCallback(() => {
    setLoading(false);

    // getPastEvents();
    wait(500).then(() => {
      setLoading(true);
      setRefreshing(false);
    });
  }, []);

  // ===============================================================================
  // ========================FETCH CURRENT EVENTS ==================================
  // ===============================================================================

  const getAllEvents = async () => {
    // let data = await fetchEvents();
    // setEvents(() => data);
    wait(500).then(() => setLoading(true));
  };

  const fetchEvents = async () => {
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
      //let endPoointf =  `${url}/event/currentEventsByUser/${user.id}`

      let endPooint = `${url}/event/currentEventsByUser/9bda1c63-db06-49d0-8446-886e6e7d07e8`;
      let result = await fetch(endPooint, requestOptions);
      return result.json();
    } catch (e) {
      console.log("error");
    }
  };
  // ===============================================================================
  // ========================FETCH CURRENT EVENTS ==================================
  // ===============================================================================

  const getPastEvents = async () => {
    let pastEvents = await fetchPastEvents();
    //console.log("pastEvents:", pastEvents);
  };
  const fetchPastEvents = async () => {
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
      let result = await fetch(
        `${url}/event/currentEventsByUser/`,
        requestOptions
      );
      return result.json();
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <CurrentEvent user={user} />

          {/* <View>
        <View style={{alignSelf:'center', paddingTop : "3%"}}>
          <Text style={{fontSize:18, fontWeight:"bold", }}>Bonjour  {user.login}</Text>
        </View>

          <View style={{marginVertical:20}}>
            <SimpleAccordion viewInside={<History user={user}/>} title={"Mes événement passé"} showContentInsideOfCard={false}/>
          </View>
          <View style={{flex:1}}>
            <SimpleAccordion viewInside={<CurrentEvent user={user} />} title={"Mes événement En cour"} startCollapsed={false} />
          </View>
          
        </View> */}
        </View>
      ) : (
        <RefreshingControl />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  titleContainer: {
    marginTop: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 1.8,
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: Color.primary,
  },

  cardContainer: {
    width: "95%",
    alignSelf: "center",
    // height: height / 2.8,
    marginVertical: "2%",
    borderColor: "#eee",
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: "row",
  },
  box1: { width: "33%", justifyContent: "center", alignItems: "center" },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
    textAlign: "center",
    color: Color.secondary,
  },
});
