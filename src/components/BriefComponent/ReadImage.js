import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { briefUploadUrl } from "../../atom/eventState";

const ReadImage = ({ item }) => {
  
  const urlUpload = useRecoilValue(briefUploadUrl);
  const imageUrl = `${urlUpload}${item.name}`;
  console.log("nameeeeeeeeeeeeeeeeeee image",item);


  return (
    <Image
      source={{ uri: `http://149.202.214.99:8085/PAC/Brief/${item}` }}
      style={{ width: "100%", height: "100%" }}
      resizeMode="center"
    />
  );
};

export default ReadImage;

const styles = StyleSheet.create({});
