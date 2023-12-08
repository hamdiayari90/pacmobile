import React, { useState, useEffect } from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Avatar, Card, Layout, Text } from "@ui-kitten/components";
import { height, width } from "../../utils/Dimention";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "../../service/api";
import { Button, ListItem } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Color } from "../../utils/Constant";
import { FlashList } from "@shopify/flash-list";
import ReclamationCard from "../../components/ReclamationCard/ReclamationCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function Reclamations({ route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [reclamationsList, setReclamations] = useState([]);
  const [user, setUser] = useState();
  const [loadingg, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) {
      getReclamations();
    }
  }, [isFocused]);

  async function getReclamations() {
    setRefreshing(true);
    const value = await AsyncStorage.getItem("user").then((res) => {
      setUser(JSON.parse(res));
      api.getReclamationsByLogin(JSON.parse(res).login).then((res) => {
        setReclamations(() => res.data);
        setLoading(false);
        setRefreshing(false);
      });
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getReclamations();
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View style={{ width: "90%", alignSelf: "center", marginTop: "2%" }}>
            <Button
              title={"Ajouter reclamation"}
              onPress={() => navigation.navigate("AddReclamation")}
            />
          </View>
        }
        renderItem={({ item, index }) => {
          return <ReclamationCard item={item} index={index} />;
        }}
        estimatedItemSize={50}
        data={reclamationsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  card: {
    margin: 2,
  },
  header: {
    flexDirection: "row",
  },
  avatar: {
    marginRight: 24,
  },
  image: {
    height: height / 4,
    marginBottom: 16,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  timeAgo: {
    marginLeft: "auto",
    fontWeight: "bold",
    color: "green",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  footerDetail: {
    alignSelf: "center",
  },
  scrollView: {
    justifyContent: "flex-start",
  },
});
