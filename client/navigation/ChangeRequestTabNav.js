import * as React from "react";
import { ApproveRequestIcon, MyRequestIcon } from "../constants/Icons";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import ApprovalsChangeRequestNav from "./ApprovalsChangeRequestNav";
import MyChangeRequestNav from "./MyChangeRequestNav";

const ChangeRequestTabNav = () => {
  // const Tab = createMaterialBottomTabNavigator();
  const { dark: isDark, colors } = useTheme();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="MyChangeRequest"
      activeColor={colors.text}
      inactiveColor={colors.disabled}
      barStyle={{ backgroundColor: colors.surface }}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: isDark ? colors.card : colors.header,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tab.Screen
        name="MyChangeRequest"
        component={MyChangeRequestNav}
        options={() => ({
          tabBarLabel: "My Requests",
          tabBarIcon: ({ color }) => <MyRequestIcon color={color} size={24} />,
        })}
      />
      <Tab.Screen
        name="Approvals"
        component={ApprovalsChangeRequestNav}
        options={() => ({
          tabBarLabel: "Approvals",
          tabBarIcon: ({ color }) => (
            <ApproveRequestIcon color={color} size={24} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default ChangeRequestTabNav;
