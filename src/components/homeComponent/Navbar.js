import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Color, FontFamily, FontSize } from "../../../assets/home/GlobalStyles";

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicator1} />
      </View>
      <View style={styles.navIcon}>
        <View style={[styles.homeIcon, styles.iconFlexBox]}>
          <Image
            style={styles.vuesaxboldhomeIcon}
            resizeMode="cover"
            source={require("../../../assets/home/vuesaxboldhome.png")}
          />
          <Text style={styles.accueil}>Accueil</Text>
        </View>
        <View style={[styles.exploreIcon, styles.iconFlexBox]}>
          <Image
            style={styles.vuesaxboldhomeIcon}
            resizeMode="cover"
            source={require("../../../assets/home/vuesaxoutlinesignpost.png")}
          />
          <Text style={[styles.trouver, styles.chatTypo]}>Trouver</Text>
        </View>
        <View style={[styles.chatIcon, styles.iconFlexBox]}>
          <Text style={styles.chatTypo}>Chat</Text>
        </View>
        <View style={[styles.profileIcon, styles.iconFlexBox]}>
          <Image
            style={styles.vuesaxboldhomeIcon}
            resizeMode="cover"
            source={require("../../../assets/home/vuesaxlinearprofile.png")}
          />
          <Text style={[styles.trouver, styles.chatTypo]}>Profile</Text>
        </View>
        <Image
          style={styles.image6Icon}
          resizeMode="cover"
          source={require("../../../assets/home/image-6.png")}
        />
      </View>
      <View style={[styles.chatIcon1, styles.iconFlexBox]}>
        <Image
          style={styles.vuesaxboldhomeIcon}
          resizeMode="cover"
          source={require("../../../assets/home/vuesaxlinearmessagetext.png")}
        />
        <Text style={[styles.trouver, styles.chatTypo]}>Chat</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  chatTypo: {
    color: Color.navGray,
    fontFamily: FontFamily.hindMedium,
    fontWeight: "500",
    letterSpacing: -0.1,
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  homeIndicator1: {
    marginLeft: -66.5,
    bottom: 8,
    left: "50%",
    borderRadius: 100,
    backgroundColor: Color.foundationGreyNormal,
    width: 134,
    height: 5,
    position: "absolute",
  },
  homeIndicator: {
    top: 80,
    left: 0,
    height: 28,
    position: "absolute",
    width: 375,
  },
  vuesaxboldhomeIcon: {
    width: 24,
    height: 24,
  },
  accueil: {
    fontWeight: "700",
    fontFamily: FontFamily.hindBold,
    marginTop: 4,
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  homeIcon: {
    left: 2,
    top: 0,
    alignItems: "center",
  },
  trouver: {
    marginTop: 4,
  },
  exploreIcon: {
    left: 72,
    top: 0,
    alignItems: "center",
  },
  chatIcon: {
    left: 152,
    top: 0,
    alignItems: "center",
  },
  profileIcon: {
    left: 295,
    top: 0,
    alignItems: "center",
  },
  image6Icon: {
    top: -6,
    left: 130,
    width: 74,
    height: 68,
    position: "absolute",
  },
  navIcon: {
    top: 18,
    left: 23,
    width: 329,
    height: 44,
    position: "absolute",
  },
  chatIcon1: {
    top: 19,
    left: 255,
  },
  navbar: {
    backgroundColor: Color.colorWhite,
    height: 108,
    overflow: "hidden",
    width: 375,
  },
});

export default Navbar;
