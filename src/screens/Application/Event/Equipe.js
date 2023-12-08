import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { api, userStorage } from "../../../atom/authState";
import { FlashList } from "@shopify/flash-list";
import { height } from "../../../utils/Dimention";
import { Avatar } from "react-native-paper";
import { Font } from "../../../utils/Constant";
import moment from "moment/min/moment-with-locales";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Entypo from "react-native-vector-icons/Entypo";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import * as apiService from "../../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";


export const Equipe = ({ route }) => {
  const url = useRecoilValue(api);
  const user = useRecoilValue(userStorage);
  const [equip, setEquip] = useState();
const navigation = useNavigation()
  useEffect(() => {
    getEquip();
  }, []);

  const getEquip = async () => {
    let data = await fetchequipebyRole();
    console.log("data:", data.length);
    setEquip(() => data);
  };

  const fetchequipebyRole = async () => {
    try {
      let endPooint = ``;
      let auth = user.token ? user.token : tokenAuth.token;

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${auth}`,
        },
      };

      if (user.role[0] == "ROLE_SUPERVISOR") {
        endPooint = `${url}/affect/animators/${user.id}/${route.params.enventId}`;
      } else {
        endPooint = `${url}/affect/supervisors/${user.id}/${route.params.enventId}`;
      }

      let result = await fetch(endPooint, requestOptions);
      return result.json();
    } catch (e) {
      console.log("e:", e);
    }
  };

  async function sendLocation(user){
    const value = await AsyncStorage.getItem("user").then(res=>{
      let data={
        idTransmitter:JSON.parse(res).id,
        idReceiver:user.id,
        idEvent:route.params.enventId,
        demande:"LOCALISATION"
      }
      apiService.suivieDemande(data).then(result=>{
        console.log(result.data);
        apiService.suivieDemandeNotif(result.data).then(resultNotif=>{
          navigation.goBack()
          showMessage({
            message: "send with succes Locationnnnnn",
            type: "success",
            autoHide: true

          });
          
        })
      })
    })
  }
  async function sendPhoto(user){
    const value = await AsyncStorage.getItem("user").then(res=>{
      let data={
        idTransmitter:JSON.parse(res).id,
        idReceiver:user.id,
        idEvent:route.params.enventId,
        demande:"IMAGE"
      }
      apiService.suivieDemande(data).then(result=>{
        console.log(result.data);
        apiService.suivieDemandeNotif(result.data).then(resultNotif=>{
          console.log('resultNotif:', resultNotif.data)
          console.log("send with succes Imageeeeeeeeee");
          navigation.goBack()
          showMessage({
            message: "send with succes Imageeeeeeeeee",
            type: "success",
            autoHide: true
          });
        })
      })
    })
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Liste d'equipe Equipe</Text>

      <FlashList
        renderItem={({ item }) => {
          let imageUrlSuperVisor = `http://149.202.214.99:8085/PAC/Supervisor/${item.image.name}`
          let imageurlAnimator = `http://149.202.214.99:8085/PAC/Animator/${item.image.name}`
          return (
            <View key={item.id} style={styles.eventContainer}>
              <View
                style={{
                  width: "30%",
                  justifyContent: "center",
                }}
              >
                {equip[0]?.image?.name == undefined ? (
                  <Avatar.Image
                    size={height / 8}
                    source={require("../../../../assets/images/profileImage.png")}
                  />
                ) : (
                  <>
                    {user.role[0] == "ROLE_SUPERVISOR" ? (
                      <Avatar.Image
                        size={height / 8}
                        source={{
                          uri:imageUrlSuperVisor,
                        }}
                      />
                    ) : (
                      <Avatar.Image
                        size={height / 8}
                        source={{
                          uri: imageurlAnimator,
                        }}
                      />
                    )}

                    <Text style={styles.title}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </>
                )}
              </View>
              <View
                style={{
                  width: "40%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.text}>phone : {item.phone}</Text>
              </View>
              {user.role[0] == "ROLE_SUPERVISOR" ? (
                <View
                style={{
                  width: "30%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <View style={{ margin: "8%" }}>
                  <FontAwesome name="phone" size={24} color="black" />
                </View>
                <TouchableOpacity onPress={()=>sendPhoto(item)} style={{ margin: "8%" }}>
                  <FontAwesome name="image" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>sendLocation(item)} style={{ margin: "8%" }}>
                  <Entypo name="location" size={24} color="black" />
                </TouchableOpacity>
              </View>
              ):(
                <View
                style={{
                  width: "30%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <View style={{ margin: "8%" }}>
                  <FontAwesome name="phone" size={24} color="black" />
                </View>
              </View>
              )}
              
            </View>
          );
        }}
        estimatedItemSize={50}
        data={equip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventContainer: {
    width: "93%",
    borderWidth: 2,
    backgroundColor: "#a29bfe",
    height: height / 5,
    alignSelf: "center",
    borderRadius: 12,
    flexDirection: "row",
    borderColor: "#6c5ce7",
    marginVertical: "1%",
    margin:10
  },
  title: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    letterSpacing: 1.6,
    fontFamily: Font.primary,
    marginBottom :'3%',
    fontSize:18,
    marginTop:'3%'
  },
  text: {
    // textAlign: "center",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: "5%",
    padding:"4%"
  },
});
