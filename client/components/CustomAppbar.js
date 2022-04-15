import React from "react";
import { Appbar } from "react-native-paper";
import { isApple } from "../constants/isApple";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const CustomAppbar = (props) => {
  const { dark, colors } = useTheme();
  return (
    <Appbar
      style={[
        styles.container,
        isApple && styles.ios,
        !dark && { backgroundColor: colors.header },
      ]}
    >
      {props.children}
    </Appbar>
  );
};

export default CustomAppbar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  ios: { paddingVertical: 30, paddingTop: 60 },
});
