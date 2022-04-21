import "react-native-gesture-handler";
import React, { useState } from "react";
import { AppRegistry, useColorScheme, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from "@react-navigation/native";
import { name as appName } from "./app.json";
import { theme } from "./constants/theme";
import Navigation from "./navigation/Navigation";
import { store } from "./store/store";
import { Provider as ReduxProvider } from "react-redux";
import LoadApp from "./components/LoadApp";

export default function App() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  const CombinedDefaultTheme = {
    ...theme.DefaultTheme,
    ...NavDefaultTheme,
    colors: {
      ...theme.DefaultTheme.colors,
      ...NavDefaultTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...theme.DarkTheme,
    ...NavDarkTheme,
    colors: {
      ...theme.DarkTheme.colors,
      ...NavDarkTheme.colors,
    },
  };

  return (
    <ReduxProvider store={store}>
      {loading ? (
        <LoadApp onLoad={(state) => setLoading(state)} />
      ) : (
        <PaperProvider
          theme={
            colorScheme === "light" ? CombinedDefaultTheme : CombinedDarkTheme
          }
        >
          <View
            style={{
              flex: 1,
              backgroundColor: colorScheme === "light" ? "#fff" : "#000",
            }}
          >
            <NavigationContainer
              theme={
                colorScheme === "light"
                  ? CombinedDefaultTheme
                  : CombinedDarkTheme
              }
            >
              <Navigation />
            </NavigationContainer>
          </View>
        </PaperProvider>
      )}
    </ReduxProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
