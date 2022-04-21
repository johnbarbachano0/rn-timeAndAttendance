import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import BackIcon from "../components/BackIcon";
import DurationReport from "../screens/reportScreens/DurationReport";
import Reports from "../screens/reportScreens/Reports.js";

const ReportsStackNav = () => {
  const { dark: isDark, colors } = useTheme();
  const ReportsStack = createNativeStackNavigator();

  return (
    <ReportsStack.Navigator
      initialRouteName="Reports"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: isDark ? colors.card : colors.header,
        },
        headerTintColor: colors.text,
      }}
    >
      <ReportsStack.Screen
        name="Reports"
        component={Reports}
        options={({ navigation }) => ({
          title: "Reports",
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
      <ReportsStack.Screen
        name="DurationReport"
        component={DurationReport}
        options={({ navigation, route }) => ({
          title: route?.params?.title,
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
    </ReportsStack.Navigator>
  );
};

export default ReportsStackNav;
