import * as Font from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("../assets/fonts/Roboto-Italic.ttf"),
    fira: require("../assets/fonts/FiraCode-Regular.ttf"),
    "fira-bold": require("../assets/fonts/FiraCode-Bold.ttf"),
    merriweather: require("../assets/fonts/Merriweather-Regular.ttf"),
    "merriweather-bold": require("../assets/fonts/Merriweather-Bold.ttf"),
    kaushan: require("../assets/fonts/KaushanScript-Regular.ttf"),
    lobster: require("../assets/fonts/LobsterTwo-Regular.ttf"),
    pacifico: require("../assets/fonts/Pacifico-Regular.ttf"),
    gamefont: require("../assets/fonts/PressStart2P-Regular.ttf"),
    lato: require("../assets/fonts/Lato-Regular.ttf"),
    "lato-bold": require("../assets/fonts/Lato-Bold.ttf"),
    montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-italic": require("../assets/fonts/Montserrat-Italic.ttf"),
    playfair: require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "playfair-bold": require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    "playfair-italic": require("../assets/fonts/PlayfairDisplay-Italic.ttf"),
    flood: require("../assets/fonts/Flood-Std_17963.ttf"),
  });
};

export default fetchFonts;
