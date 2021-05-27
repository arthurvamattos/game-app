import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu";

import { useTheme } from "./src/contexts/theme";
import Routes from "./src/routes";

export default function App() {
  const { theme } = useTheme();

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <StatusBar
        backgroundColor={theme.colors.background}
        style={theme.title === "light" ? "dark" : "light"}
        translucent
      />
    </ThemeProvider>
  );
}
