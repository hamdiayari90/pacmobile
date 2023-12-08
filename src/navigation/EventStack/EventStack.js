import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../RootNavigation";
import { EvenementScreen } from "../../screens/Application/Event/EvenementScreen";
import { EventDetail } from "../../screens/Application/Event/EventDetail";
import { EventRegister } from "../../screens/Application/Event/EventRegister";
import { useRecoilState } from "recoil";
import { userRole } from "../../atom/authState";
import { AddComment } from "../../screens/Application/Event/AddComment";

const Stack = createNativeStackNavigator();

export const EventStack = () => {
  const [role, setRole] = useRecoilState(userRole);
  return (
    <Stack.Navigator initialRouteName="Event">
      <Stack.Screen
        name="Event"
        component={EvenementScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={{ presentation: "card" }}>
        <Stack.Screen
          name="EventDetail"
          component={EventDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventRegister"
          component={EventRegister}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
