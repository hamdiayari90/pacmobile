import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../../assets/BotNav/GlobalStyles";

const BotNav = () => {
  return (
    <View style={styles.botNav}>
      <View style={styles.navIcon}>
        <View style={[styles.homeIcon, styles.iconFlexBox]}>
          <Image
            style={styles.vuesaxboldhomeIcon}
            resizeMode="cover"
            source={require("../../assets/BotNav/vuesaxboldhome.png")}
          />
          <Text style={styles.accueil}>Accueil</Text>
        </View>
        <View style={[styles.exploreIcon, styles.iconFlexBox]}>
          <Image
            style={styles.vuesaxboldhomeIcon}
            resizeMode="cover"
            source={require("../../assets/BotNav/vuesaxoutlinesignpost.png")}
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
            source={require("../../assets/BotNav/vuesaxlinearprofile.png")}
          />
          <Text style={[styles.trouver, styles.chatTypo]}>Profile</Text>
        </View>
        <Image
          style={styles.image6Icon}
          resizeMode="cover"
          source={require("../../assets/BotNav/image-6.png")}
        />
      </View>
      <View style={[styles.chatIcon1, styles.iconFlexBox]}>
        <Image
          style={styles.vuesaxboldhomeIcon}
          resizeMode="cover"
          source={require("../../assets/BotNav/vuesaxlinearmessagetext.png")}
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
  botNav: {
    backgroundColor: "#fff",
    width: 375,
    height: 74,
    overflow: "hidden",
  },
});

export default BotNav;
