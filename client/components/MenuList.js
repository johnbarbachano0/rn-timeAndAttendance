import React from "react";
import { List } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const MenuList = ({ lists, onNav }) => {
  return (
    <View style={styles.container}>
      <List.Section style={styles.section}>
        {lists.map((list) => (
          <List.Item
            key={list.id}
            title={list.title}
            left={() => <List.Icon icon={list.icon} />}
            onPress={() => onNav(list.title, list.id)}
            style={list.style}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  section: {
    width: "100%",
  },
});
