import React, { useState, useEffect } from "react";
import { Layout, Text, Card } from "@ui-kitten/components";
import { height, width } from "../../utils/Dimention";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "../../service/api";
import {} from "react-native-elements";
import { StyleSheet, RefreshControl, View } from "react-native";

import { KeyboardAvoidingView } from "react-native";
import { Avatar } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Color } from "../../utils/Constant";
import { FlashList } from "@shopify/flash-list";
import { NoData } from "../../components/NoData/NoData";
import { useRecoilValue } from "recoil";
import { partnerUploadUrl } from "../../atom/eventState";
import moment from "moment/min/moment-with-locales";
import CondidateCard from "../../components/CondidateCard/CondidateCard";

export default function CandidateList({ route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [candidateList, setCandidateList] = useState([]);
  const [user, setUser] = useState();
  const [loadingg, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const imageUrlPartner = useRecoilValue(partnerUploadUrl);
  useEffect(() => {
    if (isFocused) {
      getCandidates();
    }
  }, [isFocused]);

  async function getCandidates() {
    setRefreshing(true);
    const value = await AsyncStorage.getItem("user").then((res) => {
      setUser(JSON.parse(res));
      api.getCandidatesByLogin(JSON.parse(res).login).then((res) => {
        setCandidateList(() => res.data);
        setLoading(false);
        setRefreshing(false);
      });
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCandidates();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlashList
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View style={styles.ListHeaderComponentContainer}>
            {candidateList.length > 0 && (
              <Text style={styles.title}>Toutes vos candidatures</Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.ListEmptyComponent}>
            <NoData message="Pas de candidature" />
          </View>
        }
        data={candidateList}
        estimatedItemSize={50}
        renderItem={({ item }) => {
          return <CondidateCard item={item} />;
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.light },
  ListEmptyComponent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    color: Color.primary,
  },
  ListHeaderComponentContainer: {
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
  },
});
