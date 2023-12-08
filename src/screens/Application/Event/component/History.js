import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { alreadySingnedIn, api, userStorage } from "../../../../atom/authState";
import LottieView from "lottie-react-native";
import { height, width } from "../../../../utils/Dimention";
import { Avatar } from "react-native-paper";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import moment from "moment/min/moment-with-locales";
import { Font } from "../../../../utils/Constant";
export const History = () => {
  const user = useRecoilValue(userStorage);
  const url = useRecoilValue(api);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(
    alreadySingnedIn
  );
  const [pastEvents, setPastEvents] = useState(
    [
    ]
  );
  useEffect(() => {
    getAllCurrentEvent();
  }, []);

  const getAllCurrentEvent = async () => {
    const data = await fetchAllCurrentEvent();
    if (data.status == "401") {
      setIsAuthenticated(()=> false)
    }else {
      setPastEvents(() => data);

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

      let endPooint = `${url}/event/findEventsByUser/${user.id}`;
      let result = await fetch(endPooint, requestOptions);
      return result.json();
    } catch (e) {
      console.log("error");
    }
  };

  return (
    <View>
      {pastEvents.length !== 0 ? (
        <>
          {pastEvents.map((item, index) => {
            console.log("item:", item.startDate);
            return (
              <View key={index} style={styles.eventContainer}>
                <View
                  style={{
                    width: "50%",
                    justifyContent: "center",
                  }}
                >
                  {pastEvents[0]?.image?.name == undefined ? (
                    <Avatar.Image
                      size={height / 8}
                      source={require("../../../../../assets/images/Spin.gif")}
                    />
                  ) : (
                    <>
                      <Avatar.Image
                        size={height / 8}
                        source={{
                          uri: `http://149.202.214.99:8085/PAC/Event/${item.image.name}`,
                        }}
                      />
                      <Text style={styles.title}>{item.name}</Text>
                    </>
                  )}
                </View>
                <View
                  style={{
                    width: "50%",
                    flexDirection:'column',
                    justifyContent:'center'
                  }}
                >
               
                  <View>
                    <Text style={styles.text}> Zone : {item.zone.name}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>Date de fin</Text>
                    <Text style={styles.text}>
                      {moment(item.endDate).locale("fr").fromNow(true)}
                    </Text>
                  </View>
                </View>
            
              </View>
            );
          })}
        </>
      ) : (
        <View style={styles.container}>
          <LottieView
            autoPlay
            style={{
              width: width / 2,
              height: height / 4,
              alignSelf: "center",
            }}
            source={require("../../../../../assets/animation/search.json")}
          />
          <View>
            <Text style={[styles.text, {textAlign:'center'}]}>Il n'y a pas d'événement passé </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: "3%",
              }}
            >
         
          
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({

  eventContainer: {
    width: "100%",
    borderWidth: 2,
    backgroundColor: "#eee",
    height: height / 5,
    alignSelf: "center",
    borderRadius: 12,
    flexDirection: "row",
    borderColor: "#b2bec3",
    marginVertical:'1%'

  },
  title: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    letterSpacing: 1.6,
    fontFamily: Font.primary,
  },
  text: {
    // textAlign: "center",
    color: "#000",
    fontSize:16,
    fontWeight:'bold',
    paddingLeft:"5%"
  },
});