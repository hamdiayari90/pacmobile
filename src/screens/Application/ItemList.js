import React, { useState , useEffect } from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import {
  Avatar,
  Card,
  Layout,
  Text,
} from "@ui-kitten/components";
import { height, width } from "../../utils/Dimention";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "../../service/api";
import { Button, ListItem } from 'react-native-elements';
import { StyleSheet, RefreshControl, SafeAreaView, ScrollView, View, Image, FlatList } from "react-native";
import { navigate } from "../../navigation/RootNavigation";


export default function ItemList({route}){

    const [refreshing, setRefreshing] = React.useState(false);
    const [itemList, setItemList] = useState();
    const [user, setUser] = useState();
    const [loadingg, setLoading] = useState(true);

    useEffect(()=> {
        getItemList();
    },[])

    async function getItemList() {
        setRefreshing(true);
        const value = await AsyncStorage.getItem("user").then(res=>{
            setUser(JSON.parse(res));
            api.getItemsByLogin(JSON.parse(res).login).then(res=>{
                setItemList(res.data);
                setLoading(false);
                setRefreshing(false);

            })
        });  
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getItemList();
      }, []);

    return(
        <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            {
                !loadingg ?
                    <View style={styles.container}>
                        {
                            itemList.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    containerStyle={{backgroundColor: 'white'}}>
                                    <ListItem.Content style={{backgroundColor: 'white'}}>
                                    <ListItem.Title
                                        style={{backgroundColor: 'white', color: 'black'}}>
                                        {item.item.name}
                                    </ListItem.Title>
                                    <ListItem.Subtitle
                                        style={{backgroundColor: 'white', color: 'black'}}>
                                        {' '}
                                        {item.qtyTaken}
                                    </ListItem.Subtitle>
                                    <ListItem.Subtitle
                                        style={{backgroundColor: 'white', color: 'black'}}>
                                        {' '}
                                        {moment(item.dateRestitutionPrevu).format('DD-MM-yyyy')}
                                    </ListItem.Subtitle>
                                    {item.returned=="InProgress"?(
                                      <ListItem.Subtitle
                                        style={{backgroundColor: 'white', color: 'black'}}>
                                        {' '}
                                        <Text>En cours</Text>
                                    </ListItem.Subtitle>
                                    ):(<ListItem.Subtitle
                                      style={{backgroundColor: 'white', color: 'black'}}>
                                      {' '}
                                      <Text>Revenu</Text>
                                  </ListItem.Subtitle>
                                  )}
                                    
                                    </ListItem.Content>
                                    <ListItem.Chevron style={{backgroundColor: 'white'}} />
                              </ListItem>
                            ))
                        }
                    </View>
                :null
            }
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
      margin: 10,
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
        justifyContent: 'flex-start',
    }
  });