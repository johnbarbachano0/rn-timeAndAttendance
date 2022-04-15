import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import BackIcon from "../components/BackIcon";
import TimeLogs from "../screens/TimeLogs";

const TimeLogsStackNav = () => {
  const { dark: isDark, colors } = useTheme();
  const TimeLogsStack = createNativeStackNavigator();

  return (
    <TimeLogsStack.Navigator
      initialRouteName="TimeLogs"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: isDark ? colors.card : colors.header,
        },
        headerTintColor: colors.text,
      }}
    >
      <TimeLogsStack.Screen
        name="TimeLogs"
        component={TimeLogs}
        options={({ navigation }) => ({
          title: "My Logs",
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
    </TimeLogsStack.Navigator>
  );
};

export default TimeLogsStackNav;
