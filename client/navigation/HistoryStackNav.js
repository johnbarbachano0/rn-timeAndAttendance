import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import BackIcon from "../components/BackIcon";
import History from "../screens/history/History";
import ViewHistory from "../screens/history/ViewHistory";

const HistoryStackNav = () => {
  const { dark: isDark, colors } = useTheme();
  const HistoryStack = createNativeStackNavigator();

  return (
    <HistoryStack.Navigator
      initialRouteName="History"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: isDark ? colors.card : colors.header,
        },
        headerTintColor: colors.text,
      }}
    >
      <HistoryStack.Screen
        name="History"
        component={History}
        options={({ navigation }) => ({
          title: "My History",
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
      <HistoryStack.Screen
        name="ViewHistory"
        component={ViewHistory}
        options={({ navigation }) => ({
          title: "History Details",
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
    </HistoryStack.Navigator>
  );
};

export default HistoryStackNav;
