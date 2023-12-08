import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import { LoginScreen } from "../screens/Authentication/LoginScreen";
import { RegisterScreen } from "../screens/Authentication/RegisterScreen";
import SuperVisorScreen from "../screens/Authentication/SuperVisorScreen";
import AnimatorRegisterScreen from "../screens/Authentication/AnimatorRegisterScreen";
import { useRecoilState } from "recoil";
import { userRole } from "../atom/authState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SigninPage from "../screens/SigninPage";
import LoginPage from "../screens/LoginPage";
import Login2 from "../screens/Login2";
import InscriptionSup1 from "../screens/InscriptionSup1";
import InscriptionSup2 from "../screens/InscriptionSup2";
import InscriptionSup3 from "../screens/InscriptionSup3";
import Inscription1 from "../screens/Inscription1";
import Inscription2 from "../screens/Inscription2";
import Inscription3 from "../screens/Inscription3";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {


 
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
            name="SignIn"
            component={SigninPage}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="Login2"
            component={Login2}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="InscriptionSup1"
            component={InscriptionSup1}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="InscriptionSup2"
            component={InscriptionSup2}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="InscriptionSup3"
            component={InscriptionSup3}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="Inscription1"
            component={Inscription1}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="Inscription2"
            component={Inscription2}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
            name="Inscription3"
            component={Inscription3}
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SuperVisor"
          component={SuperVisorScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Animator"
          component={AnimatorRegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
