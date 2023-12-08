import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Color, Font } from "../../utils/Constant";
import { getAllBrieffByIf } from "../../service/BriefService/BriefService";
import { useRecoilValue } from "recoil";
import { userStorage } from "../../atom/authState";
import { briefUploadUrl } from "../../atom/eventState";
import { FlashList } from "@shopify/flash-list";
import ReadVideo from "../../components/BriefComponent/ReadVideo";
// import ReadPdf from "../../components/BriefComponent/ReadPdf";
import ReadImage from "../../components/BriefComponent/ReadImage";
import { height, width } from "../../utils/Dimention";
import { Card } from "react-native-paper";
import * as api from '../../service/api';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BriefsByEvent = ({route}) => {
  const user = useRecoilValue(userStorage);

  const uploadUrl = useRecoilValue(briefUploadUrl);
  const [breif, setAllBrief] = useState([]);
  useEffect(() => {
    getBriefs();
  }, []);
  async function getBriefs() {
      api.getBriefsByEvent(route.params.enventId).then((res) => {
        console.log("*************",res.data);
        setAllBrief(() => res.data);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toute mes Brief</Text>
      <View style={styles.flashListContainer}>
      <FlashList
              data={breif}
              renderItem={({ item }) =>
                  <FlashList
                  data={item.file}
                  renderItem={({ item }) =>
                    item.type === "video/mp4" ? (
                      <Card style={styles.briefContainer}>
                        <ReadVideo item={item.name} />
                      </Card>
                    ) : item.type === "application/pdf" ? (
                      <Card style={styles.briefContainer}>
                        {/* <ReadPdf item={item} /> */}
                      </Card>
                    ) : item.type.includes("image") ? (
                      <Card style={styles.briefContainer}>
                        <ReadImage item={item.name} />
                      </Card>
                    ) : null
                    
                  }
                  estimatedItemSize={50}
                />
                
              }
              estimatedItemSize={50}
            />
      </View>
    </View>
  );
};

export default BriefsByEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
    paddingTop: "3%",
  },
  title: {
    textAlign: "center",
    fontFamily: Font.primary,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  flashListContainer: {
    marginTop: "2%",
    flex: 1,
  },
  briefContainer: {
    height: height / 4,
    width: "93%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },

});
