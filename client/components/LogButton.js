import React from "react";
import { isApple } from "../constants/isApple";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import CustomButton from "./CustomButton";

const LogButton = ({ type, onLog, button, loading, style }) => {
  return (
    <Surface style={[styles.container, isApple && styles.ios, style]}>
      <CustomButton
        onPress={onLog}
        buttonColor={button.color}
        buttonLabel={button.label}
        icon={button.icon}
        iconColor={"#fff"}
        size={isApple ? 50 : 30}
        style={styles.button}
        disabled={type === 3 ? true : false || loading}
      />
    </Surface>
  );
};

export default LogButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingVertical: 15,
    elevation: 4,
  },
  ios: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    overflow: "hidden",
    borderRadius: 20,
  },
});
