import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Home from "./pages/Home";
import Game from "./pages/Game";

export default createSharedElementStackNavigator(
  {
    Home,
    Game,
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyleInterpolator: ({ current: { progress } }) => {
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        });

        const borderRadius = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
          extrapolate: "clamp",
        });

        return { cardStyle: { opacity, borderRadius } };
      },
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: "transparent",
      },
    },
  }
);
