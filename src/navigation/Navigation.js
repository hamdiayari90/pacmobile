import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { alreadySingnedIn, userStorage } from "../atom/authState";
import { AuthStack } from "./AuthStack";
import { Application } from "./Application";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

export const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(
    alreadySingnedIn
  );
  const [user, setUser] = useRecoilState(userStorage);
  useEffect(() => {
    checkISAuthenticated();
  }, []);
  const checkISAuthenticated = async () => {
    const value = await AsyncStorage.getItem("user");
    const parsedValue = JSON.parse(value);
    //console.log('parsedValue:', parsedValue)

    if (parsedValue !== null) {
      setUser(() => JSON.parse(value));
      setIsAuthenticated(() => true);
    }
  };

  return (
    <>
      <PaperProvider>
        {isAuthenticated ? <Application /> : <AuthStack />}
      </PaperProvider>
    </>
  );
};
