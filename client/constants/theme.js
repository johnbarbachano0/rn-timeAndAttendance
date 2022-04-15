import { DefaultTheme, DarkTheme } from "react-native-paper";
import Color from "./Color";

export const theme = {
  DarkTheme,
  DefaultTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Color.primary.light,
      accent: Color.secondary.light,
      surface: "#81E8FF",
      header: "#FFC24C",
    },
  },
};

// primary - primary color for your app, usually your brand color.
// accent - secondary color for your app which complements the primary color.
// background - background color for pages, such as lists.
// surface - background color for elements containing content, such as cards.
// text - text color for content.
// disabled - color for disabled elements.
// placeholder - color for placeholder text, such as input placeholder.
// backdrop - color for backdrops of various components such as modals.
// onSurface - background color for snackbars
// notification - background color for badges

// fonts (object): various fonts used throughout different elements.
// regular
// medium
// light
// thin
