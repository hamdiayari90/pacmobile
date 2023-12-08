import React,{useState,useEffect} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, Color, FontFamily, Border, Padding } from "../../../assets/home/GlobalStyles";
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
const Eventsinprogress = ({ items }) => {
  const [events, setEvents] = useState(Array.isArray(items) ? items : []);
  const [loading, setLoading] = useState(true);
  console.log("--------------------------------------------------------------------",items);

  useEffect(() => {
    if (items && items.length > 0) {
      setEvents(items);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [items]);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.eventsinprogress}>
      <View style={styles.eventsinprogressInner}>
        <View style={[styles.bromoCabinParent, styles.bromoPosition]}>
          <View style={styles.bromoCabinShadowBox}>
            {item ? (
              <Image
                style={[styles.bromoCabinChild, styles.bromoPosition]}
                resizeMode="cover"
                source={{
                  uri: `http://149.202.214.99/media/Event/${item.image.name}`,
                }}
              />
            ) : (
              <Image
                style={[styles.bromoCabinChild, styles.bromoPosition]}
                resizeMode="cover"
                source={require("../../../assets/home/frame-7.png")}
              />
            )}

            {!item ? (
              <View style={[styles.frameParent, styles.framePosition]}>
                <View style={styles.frameWrapper}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.anniversaireUnileverAzure,
                          styles.entireClassicModernHouseLayout,
                        ]}
                      >
                        Anniversaire Unilever Azure City
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.zoneBanlieueContainer, styles.monthSpaceBlock]}>
                  <Text style={[styles.zone, styles.zoneTypo]}>Zone</Text>
                  <Text style={styles.banlieueNord}> : Banlieue Nord</Text>
                </Text>
                <Text style={[styles.dateDeFinContainer, styles.bromoPosition]}>
                  <Text style={[styles.dateDeFin, styles.zoneTypo]}>
                    <Text style={styles.dateDeFin1}>Date de fin</Text>
                    <Text style={styles.text}>{` : `}</Text>
                  </Text>
                  <Text style={[styles.jours, styles.joursTypo]}>12 Jours</Text>
                </Text>
              </View>
            ) : (
              <View style={[styles.frameParent, styles.framePosition]}>
                <View style={styles.frameWrapper}>
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.anniversaireUnileverAzure,
                          styles.entireClassicModernHouseLayout,
                        ]}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.zoneBanlieueContainer, styles.monthSpaceBlock]}>
                  <Text style={[styles.zone, styles.zoneTypo]}>Zone</Text>
                  <Text style={styles.banlieueNord}> : {item.zone.name}</Text>
                </Text>
                <Text style={[styles.dateDeFinContainer, styles.bromoPosition]}>
                  <Text style={[styles.dateDeFin, styles.zoneTypo]}>
                    <Text style={styles.dateDeFin1}>Date de fin</Text>
                    <Text style={styles.text}>{` : `}</Text>
                  </Text>
                  <Text style={[styles.jours, styles.joursTypo]}>
                    {moment(item.endDate).locale("fr").fromNow()}
                  </Text>
                </Text>
              </View>
            )}

            <View style={[styles.enSavoirPlusWrapper, styles.parentFlexBox]}>
              <Text style={styles.enSavoirPlus}>En savoir plus</Text>
            </View>
          </View>
          <View style={[styles.frameGroup, styles.bromoCabinShadowBox]}>
            <Image
              style={[styles.bromoCabinChild, styles.bromoPosition]}
              resizeMode="cover"
              source={require("../../../assets/home/frame-71.png")}
            />
            <View style={styles.framePosition}>
              <View>
                <View>
                  <View style={styles.maskGroupParent}>
                    <Image
                      style={[styles.maskGroupIcon, styles.bromoPosition]}
                      resizeMode="cover"
                      source={require("../../../assets/home/mask-group.png")}
                    />
                    <Text style={[styles.text1, styles.joursTypo]}>
                      <Text style={styles.text2}>4.5</Text>
                      <Text style={styles.text3}>{` `}</Text>
                      <Text style={styles.text4}>(98)</Text>
                    </Text>
                  </View>
                  <View style={styles.entireClassicModernHouseInParent}>
                    <Text
                      style={[
                        styles.entireClassicModernHouse,
                        styles.entireClassicModernHouseLayout,
                      ]}
                    >
                      Entire Classic-modern House in Surabaya
                    </Text>
                    <Text style={[styles.ahmadYaniYonocolo, styles.roomLayout]}>
                      Ahmad Yani, Yonocolo
                    </Text>
                  </View>
                </View>
                <View style={styles.frameParent3}>
                  <View style={styles.parentFlexBox}>
                    <Image
                      style={styles.frameItem}
                      resizeMode="cover"
                      source={require("../../../assets/home/group-2.png")}
                    />
                    <Text style={[styles.room, styles.roomLayout]}>3 room</Text>
                  </View>
                  <View
                    style={[
                      styles.vuesaxboldhomeHashtagParent,
                      styles.parentFlexBox,
                    ]}
                  >
                    <Image
                      style={styles.frameItem}
                      resizeMode="cover"
                      source={require("../../../assets/home/vuesaxboldhomehashtag.png")}
                    />
                    <Text style={[styles.room, styles.roomLayout]}>475 m2</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.monthSpaceBlock}>
                <Text style={[styles.text5, styles.zoneTypo]}>$785</Text>
                <Text style={styles.joursTypo}>
                  <Text style={styles.text3}>{` `}</Text>
                  <Text style={styles.text4}>/ month</Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <Carousel
      data={events}
      renderItem={renderCarouselItem}
      sliderWidth={300}
      itemWidth={300}
    />
  );
};

