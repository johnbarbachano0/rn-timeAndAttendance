import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import BackIcon from "../components/BackIcon";
import ApprovalsChange from "../screens/changeRequestScreens/ApprovalsChange";
import ApprovalsPage from "../screens/changeRequestScreens/ApprovalsPage";

const ApprovalsChangeRequestNav = () => {
  const { dark: isDark, colors } = useTheme();
  const ApprovalsChangeReq = createNativeStackNavigator();

  return (
    <ApprovalsChangeReq.Navigator
      initialRouteName="ApprovalsPage"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: isDark ? colors.card : colors.header,
        },
        headerTintColor: colors.text,
      }}
    >
      <ApprovalsChangeReq.Screen
        name="ApprovalsPage"
        component={ApprovalsPage}
        options={({ navigation }) => ({
          title: "Approvals Page",
          headerLeft: () => (
            <BackIcon onPress={() => navigation.navigate("Home")} />
          ),
        })}
      />
      <ApprovalsChangeReq.Screen
        name="ApprovalPage"
        component={ApprovalsChange}
        options={({ navigation }) => ({
          title: "Change Request Approval",
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
    </ApprovalsChangeReq.Navigator>
  );
};

export default ApprovalsChangeRequestNav;
