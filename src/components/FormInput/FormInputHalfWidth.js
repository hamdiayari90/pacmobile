import React from "react";
import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimention";
import { Input, Layout } from "@ui-kitten/components";

import AntDesign from "react-native-vector-icons/AntDesign";


import { Color } from "../../utils/Constant";

export const FormInputHalfWidth = ({
  labelValue,
  placeholderText,
  iconType,
  status,
  ...rest
}) => {
  const renderIcon = (props) => (
    <AntDesign {...props} name={iconType}  size={25} color ={Color.primary}/>
  );
  

  return (
    <Layout style={styles.layout} level="1">
  
      <Input
        style={styles.input}
        status={status}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        value={labelValue}
        accessoryLeft={renderIcon}
        size='large'
        {...rest}
        
        
    
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    width: width /1.7,
    alignSelf: "center",
    marginVertical: 5,
  },
  input: {
    borderRadius: 20,
  },
});
