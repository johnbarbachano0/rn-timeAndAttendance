import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import BackIcon from "../components/BackIcon";
import ChangeRequest from "../screens/changeRequestScreens/ChangeRequest";
import AddEditChange from "../screens/changeRequestScreens/AddEditChange";

const MyChangeRequestNav = () => {
  const { dark: isDark, colors } = useTheme();
  const ChangeReq = createNativeStackNavigator();

  return (
    <ChangeReq.Navigator
      initialRouteName="ChangeRequest"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: isDark ? colors.card : colors.header,
        },
        headerTintColor: colors.text,
      }}
    >
      <ChangeReq.Screen
        name="ChangeRequest"
        component={ChangeRequest}
        options={({ navigation }) => ({
          title: "My Change Requests",
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
      <ChangeReq.Screen
        name="AddEditChange"
        component={AddEditChange}
        options={({ navigation, route }) => ({
          title: route?.params?.title,
          headerLeft: () => <BackIcon onPress={() => navigation.goBack()} />,
        })}
      />
    </ChangeReq.Navigator>
  );
};

export default MyChangeRequestNav;
