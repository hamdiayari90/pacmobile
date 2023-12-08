import React from "react";
import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimention";
import { Input, Layout } from "@ui-kitten/components";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Color } from "../../utils/Constant";

export const FormInput = ({
  labelValue,
  placeholderText,
  iconType,
  status,
  defaultValue,
  ...rest
}) => {
  const renderIcon = (props) => (
    <MaterialCommunityIcons  name={iconType}  size={25} color ={Color.primary}/>
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
        defaultValue={defaultValue}
        {...rest}
     
        
        
        
    
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    width: width - 30,
    alignSelf: "center",
    // marginVertical: 5,
  },
  input: {
    borderRadius: 20,
  },
});
