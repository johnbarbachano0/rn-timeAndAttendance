import { StyleSheet, ScrollView, View } from "react-native";
import { isDisplay } from "./misc";
import React from "react";
import Tabs from "./Tabs";

const ModulesList = ({ navigation, modules, onLogout, accessData }) => {
  const handleDisplay = (id) => !isDisplay(id, accessData);
  const getDescription = (id) =>
    modules?.filter((item) => item.id === id)?.pop()?.title || "No Label";
  const moduleTabs = [
    {
      order: 1,
      id: 1,
      icon: "clock-time-eight",
      label: getDescription(1),
      bgColor: "#FF9900",
      path: () => navigation.navigate("TimeLogsStack", { screen: "TimeLogs" }),
      customStyle: handleDisplay(1) && { display: "none" },
    },
    {
      order: 2,
      id: 2,
      icon: "history",
      label: getDescription(2),
      bgColor: "#1F1CA6",
      path: () =>
        navigation.navigate("ChangeRequestStack", { screen: "ChangeRequest" }),
      customStyle: handleDisplay(2) && { display: "none" },
    },
    {
      order: 3,
      id: 3,
      icon: "shield-account",
      label: getDescription(3),
      bgColor: "#106EB3",
      path: () => navigation.navigate("AdminStack", { screen: "Admin" }),
      customStyle: handleDisplay(3) && { display: "none" },
    },
    {
      order: 4,
      id: 4,
      icon: "delta",
      label: getDescription(4),
      bgColor: "#FFD124",
      path: () => navigation.navigate("HistoryStack", { screen: "History" }),
      customStyle: handleDisplay(4) && { display: "none" },
    },
    {
      order: 6,
      id: 5,
      icon: "logout",
      label: getDescription(5),
      bgColor: "#A61C1C",
      path: onLogout,
      customStyle: handleDisplay(5) && { display: "none" },
    },
    {
      order: 5,
      id: 6,
      icon: "chart-areaspline",
      label: getDescription(6),
      bgColor: "#466C2C",
      path: () => navigation.navigate("ReportsStack", { screen: "Reports" }),
      customStyle: handleDisplay(12) && { display: "none" },
    },
  ].sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));

  return (
    <ScrollView contentContainerStyle={styles.modules}>
      {moduleTabs.map((module) => (
        <Tabs
          key={module.id}
          bgColor={module.bgColor}
          icon={module.icon}
          label={module.label}
          onPress={module.path}
          style={module.customStyle}
        />
      ))}
    </ScrollView>
  );
};

export default ModulesList;

const styles = StyleSheet.create({
  modules: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
