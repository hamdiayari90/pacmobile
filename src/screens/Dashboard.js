import React, { useState,useEffect } from "react";
import { Image, StyleSheet, View, Text,TouchableOpacity, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Color, Border, FontFamily, FontSize } from "../../assets/dashboard/GlobalStyles";
import { useRecoilState } from "recoil";
import { alreadySingnedIn, userStorage } from "../atom/authState";
import Eventsinprogress from "../components/homeComponent/Eventsinprogress";
import Mycondiates from "../components/homeComponent/Mycondiates";
import { fetchAllCurrentEvent } from "../service/EventService/EventService";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as api from "../service/api";


const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] =useRecoilState(alreadySingnedIn);
  const [user,setUser] = useRecoilState(userStorage);
  const navigation = useNavigation();
  const [event, setEvent] = useState([]);
  const isFocused = useIsFocused();
  const [candidateList, setCandidateList] = useState([]);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingCandidates, setLoadingCandidates] = useState(true);

  useEffect(() => {
      fetchUserEvent();
      getCandidates();
  }, []);
  const fetchUserEvent = async () => {
    try {
      const data = await fetchAllCurrentEvent(user.token, user.id);
      setLoadingEvent(false);
      setEvent(data);
      console.log("event///////////////////////////////////////////////////////////////////////////", data);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };  
  async function getCandidates() {
    api.getCandidatesByLogin(user.login).then((res) => {
      setLoadingCandidates(false);
      setCandidateList(() => res.data);
      console.log("candidate",res.data);

    });
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
    <View style={styles.dashboard}>
      <Text style={[styles.title1, styles.titleTypo]}>Bonjour, {user.login? user.login : ''}</Text>
      <TouchableOpacity style={[styles.rectangleParent, styles.rectangleLayout]} onPress={() => navigation.navigate("Reclamations")}>
        <LinearGradient
          style={[styles.rectangle3, styles.rectangleLayout]}
          locations={[0, 1]}
          colors={["#2db398", "#3dc8ac"]}
          useAngle={true}
          angle={-76.14}
        />
        <Image
          style={styles.groupChild}
          resizeMode="cover"
          source={require("../../assets/dashboard/group-2.png")}
        />
        <Text style={[styles.rclamations, styles.rclamationsTypo]}>
          Réclamations
        </Text>
      </TouchableOpacity>
      <View style={[styles.rectangleGroup, styles.rectangleLayout]}>
        <LinearGradient
          style={[styles.rectangle3, styles.rectangleLayout]}
          locations={[0, 1]}
          colors={["#f88e11", "#f68070"]}
          useAngle={true}
          angle={-75.96}
        />
        <Text style={[styles.rclamations, styles.rclamationsTypo]}>
          Pointage
        </Text>
        <Image
          style={styles.groupChild}
          resizeMode="cover"
          source={require("../../assets/dashboard/group-3.png")}
        />
      </View>
      <View style={styles.section1}>
        <View style={styles.frameFlexBox}>
          <View style={styles.vnementsEnCoursParent}>
            <Text style={[styles.vnementsEnCours, styles.rclamationsTypo]}>
              Événements en cours
            </Text>
            <Eventsinprogress items={event}/>
          </View>
          <Text style={styles.voirTout}>Voir tout</Text>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameFlexBox]}>
        <View style={styles.vnementsEnCoursParent}>
          <Text style={[styles.vnementsEnCours, styles.rclamationsTypo]}>
            Mes condidature
          </Text>
          <Text style={styles.vennementsTunis}>5 Candidatures</Text>
          <Mycondiates item={candidateList} />
        </View>
        <Text style={styles.voirTout}>Voir tout</Text>
      </View>
    </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  rectangleLayout1: {
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_11xs,
    left: "16.67%",
    height: "8.33%",
    position: "absolute",
  },
  titleTypo: {
    color: Color.colorGray_100,
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
    position: "absolute",
  },
  rectangleLayout: {
    height: 80,
    width: 160,
    position: "absolute",
  },
  rclamationsTypo: {
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
    textAlign: "left",
  },
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  uiBarsHomeIndicatorHom: {
    top: "20%",
    width: 375,
    height: 34,
    left: 0,
    position: "absolute",
  },
  groupIcon: {
    top: "0%",
    left: "0%",
    width: 0,
    height: 0,
    position: "absolute",
  },
  rectangle: {
    top: "20.83%",
    bottom: "70.83%",
    right: "12.5%",
    width: "70.83%",
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_11xs,
    left: "16.67%",
    height: "8.33%",
  },
  rectangle1: {
    top: "45.83%",
    bottom: "45.83%",
    right: "12.5%",
    width: "70.83%",
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_11xs,
    left: "16.67%",
    height: "8.33%",
  },
  rectangle2: {
    width: "33.33%",
    top: "70.83%",
    right: "50%",
    bottom: "20.83%",
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_11xs,
    left: "16.67%",
    height: "8.33%",
  },
  iconArrowBackMBlack33ab5c: {
    top: "5%",
    left: 16,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  title: {
    top: "5%",
    left: 160,
    fontSize: 17,
    letterSpacing: -0.4,
    lineHeight: 22,
    textAlign: "center",
  },
  title1: {
    top: "1%",
    fontSize: 28,
    letterSpacing: 0.4,
    lineHeight: 34,
    textAlign: "left",
    left: 20,
  },
  rectangle3: {
    top: 0,
    borderRadius: Border.br_xs,
    backgroundColor: "transparent",
    left: 0,
  },
  groupChild: {
    top: 45,
    left: 125,
    width: 25,
    height: 25,
    position: "absolute",
  },
  rclamations: {
    top: 25,
    left: 15,
    fontSize: FontSize.size_mini,
    letterSpacing: -0.2,
    lineHeight: 20,
    color: Color.colorWhite,
    textAlign: "left",
    position: "absolute",
  },
  rectangleParent: {
    top: "8%",
    width: 160,
    left: 20,
  },
  rectangleGroup: {
    left: 195,
    top: "8%",
    width: 160,
  },
  vnementsEnCours: {
    fontSize: FontSize.size_lg,
    lineHeight: 23,
    color: Color.foundationBlueDark,
    letterSpacing: 0.2,
    textAlign: "left",
  },
  vennementsTunis: {
    fontSize: FontSize.size_smi,
    lineHeight: 17,
    fontFamily: FontFamily.hindRegular,
    color: Color.navGray,
    marginTop: 4,
    letterSpacing: 0.2,
    textAlign: "left",
  },
  vnementsEnCoursParent: {
    zIndex: 0,
  },
  voirTout: {
    top: "2%",
    left: 290,
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: FontFamily.hindMedium,
    color: Color.iris80,
    textAlign: "right",
    width: 61,
    height: 18,
    zIndex: 1,
    letterSpacing: 0.2,
    position: "absolute",
  },
  section1: {
    top: "24%",
    left: "2%",
    width: "100%",
    position: "absolute",
  },
  frameGroup: {
    top: "60%",
    left: "2%",
    position: "absolute",
  },
  dashboard: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    width: "100%",
    height: 806,
    overflow: "hidden",
  },
});

export default Dashboard;
