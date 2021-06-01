import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu";

import { useTheme } from "./src/contexts/theme";
import Routes from "./src/routes";
import getAuthToken from "./src/utils/getAuthToken";

const AppNavigator = createAppContainer(
  createStackNavigator({
    Routes: {
      screen: Routes,
      navigationOptions: {
        title: "Airbnb",
        header: () => null,
      },
    },
  })
);

export default function App() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadToken() {
      await getAuthToken();
      setLoading(false);
    }
    loadToken();
  }, []);

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
      <StatusBar
        backgroundColor={theme.colors.background}
        style={theme.title === "light" ? "dark" : "light"}
        translucent
      />
    </ThemeProvider>
  );
}
