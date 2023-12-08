import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState, useRef } from "react";
// import Pdf from "react-native-pdf";
import { useRecoilValue } from "recoil";
import { briefUploadUrl } from "../../atom/eventState";
import { height, width } from "../../utils/Dimention";
import { useNavigation } from "@react-navigation/native";

const ReadPdf = ({ item }) => {
  const navigation = useNavigation()
  const {
    file: { name },
  } = item;
  const urlUpload = useRecoilValue(briefUploadUrl);
  const pdfurl = `${urlUpload}${name}`;
  const source = { uri: pdfurl, cache: true };
  const onlineSource = { uri: source, cache: true };
  const [pdfSource, setPdfSource] = useState(onlineSource);
  const pdfRef = useRef();
  return (
    <View style={styles.container}>
      <Text>pdf file here</Text>
      <Button
        title="Show Online PDF"
        onPress={() => navigation.navigate('PDF', {item})}
      />

      {/* <Pdf
        ref={pdfRef}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log("some thing went wrong when load the pdf file ");
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      /> */}
    </View>
  );
};

export default ReadPdf;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    alignSelf: "stretch",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 32,
  },
});
