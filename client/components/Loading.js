import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import Color from "../constants/Color";

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        color={Color.primary.light}
        {...props}
      />
      <Paragraph>Loading...</Paragraph>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
