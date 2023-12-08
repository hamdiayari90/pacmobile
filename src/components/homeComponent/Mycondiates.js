import  React,{useState,useEffect} from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Color, FontFamily, FontSize, Border, Padding } from "../../../assets/home/GlobalStyles";
import moment from 'moment/min/moment-with-locales';

const Mycondiates = (item) => {
  const [candidateList, setCandidateList] = useState(item.item);
  const [loading, setLoading] = useState(true);
  console.log("**********************************************************************",item.item);
  useEffect(() => {
    
  }, []);


  if (candidateList[0]) {     console.log('Event Name:', item.item[0]?.event?.name);     console.log('Expiration Date:', moment(candidateList[0].expirationDate).format('DD-MM-yyyy hh:mm'));   }

  return (
    <LinearGradient
      style={styles.mycondiates}
      locations={[0, 1]}
      colors={["#917afd", "#6246ea"]}
      useAngle={true}
      angle={135.53}
    >
      <LinearGradient
        style={styles.mycondiatesChild}
        locations={[0, 1]}
        colors={["#917afd", "#6246ea"]}
        useAngle={true}
        angle={135.53}
      />
        {
            loading&&!candidateList?(
              <View
                style={[
                  styles.anniversaireUnileverAzureCiParent,
                  styles.enSavoirPlusWrapperPosition,
                ]}
              >
                <Text style={styles.anniversaireUnileverAzureCi}>
                  Anniversaire Unilever Azure-City
                </Text>
                <Text style={[styles.expireLe07092023, styles.enSavoirPlusLayout]}>
                  Expire le 07/09/2023 01:39
                </Text>
              </View>
            ):(
              <View
                style={[
                  styles.anniversaireUnileverAzureCiParent,
                  styles.enSavoirPlusWrapperPosition,
                ]}
              >
              <Text style={styles.anniversaireUnileverAzureCi}>{candidateList[0]? candidateList[0]?.event?.name : ''}</Text>
              <Text style={[styles.expireLe07092023, styles.enSavoirPlusLayout]}>
                Expire le {candidateList[0]? moment(candidateList[0].expirationDate).format('DD-MM-yyyy hh:mm') : ''}
              </Text>
            </View>
            )
          }
      <View
        style={[styles.enSavoirPlusWrapper, styles.enSavoirPlusWrapperPosition]}
      >
        <Text style={[styles.enSavoirPlus, styles.enSavoirPlusLayout]}>
          En savoir plus
        </Text>
      </View>
      {
        candidateList[0]?(
          <Image
            style={styles.lukeStackpooleEwqogjLfiiUnIcon}
            resizeMode="cover"
            source={{
              uri: `http://149.202.214.99:8085/PAC/Event/${candidateList[0]?.event?.image?.name}`,
            }}
          />
        ):(
          <Image
          style={styles.lukeStackpooleEwqogjLfiiUnIcon}
          resizeMode="cover"
          source={require("../../../assets/home/lukestackpooleewqogjlfiiunsplash-1.png")}
        />
        )
      }
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  enSavoirPlusWrapperPosition: {
    left: 24,
    position: "absolute",
  },
  enSavoirPlusLayout: {
    lineHeight: 18,
    textAlign: "left",
  },
  mycondiatesChild: {
    top: 50,
    left: 31,
    borderRadius: 8,
    width: 282,
    height: 149,
    overflow: "hidden",
    opacity: 0.45,
    position: "absolute",
    backgroundColor: "transparent",
  },
  anniversaireUnileverAzureCi: {
    fontSize: 20,
    letterSpacing: 0.2,
    lineHeight: 24,
    color: Color.colorWhite,
    width: 147,
    textAlign: "left",
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
  },
  expireLe07092023: {
    fontSize: FontSize.size_smi,
    letterSpacing: 0.3,
    fontFamily: FontFamily.hindRegular,
    color: "#e3ddff",
    width: 177,
    marginTop: 8,
  },
  anniversaireUnileverAzureCiParent: {
    top: 24,
  },
  enSavoirPlus: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0.1,
    fontFamily: FontFamily.hindBold,
    fontWeight: "700",
    lineHeight: 18,
  },
  enSavoirPlusWrapper: {
    top: 141,
    borderRadius: Border.br_30xl,
    backgroundColor: Color.foundationWhiteLight,
    shadowColor: "rgba(11, 0, 69, 0.15)",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 117,
    elevation: 117,
    shadowOpacity: 1,
    width: 130,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_5xs,
  },
  lukeStackpooleEwqogjLfiiUnIcon: {
    top: 0,
    left: 222,
    borderTopRightRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_3xs,
    width: 123,
    position: "absolute",
    height: 199,
  },
  mycondiates: {
    borderRadius: Border.br_3xs,
    width: 343,
    backgroundColor: "transparent",
    height: 199,
  },
});

export default Mycondiates;
