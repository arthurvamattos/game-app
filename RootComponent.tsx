import "react-native-gesture-handler";
import React from "react";

import App from "./App";
import { ThemeProvider } from "./src/contexts/theme";

const RootComponent: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default RootComponent;
