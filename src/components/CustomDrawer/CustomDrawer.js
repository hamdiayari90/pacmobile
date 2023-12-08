import React, { useEffect , useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Color, Padding, FontFamily, FontSize, Border} from "../../../assets/sidebar/GlobalStyles";
import { useRecoilState } from "recoil";
import { alreadySingnedIn, userStorage } from "../../atom/authState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import * as api from '../../service/api'; 
import { useNavigation } from '@react-navigation/native';
export const CustomDrawer = (props) => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(alreadySingnedIn);
    const [user,setUser] = useRecoilState(userStorage)
    const [fadeOut] = useState(new Animated.Value(1));

    const logOut = async () => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 500, // You can adjust the duration
        useNativeDriver: true,
      }).start(async () => {
        let token = await messaging().getToken();
        api.removeDevice(token).then((res) => {
          AsyncStorage.clear();
          setIsAuthenticated(() => false);
          setUser(() => {});
        });
      });
    };
  const navigateToDashboard = () => {
    navigation.navigate('Accueil'); // Use this function to navigate to the Dashboard screen
  };
  const navigateToReclamations = () => {
    navigation.navigate('Reclamations'); // Use this function to navigate to the reclamation screen
  };
  const navigateToStock = () => {
    navigation.navigate('ItemList'); // Use this function to navigate to the stock screen
  };
  const navigateToProfile = () => {
    navigation.navigate('Profile'); // Use this function to navigate to the profile screen
  };
  const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={[styles.sidebarOpen, styles.link5Border]}>
      <View style={[styles.profil, styles.profilSpaceBlock]}>
        <Image
          style={styles.fichier12}
          resizeMode="cover"
          source={require("../../../assets/sidebar/fichier-1-2.png")}
        />
        <View style={[styles.iconMore, styles.iconLayout]} />
        <Text style={[styles.amiraNouali, styles.buttonIconLayout]}>
        {user.login? user.login : ''}
                </Text>
      </View>
      <View style={[styles.divider, styles.dividerLayout]} />
      <View style={styles.navigation}>
        <View style={styles.title}>
          <Text style={[styles.overline, styles.label5Typo]}>Général</Text>
        </View>
        <TouchableOpacity style={[styles.link, styles.linkSpaceBlock]} onPress={navigateToDashboard}>
          <Image
            style={styles.iconHomeSimpleDoor}
            resizeMode="cover"
            source={require("../../../assets/sidebar/icon--homesimpledoor.png")}
          />
          <Text style={[styles.label, styles.labelTypo]}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.link, styles.linkSpaceBlock]}onPress={navigateToReclamations}>
          <Image
            style={styles.iconHomeSimpleDoor}
            resizeMode="cover"
            source={require("../../../assets/sidebar/icon--page.png")}
          />
          <Text style={[styles.label, styles.labelTypo]}>Réclamations</Text>
          </TouchableOpacity>
        <View style={[styles.dropdown, styles.linkSpaceBlock]}>
          <TouchableOpacity style={[styles.link2, styles.linkSpaceBlock1]}onPress={navigateToStock}>
            <Image
              style={styles.iconHomeSimpleDoor}
              resizeMode="cover"
              source={require("../../../assets/sidebar/icon--reports.png")}
            />
            <Text style={[styles.label2, styles.labelTypo]}>Stock</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navigation1}>
        <View style={styles.title}>
          <Text style={[styles.overline, styles.label5Typo]}>Settings</Text>
        </View>
        <View style={[styles.link, styles.linkSpaceBlock]}>
          <Image
            style={styles.iconHomeSimpleDoor}
            resizeMode="cover"
            source={require("../../../assets/sidebar/icon--bell.png")}
          />
          <Text style={[styles.label, styles.labelTypo]}>Notification</Text>
        </View>
        <TouchableOpacity style={[styles.link, styles.linkSpaceBlock]}onPress={navigateToProfile}>
          <Image
            style={styles.iconHomeSimpleDoor}
            resizeMode="cover"
            source={require("../../../assets/sidebar/icon--user-1.png")}
          />
          <Text style={[styles.label, styles.labelTypo]}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.divider1, styles.dividerLayout]} />
      <View style={[styles.footer, styles.profilSpaceBlock]}>
      <View style={styles.switch}>
  <View style={[styles.link5, styles.linkFlexBox]}>
    <Image
      style={styles.vuesaxboldtoggleOffCircleIcon}
      resizeMode="cover"
      source={require("../../../assets/sidebar/vuesaxboldtoggleoffcircle.png")}
    />
   <TouchableOpacity onPress={logOut}>
        <Animated.View style={{ opacity: fadeOut }}>
          <Text style={[styles.label5, styles.label5Typo]}>Se déconnecter</Text>
        </Animated.View>
      </TouchableOpacity>
  </View>
  <View style={[styles.link6, styles.linkFlexBox]}>
    <View style={styles.iconLayout} />
  </View>
