import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Caption, TouchableRipple, Surface } from "react-native-paper";

const Tabs = ({ bgColor, icon, label, onPress, style }) => {
  return (
    <Surface style={[styles.tab, { backgroundColor: bgColor }, style]}>
      <TouchableRipple
        onPress={onPress}
        rippleColor="rgba(255, 255, 255, .95)"
        elevation={1000}
      >
        <View style={styles.item}>
          <Avatar.Icon
            icon={icon}
            size={75}
            style={{ backgroundColor: "transparent" }}
          />
          <Caption style={styles.label}>{label}</Caption>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tab: {
    width: "46%",
    margin: "1%",
    marginVertical: "2%",
    marginBottom: 0,
    minWidth: 150,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
  },
  container: {
    width: "100%",
  },
  item: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "#fff",
  },
});
