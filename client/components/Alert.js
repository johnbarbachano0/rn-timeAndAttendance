import { Alert } from "react-native";

export const createAlert = (
  type,
  title,
  message,
  buttonText,
  yesPress,
  noPress
) => {
  type === "oneButton" &&
    Alert.alert(title, message, [
      {
        text: buttonText?.one,
        onPress: yesPress,
      },
    ]);

  type === "twoButton" &&
    Alert.alert(title, message, [
      {
        text: buttonText?.one,
        onPress: yesPress,
      },
      {
        text: buttonText?.two,
        onPress: noPress,
      },
    ]);
};