</View>
      </View>
      <Image
        style={[styles.buttonIcon, styles.buttonIconLayout]}
        resizeMode="cover"
        source={require("../../../assets/sidebar/button.png")}
      />
    </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  link5Border: {
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  profilSpaceBlock: {
    padding: Padding.p_5xl,
    backgroundColor: Color.colorGray,
    alignSelf: "stretch",
    
  },
  iconLayout: {
    height: 16,
    width: 16,
    overflow: "hidden",
  },
  buttonIconLayout: {
    height: 28,
    position: "absolute",
  },
  dividerLayout: {
    height: 1,
    backgroundColor: Color.colorGainsboro,
    alignSelf: "stretch",
  },
  label5Typo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  linkSpaceBlock: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  labelTypo: {
    marginLeft: 12,
    lineHeight: 20,
    letterSpacing: -0.3,
    fontSize: FontSize.size_sm,
    flex: 1,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  linkSpaceBlock1: {
    paddingVertical: Padding.p_3xs,
    borderRadius: Border.br_5xs,
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  linkFlexBox: {
    paddingVertical: Padding.p_5xs,
    justifyContent: "center",
    borderRadius: Border.br_7xs,
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  fichier12: {
    width: 40,
    height: 55,
    zIndex: 0,
  },
  iconMore: {
    zIndex: 1,
  },
  amiraNouali: {
    top: 37,
    left: 75,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: FontFamily.hindBold,
    width: 141,
    zIndex: 2,
    textAlign: "left",
    height: 28,
    color: Color.colorBlack,
    position: "absolute",
  },
  profil: {
    borderTopLeftRadius: Border.br_base,
    borderTopRightRadius: Border.br_base,
    justifyContent: "space-between",
    zIndex: 0,
    alignItems: "center",
    padding: Padding.p_5xl,
    flexDirection: "row",
    backgroundColor: Color.colorGray,
  },
  divider: {
    zIndex: 1,
  },
  overline: {
    fontSize: FontSize.size_3xs,
    letterSpacing: 0,
    lineHeight: 12,
    textTransform: "uppercase",
    color: Color.colorDimgray,
  },
  title: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_xs,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  iconHomeSimpleDoor: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  label: {
    color: Color.colorDimgray,
  },
  link: {
    paddingVertical: Padding.p_3xs,
    borderRadius: Border.br_5xs,
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
  },
  label2: {
    color: Color.colorBlack,
  },
  link2: {
    alignSelf: "stretch",
  },
  dropdown: {
    alignItems: "flex-end",
  },
  navigation: {
    paddingHorizontal: Padding.p_5xl,
    paddingTop: Padding.p_5xl,
    zIndex: 2,
    alignSelf: "stretch",
  },
  navigation1: {
    zIndex: 3,
    flex: 1,
    padding: Padding.p_5xl,
    alignSelf: "stretch",
  },
  divider1: {
    zIndex: 4,
  },
  vuesaxboldtoggleOffCircleIcon: {
    width: 22,
    height: 22,
  },
  label5: {
    fontSize: 12,
    letterSpacing: -0.2,
    lineHeight: 16,
    marginLeft: 8,
    color: Color.colorBlack,
  },
  link5: {
    width: 153,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  link6: {
    width: 98,
    marginLeft: 4,
  },
  switch: {
    padding: 4,
    borderRadius: Border.br_5xs,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  footer: {
    borderBottomRightRadius: Border.br_base,
    borderBottomLeftRadius: Border.br_base,
    zIndex: 5,
    padding: Padding.p_5xl,
    backgroundColor: Color.colorGray,
  },
  buttonIcon: {
    top: 59,
    right: -12,
    width: 28,
    zIndex: 6,
    borderRadius: Border.br_5xs,
    height: 28,
    position: "absolute",
  },
  sidebarOpen: {
    borderRadius: Border.br_base,
    width: 'auto',
    height: 660,
    overflow: "hidden",
  },
});
