import { StyleSheet, SafeAreaView, View, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { api, userStorage, userToken } from "../../../atom/authState";
import { RefreshingControl } from "../../../components/RefreshingControl/RefreshingControl";
import EvilIcons from "react-native-vector-icons/EvilIcons";


import {
  Avatar,
  Button,
  Card,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";
import { CustumButtom } from "../../../components/CustumButtom/CustumButtom";
import { height, width } from "../../../utils/Dimention";
import moment from "moment";
import { Color } from "../../../utils/Constant";
import { navigate } from "../../../navigation/RootNavigation";
var fr = moment().locale("fr");
export const EventDetail = ({ navigation, route }) => {
  // to do
  // ==========================================================================================
  // here we need to check if the event id comming from route.params or from notification data
  // ==========================================================================================

  const { eventId } = route.params;
  // console.log("eventId as route params :", eventId);

  const user = useRecoilValue(userStorage);
  const tokenAuth = useRecoilValue(userToken);
  const url = useRecoilValue(api);
  const [event, setEvent] = useState({});
  const [partner, setPartner] = useState({});
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllEventByID();
  }, []);

  // ===============================================================================
  // ======================== PROMISE WAITING  ======================================
  // ===============================================================================
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // ===============================================================================
  // ========================FETCH  EVENT BY ID ==================================
  // ===============================================================================

  const getAllEventByID = async () => {
    let data = await fetchEventByID();
    //console.log("data===================> \n:", data.products);
    setEvent(() => data);
    setPartner(() => data.partner);
    setProducts(() => data.products);
    setLocations(() => data.locations);
    wait(500).then(() => setLoading(true));
  };

  const fetchEventByID = async () => {
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
      if (eventId) {
        let result = await fetch(`${url}/event/${eventId}`, requestOptions);
        return result.json();
      }
    } catch (e) {}
  };

  // ===============================================================================
  // ======================== Header ===============================================
  // ===============================================================================
  const Header = (props) => (
    <View {...props} style={[ styles.header]}>
      <Avatar
        source={{
          uri: `http://149.202.214.99:8085/PAC/Partner/${partner.image.name}`,
        }}
        style={styles.avatar}
      />
      <View>
        <Text category="h6">{event.name}</Text>
        <Text category="s1">{event.products[0].name}</Text>
      </View>
    </View>
  );

  // ===============================================================================
  // ======================== Footer  ==============================================
  // ===============================================================================
  const Footer = (props) => (
    <>
      <View {...props} style={[styles.footerContainer]}>
        <Text category="s1">
          Start{" "}
          <Text category="s2" style={styles.timeAgo}>
            {" "}
            {moment(event.startDate).endOf("day").fromNow()}
          </Text>
        </Text>
        <Text category="s2" style={styles.timeAgo}>
          <Text category="s1">Postuler avant </Text>
          {moment(event.expirationDate).endOf("day").locale("fr").fromNow()}
        </Text>
      </View>

      <View style={styles.footerDetail}>
        <View>
          <Text style={{ fontWeight: "bold", letterSpacing: 1.5 }}>
            Cet événement commance dans{" "}
            <Text style={[styles.timeAgo, { textDecorationLine: "underline" }]}>
              {moment(event.endDate).endOf("day").fromNow()}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <>
      {loading ? (
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <Card style={styles.card} header={Header} footer={Footer}>
              <Image
                source={{
                  uri: `http://149.202.214.99:8085/PAC/Event/${event.image.name}`,
                }}
                style={styles.image}
              />
              <Text>{event.message}</Text>
            </Card>
          </Layout>
          <View>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}
            >
              Lieux de deroulement de l'événement
            </Text>
            <View>
              <FlatList
                data={locations}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        marginLeft: width / 6,
                        flexDirection: "row",
                        marginVertical: "1%",
                      }}
                    >
                      <View
                        style={{
                          width: "50%",
                          flexDirection: "row",
                          marginVertical: "1%",
                        }}
                      >
                        <EvilIcons name="location" size={24} color="black" />
                        <Text style={{ fontWeight: "bold" }}>
                          {item.address}{" "}
                        </Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={{}}> zone {item.zone.name} </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustumButtom
              color={Color.secondary}
              title="anuller"
              onPress={() => navigation.goBack()}
            />
            <CustumButtom
              color={Color.secondary}
              title="postuler"
              onPress={() => navigation.navigate("EventRegister")}
              visible={true}
            />
          </View>
        </SafeAreaView>
      ) : (
        <RefreshingControl />
      )}
    </>
  );
};

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
});
