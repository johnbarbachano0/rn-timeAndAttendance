import * as React from "react";
import ApprovalsChangeRequestNav from "./ApprovalsChangeRequestNav";
import MyChangeRequestNav from "./MyChangeRequestNav";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import { MyRequestIcon, ApproveRequestIcon } from "../constants/Icons";

const ChangeRequestTabNav = () => {
  const Tab = createMaterialBottomTabNavigator();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="MyChangeRequest"
      activeColor={colors.text}
      inactiveColor={colors.disabled}
      barStyle={{ backgroundColor: colors.surface }}
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