const styles = StyleSheet.create({
  bromoPosition: {
    left: 0,
    position: "absolute",
  },
  framePosition: {
    left: 124,
    top: 16,
    position: "absolute",
  },
  entireClassicModernHouseLayout: {
    width: 164,
    lineHeight: 21,
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.foundationBlueDark,
  },
  monthSpaceBlock: {
    marginTop: 18,
    textAlign: "left",
  },
  zoneTypo: {
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
  },
  joursTypo: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.hindRegular,
  },
  parentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  bromoCabinShadowBox: {
    width: 316,
    elevation: 96,
    shadowRadius: 96,
    shadowColor: "rgba(67, 67, 67, 0.15)",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 24,
    },
    height: 189,
  },
  roomLayout: {
    lineHeight: 17,
    fontSize: FontSize.size_smi,
    letterSpacing: 0.1,
  },
  bromoCabinChild: {
    borderTopLeftRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    width: 108,
    overflow: "hidden",
    top: 0,
    left: 0,
    height: 189,
  },
  anniversaireUnileverAzure: {
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
  },
  frameWrapper: {
    zIndex: 0,
  },
  zone: {
    color: Color.colorBlack,
  },
  banlieueNord: {
    color: Color.navGray,
    fontFamily: FontFamily.hindRegular,
  },
  zoneBanlieueContainer: {
    zIndex: 1,
    lineHeight: 17,
    fontSize: FontSize.size_smi,
    letterSpacing: 0.1,
  },
  dateDeFin1: {
    fontSize: 15,
  },
  text: {
    fontSize: FontSize.size_lg,
  },
  dateDeFin: {
    color: Color.foundationBlueDark,
  },
  jours: {
    color: Color.navGray,
  },
  dateDeFinContainer: {
    top: 78,
    zIndex: 2,
    textAlign: "left",
  },
  frameParent: {
    width: 176,
  },
  enSavoirPlus: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    letterSpacing: 0.1,
    textAlign: "left",
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
  },
  enSavoirPlusWrapper: {
    top: 128,
    left: 115,
    borderRadius: Border.br_30xl,
    backgroundColor: "#dadada",
    shadowColor: "rgba(11, 0, 69, 0.15)",
    shadowRadius: 117,
    elevation: 117,
    width: 130,
    justifyContent: "center",
    padding: Padding.p_5xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 24,
    },
    alignItems: "center",
    position: "absolute",
  },
  maskGroupIcon: {
    top: 1,
    width: 12,
    height: 12,
  },
  text2: {
    color: Color.foundationBlueDark,
  },
  text3: {
    color: Color.colorBlack,
  },
  text4: {
    color: Color.navGray,
  },
  text1: {
    top: 2,
    left: 18,
    lineHeight: 12,
    textAlign: "left",
    position: "absolute",
    fontSize: FontSize.size_xs,
  },
  maskGroupParent: {
    width: 59,
    height: 16,
  },
  entireClassicModernHouse: {
    fontFamily: FontFamily.hindRegular,
  },
  ahmadYaniYonocolo: {
    marginTop: 4,
    color: Color.navGray,
    fontFamily: FontFamily.hindRegular,
    textAlign: "left",
  },
  entireClassicModernHouseInParent: {
    marginTop: 8,
  },
  frameItem: {
    width: 14,
    height: 14,
  },
  room: {
    marginLeft: 6,
    color: Color.navGray,
    fontFamily: FontFamily.hindRegular,
    textAlign: "left",
  },
  vuesaxboldhomeHashtagParent: {
    marginLeft: 12,
  },
  frameParent3: {
    marginTop: 12,
    flexDirection: "row",
  },
  text5: {
    fontSize: FontSize.size_lg,
    color: Color.foundationBlueDark,
  },
  frameGroup: {
    marginLeft: 20,
  },
  bromoCabinParent: {
    top: 0,
    left: 0,
    flexDirection: "row",
  },
  eventsinprogressInner: {
    width: 668,
    height: 189,
  },
  eventsinprogress: {
    width: 359,
    flexDirection: "row",
  },
});

export default Eventsinprogress;