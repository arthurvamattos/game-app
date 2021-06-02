import "react-native-gesture-handler";
import React from "react";

import App from "./App";
import { ThemeProvider } from "./src/contexts/theme";
import { GlobalProvider } from "./src/contexts/global";

const RootComponent: React.FC = () => {
  return (
    <ThemeProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default RootComponent;
