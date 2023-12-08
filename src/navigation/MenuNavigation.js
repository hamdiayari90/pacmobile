import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "../screens/Application/HomeScreen";
import { ProfileScreen } from "../screens/Application/ProfileScreen";
import { EvenementScreen } from "../screens/Application/Event/EvenementScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

import { CustomDrawer } from "../components/CustomDrawer/CustomDrawer";
import { EventStack } from "./EventStack/EventStack";
import CandidateList from "../screens/Application/CandidateList";
import Reclamations from "../screens/Application/Reclamations";
import ItemList from "../screens/Application/ItemList";
import BriefScreen from "../screens/Application/BriefScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AntDesign from "react-native-vector-icons/AntDesign";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Dashboard from "../screens/Dashboard";


const Drawer = createDrawerNavigator();

export const MenuNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Accueil"
        component={Dashboard}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Evenement"
        component={EventStack}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="event" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Candidature"
        component={CandidateList}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="addusergroup" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reclamations"
        component={Reclamations}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="infocirlceo" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Stock"
        component={ItemList}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="stocking" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Brief"
        component={BriefScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="book-reader" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});
