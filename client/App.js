import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { AppRegistry, useColorScheme } from "react-native";
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

// import { init, dropTable } from "./helpers/db";

// init()
//   .then(() => {
//     console.log("Initialized database");
//   })
//   .catch((error) => {
//     Alert.alert("Database Error!", "Restart App.", [
//       { text: "OK", onPress: () => {} },
//     ]);
//   });

// dropTable("places").then((res) => console.log(res));

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
          <NavigationContainer
            theme={
              colorScheme === "light" ? CombinedDefaultTheme : CombinedDarkTheme
            }
          >
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      )}
    </ReduxProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
